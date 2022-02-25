const fs  = require('fs');
const path = require('path');


const storage = (sampleFile,folder) => {   
  let dir = path.join(__dirname, `${folder}`);
  if (!fs.existsSync('./poster/')) {
      fs.mkdirSync('./poster/');
  }
  if (!fs.existsSync('./uploads/')) {
      fs.mkdirSync('./uploads/');
  }

  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
  }
  let name =  Date.now() + '_' + sampleFile.name;
  let uploadPath = path.join(dir,name);
  sampleFile.mv(uploadPath, function(err) {
      if (err)
          return res.status(500).json({ success: false, message: [], error: 'Internal Server Error' });
  });
  return  `${folder}`.replace('../',"") +'/' + name;
}

exports.uploadSingleFile = (req,res,next) => {
  let errors = true;
  let sampleFile = '';
  let errorMessage =   {
    "msg": "",
    "param": "",
    "location": "body"
  };
  if(req.files.length === 1){
    sampleFile = req.files[0];
    if(sampleFile.mimetype === 'image/png' || sampleFile.mimetype === 'image/jpg' || sampleFile.mimetype === 'image/jpeg'){
      errors = false;
    }else{
      errorMessage.message = "photo field is type of image";
    }
    console.log("upload file",sampleFile)
  }else if(req.files.length === 0){
    errorMessage.message = "photo field is required";
  }else if(req.files.length > 1){
    errorMessage.message = "photo field single file is required";
  }
  if(errors){
    return res.status(400).json({status:"error",message:"Validation Error",data:[errorMessage]})
  }
 
  next();
}
