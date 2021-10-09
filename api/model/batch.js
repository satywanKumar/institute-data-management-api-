const mongoose = require('mongoose');

batchSchema = mongoose.Schema({
  _id:mongoose.Schema.Types.ObjectId,
  courseName:String,
  discription:String,
  startingDate:String,
  duration:Number,
  time:String,
  location:String,
  instructor:String
})

module.exports = mongoose.model('Batch',batchSchema);
