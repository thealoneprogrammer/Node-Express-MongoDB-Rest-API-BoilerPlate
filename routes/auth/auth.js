const router = require('express').Router();
const User = require('../../models/User')
const { registrationValidation, loginValidation } = require('../../validations')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/register', async (req, res) => {
    const { error } = registrationValidation(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const emailExists = await User.findOne({ email: req.body.email });

    if (emailExists) return res.status(400).send("Email already exists")

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })

    try {
        const savedUser = await user.save();
        res.status(200).send({
            _id: savedUser._id,
            name: savedUser.name,
            email: savedUser.email,
            createdAt: savedUser.createdAt
        })
    } catch (err) {
        console.log(err);
        res.status(400).send(err)
    }
})

router.post('/login', async (req, res) => {
    const { error } = loginValidation(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(400).send("Invalid email or password")

    const validatePassword = await bcrypt.compare(req.body.password, user.password);

    if (!validatePassword) return res.status(400).send("Invalid email or password");

    const jwtToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res.header('auth-token', jwtToken).send(jwtToken);
})

module.exports = router;
