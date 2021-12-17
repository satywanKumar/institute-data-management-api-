const mongoose = require('mongoose');

contactSchema = mongoose.Schema({
  _id:mongoose.Schema.Types.ObjectId,
  fullname:String,
  email:String,
  phone:String
})

module.exports = mongoose.model('contactSchema',studentSchema);
