const { User } = require('../Models/models')
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'asdfyev dfasodnfuiqepon!#@$eufnfod qewp oih dpfpasubdf'

class UserController {
    async register(req, res) {
        console.log(req.body)
        const { username, password } = req.body;
        console.log(`Username is ${username} pass ${password}`)

        try {
            const creation = await User.create({
                email: username,
                password: password
            })
            console.log(`create successfull ${creation}`);
            return res.json({ status: "success" });
        } catch (error) {
            console.log(`register error ${error}`);
            return res.json({ status: "error" })
        }

        // res.json('REGISTER POST');
        res.json(req.body);
    }

    async login(req, res) {
        console.log(req.body)

        const { username, password } = req.body;
        const user = await User.findOne({
            where: {
                email: username,
                password: password
            },
            raw: true
        });

        if (!user)
            return res.json({ status: 'error', error: 'User not found' });

        const token = jwt.sign(
            {
                id: user.id,
                username: user.email
            },
            JWT_SECRET
        );

        res.json({ status: 'ok', data: token });
    }

    async changePassword(req, res) {
        const { token } = req.body;
        
        const existing = await User.findOne(
            { where: { id: 1 } }
        );

        console.log(" try to update to newpassword ", req.body.newPassword, " from ", existing.password);
        
        try {
            const user = jwt.verify(token, JWT_SECRET);
            await User.update(
                { password: req.body.newPassword },
                { where: { id: user.id } }
            )
            .then(result =>
                console.log('success', result)
            )
            .catch(err =>
                console.log(err)
            )
            console.log("JWT decoded", user);
        } catch {
            return res.json({ status: 'error', error: 'unvalid token' });
        }


        return res.json({ status: "ok" })
    }
}

module.exports = new UserController();