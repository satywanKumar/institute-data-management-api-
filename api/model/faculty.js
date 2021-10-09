const mongoose = require('mongoose');

facultySchema = mongoose.Schema({
  _id:mongoose.Schema.Types.ObjectId,
  name:String,
  gender:String,
  phone:String,
  subject: String,
  dob:String,
  joinDate:String,
  salary:Number,
  qualification:String,
  add:String
})

module.exports = mongoose.model('Faculty',facultySchema);
