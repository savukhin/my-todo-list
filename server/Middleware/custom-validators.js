const { body } = require('express-validator');

const checkUsername = () => body("username", "username must be longer than 5").isLength({ min: 5 })

const checkPassword = () => body("password", "password must be longer than 5").isLength({ min: 5 })

const confirmPassword = () => 
    body('password2').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }

        return true;
    })

const checkToken = () => {
    return (req, res, next) => {
        if (!req.user)
            return res.status(400).json({ error: 'unvalid token' });
        return next();
    }
}

const isColor = (param, msg) => body(param, msg).matches(/^#[0-9a-f]{3,6}$/);

module.exports = {
    checkPassword, 
    confirmPassword, 
    checkUsername, 
    checkToken,
    isColor,
};