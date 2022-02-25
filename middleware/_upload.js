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

  console.log(sampleFile)
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
      storage(sampleFile,'images')
      // console.log(sampleFile)

    }else{
      errorMessage.message = "photo field is type of image";
    }
   
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
