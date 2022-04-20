const { User, Task } = require('../Models/models')
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'asdfyev dfasodnfuiqepon!#@$eufnfod qewp oih dpfpasubdf'

class TasksController {
    async getTasks(req, res) {
        var { token } = req.body;
        console.log(`get tasks request with body`, req.body, `token ${token}`);

        var user;
        try {
            user = jwt.verify(token, JWT_SECRET);
        } catch {
            return res.json({ status: 'error', error: 'unvalid token' });
        }

        var tasks = await Task.findAll({
            // { where: { id: user.id } }
            include: {
                model: User,
                where: {
                    id: user.id
                }
            },
            raw: true
        })
        // console.log("JWT decoded", user);
        console.log(tasks);
        return res.json({status: "ok", data: tasks});
    }

    async addTask(req, res) {
        var { token, title, description } = req.body;
        console.log(`add task request with body`, req.body, `token ${token}`);

        var user;
        try {
            user = jwt.verify(token, JWT_SECRET);
        } catch {
            return res.json({ status: 'error', error: 'unvalid token' });
        }

        var tasks = await Task.create({
            title: title,
            description: description,
            userId: user.id,
        })
        
        console.log(tasks);
        return res.json({ status: "ok"});
    }

    async completeTask(req, res) {

    }
}

module.exports = new TasksController();