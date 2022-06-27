const { User } = require('../Models/models')
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'asdfyev dfasodnfuiqepon!#@$eufnfod qewp oih dpfpasubdf'

const authentication = () => {
    return async (req, res, next) => {
        let { token } = req.headers;

        let verification;
        try {
            verification = jwt.verify(token, JWT_SECRET);
        } catch {
            req.user = false;
            return next();
        }

        let user;

        try {
            user = await User.findOne({
                where: {
                    id: verification.id
                }
            });
        } catch (error) {
            req.user = false;
        }

        if (!user)
            req.user = false;
        else
            req.user = user;

        return next();
    }
}

module.exports = { authentication };