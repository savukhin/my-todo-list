const Router = require('express');
const router = Router();
const userRouter = require('./userRouter')
const tasksRouter = require('./tasksRouter')
const projectsRouter = require('./projectsRouter')

router.use('/auth', userRouter);
router.use('/tasks', tasksRouter);
router.use('/projects', projectsRouter);

module.exports = router;