const Router = require('express');
const router = Router();
const tasksController = require('../Controllers/TasksController');
const { body } = require('express-validator');
const { validatorCheck } = require('../Middleware/error-checker')
const { checkToken } = require('../Middleware/custom-validators')

router.post('/get', 
    body("token", "Must have token").matches(/^.+\..+\..+$/, "invalid token type"),
    validatorCheck(),
    tasksController.getTasks)

router.post('/add', 
    body("title").isAscii(),
    body("description").exists(),
    checkToken(),
    validatorCheck(),
    tasksController.addTask)
    
router.post('/complete', tasksController.completeTask)

module.exports = router
