const jwt = require('jsonwebtoken');

const verifyJwtToken = (req, res, next) => {
    const jwtToken = req.header('auth-token');

    if (!jwtToken) return res.status(401).send("Unauthorized access");

    try {
        const verified = jwt.verify(jwtToken, process.env.JWT_SECRET)

        req.user = verified
        next()
    } catch (err) {
        res.status(400).send(err)
    }
}

module.exports = verifyJwtToken
