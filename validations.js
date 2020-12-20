const Joi = require('@hapi/joi');

const registrationValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    })

    return schema.validate(data);
}

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })

    return schema.validate(data);
}

module.exports = { registrationValidation, loginValidation }
