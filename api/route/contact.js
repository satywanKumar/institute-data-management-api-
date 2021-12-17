const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Contact = require('../model/contact');



// get all Contact
router.get('/',(req,res,next)=>{
  Contact.find()
  .select('_id name email phone')
  .then(result=>{
    res.status(200).json({
      contact:result
    })
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      error:err
    })
  })
});

// get Contact by id
router.get('/:id',(req,res,next)=>{
  const id = req.params.id
  // console.log(_id);
  Contact.find({_id:id})
  .select('_id name email phone')
  .then(result=>{
    res.status(200).json({
      contact:result
    })
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      error:err
    })
  })
});



router.post('/',(req,res,next)=>{
    contact = new Contact({
        _id:new mongoose.Types.ObjectId,
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
      });
      contact.save()
      .then(result=>{
        console.log(result);
        res.status(200).json({
          new_contact:result
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
router.put('/:id',(req,res,next)=>{
  console.log(req.params.id);
  Contact.findOneAndUpdate({_id:req.params.id},{
    $set:{
      name:req.body.name,
      email:req.body.email,
      phone:req.body.phone,
    }
  })
  .then(result=>{
    res.status(200).json({
      updated_contact:result
    })
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      error:err
    })
  })
})

// delete Contact

router.delete('/:id',(req,res,next)=>{

  Contact.remove({_id:req.params.id})
  .then(result=>{
    res.status(200).json({
      message:'Contact has been deleted',
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
  Contact.find().countDocuments()
  .then(result=>{
      res.status(200).json({
          total:result
      })
  })
})

router.get('/data/recent-contact',(req,res,next)=>{
  Contact.find().sort({$natural: -1 }).limit(5)
  .then(result=>{
    res.status(200).json({
      Contact:result
    })
  })
})


module.exports = router;
