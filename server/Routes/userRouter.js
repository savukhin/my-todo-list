const Router = require('express');
const router = Router();
const userController = require('../Controllers/UserController');

router.post('/reg', userController.register)
router.post('/login', userController.login)

module.exports = router
