const mongoose = require('mongoose');

paymentSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    phone:String,
    amount:Number,
    remark:String,
    date:Date,
    month:String
})

module.exports = mongoose.model('Payment',paymentSchema);