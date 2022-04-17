const Router = require('express');
const router = Router();
const tasksController = require('../Controllers/TasksController');

router.post('/get', tasksController.getTasks)
router.post('/add', tasksController.addTask)
router.post('/complete', tasksController.completeTask)

module.exports = router
