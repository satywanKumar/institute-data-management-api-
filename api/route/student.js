const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Student = require('../model/student');
const cloudinary = require('cloudinary').v2;
const checkAuth = require('../middleware/admin')

cloudinary.config({
  cloud_name:'dmap97ds2',
  api_key:'392635253424173',
  api_secret:'UwIU2QdVR_S7KCsxfnxKEtLJ64k'
});


// get all student
router.get('/',checkAuth,(req,res,next)=>{
  Student.find()
  .select('_id name fName gender dob email phone add pin joinDate batch courseFee imagePath')
  .then(result=>{
    res.status(200).json({
      student:result
    })
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      error:err
    })
  })
});

// get student by id
router.get('/:phone',checkAuth,(req,res,next)=>{
  const phone = req.params.phone
  // console.log(_id);
  Student.find({phone:phone})
  .select('_id name fName gender dob email phone add pin joinDate batch courseFee imagePath')
  .then(result=>{
    res.status(200).json({
      student:result
    })
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      error:err
    })
  })
});

//get  student by courseName
router.get('/courseName/:batchName',checkAuth,(req,res,next)=>{
    const courseName = req.params.batchName;
    console.log(courseName);
    Student.find({batch:courseName})
    .select('_id name fName gender dob email phone add pin joinDate batch courseFee imagePath')
    .then(result=>{
      // console.log(result)
      res.status(200).json({
        student:result
      })
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({
        error:err
      })
    })
  })

// save student
router.post('/',checkAuth,(req,res,next)=>{
  console.log(req);
  console.log(req.files);
  const file = req.files.photo;
  cloudinary.uploader.upload(file.tempFilePath,(err,result)=>{
    console.log(result);
    student = new Student({
      _id:new mongoose.Types.ObjectId,
      name:req.body.name,
      fName:req.body.fName,
      gender:req.body.gender,
      dob:req.body.dob,
      email:req.body.email,
      courseFee:req.body.courseFee,
      phone:req.body.phone,
      add:req.body.add,
      pin:req.body.pin,
      joinDate:req.body.joinDate,
      batch:req.body.batch,
      imagePath:result.secure_url
    });
    student.save()
    .then(result=>{
      console.log(result);
      res.status(200).json({
        new_student:result
      })
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({
        error:err
      })
    })
  
  });

})

// router.post('/',checkAuth,(req,res,next)=>{
//     student = new Student({
//         _id:new mongoose.Types.ObjectId,
//         name:req.body.name,
//         fName:req.body.fName,
//         gender:req.body.gender,
//         dob:req.body.dob,
//         email:req.body.email,
//         phone:req.body.phone,
//         add:req.body.add,
//         pin:req.body.pin,
//         joinDate:req.body.joinDate,
//         batch:req.body.batch
//       });
//       student.save()
//       .then(result=>{
//         console.log(result);
//         res.status(200).json({
//           new_student:result
//         })
//       })
//       .catch(err=>{
//         console.log(err);
//         res.status(500).json({
//           error:err
//         })
//       })
// })

// update
router.put('/:id',checkAuth,(req,res,next)=>{
  console.log(req.params.id);
  Student.findOneAndUpdate({_id:req.params.id},{
    $set:{
      name:req.body.name,
      fName:req.body.fName,
      gender:req.body.gender,
      dob:req.body.dob,
      email:req.body.email,
      courseFee:req.body.courseFee,
      phone:req.body.phone,
      add:req.body.add,
      pin:req.body.pin,
      joinDate:req.body.joinDate,
      batch:req.body.batch,
      imagePath:result.secure_url
    }
  })
  .then(result=>{
    res.status(200).json({
      updated_student:result
    })
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      error:err
    })
  })
})

// delete student

router.delete('/:id',checkAuth,(req,res,next)=>{

  Student.remove({_id:req.params.id})
  .then(result=>{
    res.status(200).json({
      message:'student has been deleted',
      result:result
    })
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      error:err
    })
  })

})

router.get('/get/count',checkAuth,(req,res,next)=>{
  Student.find().countDocuments()
  .then(result=>{
      res.status(200).json({
          total:result
      })
  })
})

router.get('/data/recent-student',checkAuth,(req,res,next)=>{
  Student.find().sort({$natural: -1 }).limit(5)
  .then(result=>{
    res.status(200).json({
      student:result
    })
  })
})

router.get('/get/count/gender/:gender',checkAuth,(req,res,next)=>{
  Student.find({gender:req.params.gender}).countDocuments()
  .then(result=>{
      res.status(200).json({
          total:result
      })
  })
})


module.exports = router;
