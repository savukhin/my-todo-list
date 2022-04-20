const { body } = require('express-validator');

const checkUsername = () => body("username", "username must be longer than 5").isLength({ min: 5 })

const checkPassword = () => body("password", "password must be longer than 5").isLength({ min: 5 })

const confirmPassword = () => 
    body('passwordConfirmation').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }

        return true;
    })

const checkToken = () => body("token", "Must have token").matches(/^.+\..+\..+$/, "invalid token type");

module.exports = { checkPassword, confirmPassword, checkUsername, checkToken};