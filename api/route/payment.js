const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Payment = require('../model/payment');
const checkAuth = require('../middleware/admin');



// get all payment history
router.get('/history',checkAuth,checkAuth,(req,res,next)=>{
  Payment.find()
  .exec()
  .then(result=>{
    res.status(200).json({
      paymentList:result
    })
  })

  .catch(err=>{
    res.status(500).json({
      error:err
    })
  });

})

// paid fee
router.post('/paid',checkAuth,checkAuth,(req,res,next)=>{
  const d = new Date();
  // console.log(d.toDateString());
 const payment = new Payment({
    _id: new mongoose.Types.ObjectId,
    name:req.body.name,
    phone:req.body.phone,
    amount:req.body.amount,
    remark:req.body.detail,
    date:d.toUTCString(),
    month:d.getMonth()
  })

  payment.save()
  .then(result=>{
    res.status(200).json({
      newPayment:result
    })
  })

  .catch(err=>{
    res.status(200).json({
      error:err
    })
  })
})

// get fee detail by phone
router.get('/detail/:phone',checkAuth,checkAuth,(req,res,next)=>{
  Payment.find({phone:req.params.phone})
  .then(result=>{
    res.status(200).json({
      paymentList:result
    })
  })
  .catch(err=>{
    res.status(500).json({
      error:err
    })
  })
})

//get sum of payment month wise
router.get('/totalpayment/month',checkAuth,checkAuth,(req,res,next)=>{
  Payment.aggregate([
    // {$match:{month:'0'}},
    {$group:{_id:"$month",total:{$sum:"$amount"}}}
  ])
  .then(result=>{
    res.status(200).json({
      total:result
    })
  })
})

//total of individual student
router.get('/totalpayment/:phone',checkAuth,checkAuth,(req,res,next)=>{
  Payment.aggregate([
    {$match:{phone:req.params.phone}},
    {$group:{_id:"null",total:{$sum:"$amount"}}}
  ])
  .then(result=>{
    res.status(200).json({
      total:result
    })
  })
})

module.exports = router;