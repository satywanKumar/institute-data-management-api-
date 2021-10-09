const express = require('express');
const router = express.Router();
const User = require('../model/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



// get all user
router.get('/allUser',(req,res,next)=>{
    User.find()
    .exec()
    .then(result=>{
        res.status(200).json({
            userList:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})

// delete user
router.delete('/:userName',(req,res,next)=>{
    User.remove({userName:req.params.userName})
    .then(result=>{
        res.status(200).json({
            message:'deleted successfully',
            result:result
        })
    })
    .catch(err=>{
        res.json(500).json({
            error:err
        })
    })
})

// signUp
router.post('/signup',(req,res,next)=>{
   bcrypt.hash(req.body.password,10,(err,hash)=>{
       if(err)
       {
           return res.status(500).json({
               error:err
           })
       }
       else
       {
     const user = new User({
            _id : new mongoose.Types.ObjectId,
            userName:req.body.userName,
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            password:hash,
            userType:req.body.userType,
            email:req.body.email,
            phone:req.body.phone,

        });

        user.save()
        .then(result=>{
            res.status(200).json({
                newUser:result
            })
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                Error:err
            })
        })
       }
   })

})

// signIn
router.post('/login',(req,res,next)=>{
    User.find({userName:req.body.userName})
    .exec()
    .then(user=>{
        if(user.length < 1)
        {
            return res.status(401).json({
                msg:'user not exists'
            });
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
            if(!result)
            {
                return res.status(401).json({
                    msg:'password matching fail'
                });
            }
            if(result)
            {

               const token = jwt.sign(
                   {
                       userName:user[0].userName,
                       userType:user[0].userType,
                       firstName:user[0].firstName,
                       lastName:user[0].lastName,
                       dept:user[0].dept,
                       id:user[0]._id
                   },
                   'this is dummy text',
                   {
                       expiresIn:"10h"
                   }
               );
            //    console.log(token);
               res.status(200).json({
                   userName:user[0].userName,
                   userType:user[0].userType,
                   firstName:user[0].firstName,
                   lastName:user[0].lastName,
                   email:user[0].email,
                   phone:user[0].phone,
                   token:token
               })
            }
        })
    })
    .catch(err=>{
        error:err
    })
})


module.exports = router;