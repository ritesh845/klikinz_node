var express = require('express');
var router = express.Router();
let  {loginValidation,signupValidation} = require('../validations/auth.validation');
let  {uploadSingleFile} = require('../middleware/uploadSingleFile');

var auth_controller = require('../controllers/authController');


router.post('/login',loginValidation,auth_controller.login);

router.post('/email-signup',signupValidation,uploadSingleFile,auth_controller.emailSignUp)
// router.post('/email-signup',uploadFile.single('photo'),auth_controller.emailSignUp)

module.exports = router;