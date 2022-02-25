const fs  = require('fs');
const path = require('path');


const storage = (sampleFile,folder) => {   
  let dir = path.join(__dirname,'../public/uploads', `${folder}`);

  if (!fs.existsSync('./public/uploads/')) {
      fs.mkdirSync('./public/uploads/');
  }

  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
  }
  let name =  Date.now() + '_' + sampleFile.originalname;
  let uploadPath = path.join(dir,name);
  sampleFile.mv(uploadPath, function(err) {
    if (err)
        return res.status(500).json({ success: false, message: [], error: 'Internal Server Error' });
  });
  return  `${folder}`.replace('../',"") +'/' + name;
}

exports.uploadPhoto = (req,res,next) => {
  let errors = true;
  let sampleFile = '';
  let errorMessage =   {
    "msg": "",
    "param": "",
    "location": "body"
  };
  let fieldName = req.body.fieldName;
  console.log(req.files[`${fieldName}`]);
  // if(req.files){
  //   if(req.files.`${photo}` != undefined){
      
  //   }else{
  //     errorMessage.msg = "Photo field is required";
  //     errorMessage.param = "Photo field is required";
  //   }
  // }
  if(errors){
    return res.status(400).json({status:"error",message:"Validation Error",data:[errorMessage]})
  }
 
  next();
}
