const { check,checkSchema, validationResult }= require('express-validator');

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
    (req,res,next) => {
        req.body.fieldName = 'photo';
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
           return res.status(400).json({ success: false, message: "Validator Error", data: errors.array() });
        } 
        next();
    }

];