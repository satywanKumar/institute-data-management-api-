const mongoose = require('mongoose');

userSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    userName:String,
    firstName:String,
    lastName:String,
    password:String,
    userType:String,
    email:String,
    phone:String
})

module.exports = mongoose.model('User',userSchema);