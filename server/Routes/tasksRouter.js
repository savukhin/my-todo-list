const Router = require('express');
const router = Router();
const tasksController = require('../Controllers/TasksController');
const { body, oneOf } = require('express-validator');
const { validatorCheck } = require('../Middleware/error-checker')
const { checkToken } = require('../Middleware/custom-validators')

router.post('/get',
    body("token", "Must have token").matches(/^.+\..+\..+$/, "invalid token type"),
    validatorCheck(),
    tasksController.getTasks)

router.post('/get/category',
    body("token", "Must have token").matches(/^.+\..+\..+$/, "invalid token type"),
    body("category").isIn(['incoming', 'today', 'upcoming']),
    validatorCheck(),
    tasksController.getTasksByCategory)

router.post('/get/project',
    body("token", "Must have token").matches(/^.+\..+\..+$/, "invalid token type"),
    // body("project").isNumeric(),
    validatorCheck(),
    tasksController.getTasksByProject)

router.post('/add',
    body("title").isAscii(),
    body("description").exists(),
    checkToken(),
    validatorCheck(),
    tasksController.addTask)

router.post('/complete',
    body("taskId").isNumeric(),
    checkToken(),
    validatorCheck(),
    tasksController.completeTask)

router.post('/changeTask',
    body("task_id").isNumeric(),
    oneOf([
        body("project_id").isNumeric(),
        body("project_id").isEmpty()
    ]),
    body("priority").isInt({ min: 0, max: 3 }),
    oneOf([
        body("deadline_date").equals(""),
        [
            body("deadline_date").isDate({format: "YYYY-MM-DD"}),
            body("deadline_time").matches('^(2[0-3]|1[0-9]|[1-9]):[0-5][0-9](:[0-5][0-9]){0,1}$'),
        ]
    ]),
    body("title").isAscii(),
    checkToken(),
    validatorCheck(),
    tasksController.changeTask)

module.exports = router
