const { User, Task, Project } = require('../Models/models');
const moment = require('moment');
const { Sequelize } = require('sequelize');

const Op = Sequelize.Op;

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
    let sequelizeRequest = {}

    switch (req.body["category"]) {
        case "today":
            sequelizeRequest.deadlineDate = {
                [Op.gte]: moment().startOf('day').toDate(),
                [Op.lte]: moment().endOf('day').toDate(),
            }
            break;
        case "upcoming":
            sequelizeRequest.deadlineDate = {
                [Op.gte]: moment().add(1, 'days').startOf('day').toDate(),
                [Op.lte]: moment().add(1, 'days').endOf('day').toDate(),
            }
            break;
        case "incoming":
            sequelizeRequest.projectId = null;
            break;
        default:
            break;
    }

    let tasks = await Task.findAll({
        include: [{
            model: User,
            where: {
                id: req.user.id,
            }
        },
        ],
        where: sequelizeRequest,
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
    let { task_id, project_id, priority, deadline_date, deadline_time, title } = req.body;

    var task = await Task.findOne({
        where: {
            id: task_id
        }
    })

    if (req.user.id != task.userId)
        return res.status(403);


    if (project_id != -1 && project_id != null) {
        var project = await Project.findOne({
            where: {
                id: project_id
            }
        })

        if (!project)
            return res.status(400).json({ error: "Project not found" });

        task.projectId = project.id;
    } else {
        task.projectId = null;
    }
    task.priority = priority;
    task.deadlineDate = (deadline_date != "" ? deadline_date : null);
    task.deadlineTime = (deadline_time != "" ? deadline_time : null);
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