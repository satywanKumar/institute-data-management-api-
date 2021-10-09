const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Batch = require('../model/batch');
// const cloudinary = require('cloudinary').v2;
const checkAuth = require('../middleware/admin')

// cloudinary.config({
//   cloud_name:'dmap97ds2',
//   api_key:'392635253424173',
//   api_secret:'UwIU2QdVR_S7KCsxfnxKEtLJ64k'
// });


// get all batchs
router.get('/',checkAuth,(req,res,next)=>{
  Batch.find()
  .select('_id courseName discription startingDate duration time location instructor')
  .then(result=>{
    res.status(200).json({
      batch:result
    })
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      error:err
    })
  })
});

//get single batch by id
router.get('/:id',checkAuth,(req,res,next)=>{
  const _id = req.params.id;
  Batch.findById(_id)
  .select('_id courseName discription startingDate duration time location instructor')
  .then(result=>{
    // console.log(result)
    res.status(200).json({
      batch:result
    })
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      error:err
    })
  })
})

//get single batch by courseName
router.get('/courseName/:courseName',checkAuth,(req,res,next)=>{
    const courseName = req.params.courseName;
    //console.log(courseName);
    Batch.find({courseName:courseName})
    .select('_id courseName discription startingDate duration time location instructor')
    .then(result=>{
      // console.log(result)
      res.status(200).json({
        batch:result
      })
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({
        error:err
      })
    })
  })

// save batch
router.post('/',checkAuth,(req,res,next)=>{
    batch = new Batch({
        _id:new mongoose.Types.ObjectId,
        courseName:req.body.courseName,
        discription:req.body.discription,
        startingDate:req.body.startingDate,
        duration:req.body.duration,
        time:req.body.time,
        location:req.body.location,
        instructor:req.body.instructor
      });
      batch.save()
      .then(result=>{
        console.log(result);
        res.status(200).json({
          new_batch:result
        })
      })
      .catch(err=>{
        console.log(err);
        res.status(500).json({
          error:err
        })
      })
})

// update
router.put('/:id',checkAuth,(req,res,next)=>{
 // console.log(req.params.id);
  Batch.findOneAndUpdate({_id:req.params.id},{
    $set:{
        courseName:req.body.courseName,
        discription:req.body.discription,
        startingDate:req.body.startingDate,
        duration:req.body.duration,
        time:req.body.time,
        location:req.body.location,
        instructor:req.body.instructor
    }
  })
  .then(result=>{
    res.status(200).json({
      updated_batch:result
    })
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      error:err
    })
  })
})

// delete batch

router.delete('/:id',checkAuth,(req,res,next)=>{

  Batch.remove({_id:req.params.id})
  .then(result=>{
    res.status(200).json({
      message:'batch has been deleted',
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
  Batch.find().countDocuments()
  .then(result=>{
      res.status(200).json({
          total:result
      })
  })
})



module.exports = router;
