const Router = require('express');
const router = Router();
const userRouter = require('./userRouter')

router.use('/auth', userRouter);

module.exports = router;