const express = require('express');
const router = express.Router();
const  {loginValidation,signupValidation} = require('../validations/auth.validation');
const  {uploadPhoto} = require('../middleware/uploadFile');

const auth_controller = require('../controllers/authController');


router.post('/login',loginValidation,auth_controller.login);

router.post('/email-signup',signupValidation,uploadPhoto,auth_controller.emailSignUp)
// router.post('/email-signup',uploadFile.single('photo'),auth_controller.emailSignUp)

module.exports = router;