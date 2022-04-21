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

const checkToken = () => body("token", "Must have token").matches(/^.+\..+\..+$/, "invalid token type");

const isColor = (param, msg) => body(param, msg).matches(/^#[0-9a-f]{3,6}$/);

const isAuthenticated = () => {
    return (req, res, next) => {
        
    }
}

module.exports = {
    checkPassword, 
    confirmPassword, 
    checkUsername, 
    checkToken,
    isColor,
};