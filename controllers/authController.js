
exports.login = (req,res) => {
    console.log(req.body);
    return res.status(200).json({status: "success", code : 200, message: "login successfully", data:[]});
}

exports.emailSignUp = (req,res) => {
    console.log("controllers",req.body);
    return res.status(200).json({status: "success", code : 200, message: "Signup successfully", data:[]});
}