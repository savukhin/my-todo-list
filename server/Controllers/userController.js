class UserController {
    async register(req, res) {
        res.json('REGISTER POST');
    }

    async login(req, res) {
        res.json('LOGIN POST');
    }
}

module.exports = new UserController();