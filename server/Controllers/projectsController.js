const { User, Task, Project } = require('../Models/models')
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'asdfyev dfasodnfuiqepon!#@$eufnfod qewp oih dpfpasubdf'

async function getProjects(req, res) {
    var { token } = req.body;

    var user;
    try {
        user = jwt.verify(token, JWT_SECRET);
    } catch {
        return res.status(400).json({ error: 'unvalid token' });
    }

    var projects = await Project.findAll({
        include: {
            model: User,
            where: {
                id: user.id
            }
        },
        raw: true
    })

    return res.status(200).json({ data: projects });
}

async function addProject(req, res) {
    var { token, title, color } = req.body;

    var user;
    try {
        user = jwt.verify(token, JWT_SECRET);
    } catch {
        return res.status(400).json({ error: 'unvalid token' });
    }

    var project = await Project.create({
        title: title,
        color: color,
        userId: user.id,
    })
    console.log(project);

    return res.status(200).json({ data: "ok" });
}

module.exports = {
    getProjects,
    addProject
}