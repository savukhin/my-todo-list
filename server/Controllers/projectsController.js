const { User, Task, Project } = require('../Models/models')
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'asdfyev dfasodnfuiqepon!#@$eufnfod qewp oih dpfpasubdf'

async function getProjects(req, res) {
    var projects = await Project.findAll({
        include: {
            model: User,
            where: {
                id: req.user.id
            }
        },
        raw: true
    })

    return res.status(200).json({ status: 200, data: projects });
}

async function addProject(req, res) {
    var { title, color } = req.body;

    var project = await Project.create({
        title: title,
        color: color,
        userId: req.user.id,
    })

    return res.status(200).json({ status: 200, data: "ok" });
}

module.exports = {
    getProjects,
    addProject
}