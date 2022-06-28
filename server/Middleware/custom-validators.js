const { body } = require('express-validator');

const checkUsername = (field="username") => body(field, "Username must be longer than 5").isLength({ min: 5 })

const checkPassword = (field="password") => body(field, "Password must be longer than 5").isLength({ min: 5 })

const confirmPassword = (passwordField="password", checkField="password2") => 
    body(checkField).custom((value, { req }) => {
        if (value !== req.body[passwordField]) {
            throw new Error('Password confirmation does not match password');
        }

        return true;
    })

const isPasswordCorrect = (field="password") => 
    body(field).custom((value, { req }) => {
        if (req.user == false)
            throw new Error('User not authenticated');

        if (value !== req.user.password) {
            throw new Error('Password is incorrect');
        }

        return true;
    })

const checkToken = () => {
    return (req, res, next) => {
        if (!req.user)
            return res.status(400).json({ error: 'Unvalid token' });
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
    isPasswordCorrect
};