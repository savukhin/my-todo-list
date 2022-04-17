const Router = require('express');
const router = Router();
const userRouter = require('./userRouter')
const tasksRouter = require('./tasksRouter')

router.use('/auth', userRouter);
router.use('/tasks', tasksRouter);

module.exports = router;