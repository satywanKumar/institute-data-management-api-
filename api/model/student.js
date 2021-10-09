const mongoose = require('mongoose');

studentSchema = mongoose.Schema({
  _id:mongoose.Schema.Types.ObjectId,
  name:String,
  fName:String,
  gender:String,
  dob:String,
  email:String,
  phone:String,
  add:String,
  pin:String,
  joinDate:String,
  batch:String,
  courseFee:Number,
  imagePath:String
})

module.exports = mongoose.model('Student',studentSchema);
