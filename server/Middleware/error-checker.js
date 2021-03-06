const { validationResult } = require('express-validator');

const validatorCheck = () => {
    return (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("NEW Error:", errors);
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
}

module.exports = { validatorCheck };