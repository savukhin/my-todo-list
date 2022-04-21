const Router = require('express');
const router = Router();
const projectsController = require('../Controllers/projectsController');
const { body } = require('express-validator');
const { validatorCheck } = require('../Middleware/error-checker')
const { checkToken, isColor } = require('../Middleware/custom-validators')

router.post('/get', 
    body("token", "Must have token").matches(/^.+\..+\..+$/, "invalid token type"),
    validatorCheck(),
    projectsController.getProjects)

router.post('/add', 
    body("title").isAscii(),
    isColor("color", "Must be color type"),
    checkToken(),
    validatorCheck(),
    projectsController.addProject)

module.exports = router
