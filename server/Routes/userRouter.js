const Router = require('express');
const router = Router();
const userController = require('../Controllers/UserController');
const { body } = require('express-validator');
const { validatorCheck } = require('../Middleware/error-checker')
const { checkPassword, confirmPassword, checkUsername } = require('../Middleware/custom-validators')

router.post('/reg', body("email", "must be email").isEmail(), checkUsername(), checkPassword(), confirmPassword(), validatorCheck(), userController.register)
router.post('/login', userController.login)
router.post('/change-password', checkUsername(), checkPassword(), confirmPassword(), validatorCheck(), userController.changePassword)

module.exports = router
