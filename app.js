const express = require('express');
const app = express();
const path = require('path');
const batchRoute = require('./api/route/batch');
const studentRoute = require('./api/route/student');
const facultyRoute = require('./api/route/faculty');
const paymantRoute = require('./api/route/payment');
const userRoute = require('./api/route/user');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { urlencoded, json } = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');


mongoose.connect('mongodb+srv://.gpk49.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useNewUrlParser:true});

mongoose.connection.on('error',err=>{
  console.log('connection failed');
});

mongoose.connection.on('connected',()=>{
  console.log('connected successfully with database');
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(fileUpload({
  useTempFiles:true
}))

app.use(cors());

app.use('/batch',batchRoute);
app.use('/student',studentRoute);
app.use('/faculty',facultyRoute);
app.use('/payment',paymantRoute);
app.use('/user',userRoute);
app.use(express.static(__dirname+'www'));

// app.use((req,res,next)=>{
//   res.status(404).json({
//     error:'bad request'
//   })
// })

app.get('*',(req,res,next)=>{
  res.sendFile(path.join(__dirname + '/www/index.html'));
})


module.exports = app;
