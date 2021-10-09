const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Faculty = require('../model/faculty');



// get request
router.get('/',(req,res,next)=>{
  Faculty.find()
  .exec()
  .then(result=>{
      res.status(200).json({
          Faculty:result
      })
  })
  .catch(err=>{
      console.log(err);
      res.status(500).json({
          Error:err
      })
  });
})

//get by id
router.get('/:id',(req,res,next)=>{
  const _id = req.params.id;

  Faculty.findById(_id)
  .exec()
  .then(result =>{
      console.log(result);
      res.status(200).json({
          Facultyy:result
      })

  })
})



//post data
router.post('/',(req,res,next)=>{
  faculty = new Faculty({
      _id: new mongoose.Types.ObjectId,
      name:req.body.name,
      fatherName:req.body.fatherName,
      gender:req.body.gender,
      dob:req.body.dob,
      joinDate:req.body.joinDate,
      add:req.body.add,
      pin:req.body.pin,
      phone:req.body.phone,
      email:req.body.email,
      subject:req.body.subject,
      salary:req.body.salary,
      qualification:req.body.qualification


  });
  faculty.save()
  .then(result=>{
      console.log(result);
      res.status(200).json({
          new_faculty:result
      })
  })
  .catch(err=>{
      console.log(err);
      res.status(500).json({
          Error:err
      })
  })
})

// update
router.put('/:id',(req,res,next)=>{

      Faculty.findOneAndUpdate({_id:req.params.id},{
          $set:{
            name:req.body.name,
            fatherName:req.body.fatherName,
            gender:req.body.gender,
            dob:req.body.dob,
            joinDate:req.body.joinDate,
            add:req.body.add,
            pin:req.body.pin,
            phone:req.body.phone,
            email:req.body.email,
            subject:req.body.subject,
            salary:req.body.salary,
            qualification:req.body.qualification
          }
       })
       .then(result=>{
        res.status(200).json({
            updatedFaculty:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            message:err
        })
    })
})


// delete
router.delete('/:id',(req,res,next)=>{
  const id = req.params.id;
  Faculty.remove({_id:id})
  .then(result=>{
      res.status(200).json({
          message:'deleted',
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



router.get('/get/count',(req,res,next)=>{
    Faculty.find().countDocuments()
    .then(result=>{
        res.status(200).json({
            total:result
        })
    })
})



module.exports = router;