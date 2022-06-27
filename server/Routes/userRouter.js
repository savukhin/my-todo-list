const Router = require('express');
const router = Router();
const userController = require('../Controllers/UserController');
const { body } = require('express-validator');
const { validatorCheck } = require('../Middleware/error-checker')
const { checkPassword, confirmPassword, checkUsername } = require('../Middleware/custom-validators')
let multer = require('multer');

router.post('/reg', 
    body("email", "must be email").isEmail(),
    checkUsername(),
    checkPassword(),
    confirmPassword(),
    validatorCheck(),
    userController.register)

router.post('/login', userController.login)
router.post('/check-token', userController.checkToken)
router.post('/change-password', 
    checkUsername(),
    checkPassword(),
    confirmPassword(),
    validatorCheck(),
    userController.changePassword)

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("DESTINATION ", file);
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        console.log("FILENAME ", file.originalname);
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, Math.floor(Math.random()*473123498726) + '-' + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

var upload = multer({ storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5
    }});

router.post('/upload-photo', validatorCheck(), upload.single('file'), userController.uploadPhoto)

module.exports = router
