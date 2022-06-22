const { User, Task, Project } = require('../Models/models')
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'asdfyev dfasodnfuiqepon!#@$eufnfod qewp oih dpfpasubdf'

async function getTasks(req, res) {
    var tasks = await Task.findAll({
        include: {
            model: User,
            where: {
                id: req.user.id
            }
        },
        raw: true
    })

    return res.status(200).json({ data: tasks });
}

async function getTasksByCategory(req, res) {
    var tasks = await Task.findAll({
        include: [{
            model: User,
            where: {
                id: req.user.id,
            }
        },
        ],
        where: {
            projectId: null
        },
        raw: true
    })

    return res.status(200).json({ data: tasks });
}

async function getTasksByProject(req, res) {
    var { project } = req.body;

    var tasks = await Task.findAll({
        include: [{
            model: User,
            where: {
                id: req.user.id,
            }
        },
        ],
        where: {
            projectId: project
        },
        raw: true
    })

    return res.status(200).json({ data: tasks });
}

async function addTask(req, res) {
    let { title, description } = req.body;

    let task = await Task.create({
        title: title,
        description: description,
        userId: req.user.id,
    })

    return res.status(200).json({ data: "ok" });
}

async function completeTask(req, res) {
    var { taskId } = req.body;

    var task = await Task.findOne({
        where: {
            id: taskId
        }
    })

    if (req.user.id != task.userId)
        return res.status(403);

    task.completed = true;
    task.save();

    return res.status(200).json({ data: "ok" });
}

async function changeTask(req, res) {
    let { task_id, project_id, priority, title } = req.body;

    var task = await Task.findOne({
        where: {
            id: task_id
        }
    })

    if (req.user.id != task.userId)
        return res.status(403);

    var project = await Project.findOne({
        where: {
            id: project_id
        }
    })

    if (!project)
        return res.status(400).json({ error: "Project not found" });

    task.projectId = project.id;
    task.priority = priority;
    task.title = title;
    task.save();

    return res.status(200).json({ data: "ok" });
}

module.exports = {
    getTasks,
    getTasksByCategory,
    getTasksByProject,
    addTask,
    completeTask,
    changeTask
};