const Router = require('express');
const router = Router();
const userController = require('../Controllers/UserController');

router.post('/reg', userController.register)
router.post('/login', userController.login)
router.post('/change-password', userController.changePassword)

module.exports = router
