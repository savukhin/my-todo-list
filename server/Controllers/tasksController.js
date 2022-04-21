const { User, Task } = require('../Models/models')
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'asdfyev dfasodnfuiqepon!#@$eufnfod qewp oih dpfpasubdf'

async function getTasks(req, res) {
    var { token } = req.body;

    var user;
    try {
        user = jwt.verify(token, JWT_SECRET);
    } catch {
        return res.status(400).json({ error: 'unvalid token' });
    }

    var tasks = await Task.findAll({
        include: {
            model: User,
            where: {
                id: user.id
            }
        },
        raw: true
    })

    return res.status(200).json({ data: tasks });
}

async function addTask(req, res) {
    var { token, title, description } = req.body;

    var user;
    try {
        user = jwt.verify(token, JWT_SECRET);
    } catch {
        return res.status(400).json({ error: 'unvalid token' });
    }

    var tasks = await Task.create({
        title: title,
        description: description,
        userId: user.id,
    })

    console.log(tasks);
    return res.status(200).json({ data: "ok" });
}

async function completeTask(req, res) {
    var { token, taskId } = req.body;

    var user;
    try {
        user = jwt.verify(token, JWT_SECRET);
    } catch {
        return res.status(400).json({ error: 'unvalid token' });
    }

    var task = await Task.findOne({
        id: taskId
    })
    console.log(task);

    if (user.id != task.userId)
        return res.status(403);

    task.completed = true;
    task.save();

    return res.status(200).json({ data: "ok" });
}

module.exports = {
    getTasks,
    addTask,
    completeTask
};