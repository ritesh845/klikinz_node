const fs  = require('fs');
const path = require('path');


exports.storage = (sampleFile,folder,oldPath = null) => {   
  let dir = path.join(__dirname,'../public/uploads', `${folder}`);

  if (!fs.existsSync('./public/uploads/')) {
      fs.mkdirSync('./public/uploads/');
  }

  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
  }

  if(oldPath){
    let dir1 = path.join(__dirname,'../public/uploads',`${oldPath}`);
    if (fs.existsSync(dir1)) {
      fs.unlinkSync(dir1);
    }
  }

  let name =  Date.now() + '_' + sampleFile.name;
  let uploadPath = path.join(dir,name);
  sampleFile.mv(uploadPath, function(err) {
    if (err)
        return res.status(500).json({ success: false, message: [], error: 'Internal Server Error' });
  });
  
  return  `${folder}`.replace('../',"") +'/' + name;
}

// exports.uploadSingleFile = (req,res,next) => {
//   let errors = true;
//   let sampleFile = '';
//   let errorMessage =   {
//     "msg": "",
//     "param": "",
//     "location": "body"
//   };
//   let fieldName = req.body.fieldName;
//   console.log(fieldName)
//   let typeFile = req.body.typeFile;
//   // let allowedImageExtension = ['.png','.jpg','.jpeg'];
//   // let allowedVideoExtension = ['.mp4'];
//   // let allowedPdfExtension = ['.pdf'];
//   // let allowedImageVideoExtension = allowedImageExtension.concat(allowedVideoExtension);

//   // if(req.files){
//   //   if(req.files[`${fieldName}`] != undefined){
//   //     sampleFile = req.files[`${fieldName}`];
//   //     let extensionName = path.extname(sampleFile.name); // fetch the file extension
     
//   //     if(typeFile === 'image'){
//   //       req.body.filePath = storage(sampleFile,'images')
//   //       errors = false;      
//   //     }else if (typeFile === 'video'){
//   //       req.body.filePath = storage(sampleFile,'videos');
//   //       errors = false;      
//   //     }else if(typeFile === 'image_video'){        
//   //         if(extensionName === '.mp4'){
//   //           req.body.filePath = storage(sampleFile,'videos');
//   //           errors = false;
//   //         }else{
//   //           req.body.filePath = storage(sampleFile,'images');
//   //           errors = false;
//   //         }        
//   //     }else if(typeFile === 'pdf'){        
//   //       req.body.filePath = storage(sampleFile,'documents');
//   //       errors = false;        
//   //     }     
//   //   }else{
//   //       req.body.filePath = '';
//   //       errors = false;
//   //   }
//   // }else{
//   //   req.body.filePath = '';
//   //   errors = false;
//   // }

//   if(errors){
//     return res.status(400).json({"success": false,message:"Validator Error",data:[errorMessage]})
//   }
 
//   next();
// }
