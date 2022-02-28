const { check,checkSchema, validationResult }= require('express-validator');
const path = require('path');

exports.loginValidation = [
    check('email')
    .not()
    .isEmpty()
    .withMessage("Email field is required"),
    check('password')
    .not()
    .isEmpty()
    .withMessage("Password field is  required"),
    (req,res,next) => {

        // console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
           return res.status(400).json({ success: false, error: "Validator Error", message: errors.array() });
        } 
        next();
    }

];


exports.signupValidation = [
    check('name')
    .not()
    .isEmpty()
    .withMessage("Name field is required"),
    check('email')
    .isEmail()
    .not()
    .isEmpty()
    .withMessage("Email field is required"),
    check('password')
    .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,
      )
    .not()
    .isEmpty()
    .withMessage("Password field is  required"),
    check('photo')
    .custom((value, {req}) => {
        if(!req.files){  
            throw new Error("Photo field is required");  
        }      
        let allowedImageExtension = ['.png','.jpg','.jpeg'];
        var extensionName = (path.extname(req.files.photo.name)).toLowerCase();
        if(!allowedImageExtension.includes(extensionName)){
            throw new Error("Please upload an image jpg, jpeg, png");
        }  
        return extensionName;
    }),
    (req,res,next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
           return res.status(400).json({ success: false, message: "Validator Error", data: errors.array() });
        } 
        next();
    }

];