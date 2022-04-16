const { User } = require('../Models/models')

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
        res.json('LOGIN POST');
    }
}

module.exports = new UserController();