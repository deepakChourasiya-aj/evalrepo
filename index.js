const express = require('express')
const mongoose =require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt')
require('dotenv').config();
const jwt = require('jsonwebtoken')
const { connection } = require('./config/conneciton');
const { UserModel } = require('./model/usermode');
const { Socialmodel } = require('./model/socialmode');
const { authenticator } = require('./middleware/authenticator');
const { userRouter } = require('./routes/loginsignup.route');
const { socialmedaiaRoutes } = require('./routes/post.route');


const app = express();
app.use(cors())
app.use(express.json());

app.post('/',(req,res)=>{
  res.send('okkk')
})

app.use('/users',userRouter)
// {
  
//     "name" : "deepak",
//     "email" : "deepak@gmail.com",
//     "gender" : "mail",
//     "password" : "123"
//     }

app.use(authenticator);
app.use('/',socialmedaiaRoutes)

// {
//     "title" : "Deepak",
//     "body" : "Hi iam deepak",
//     "device" : "Mobile"
//     }

// connection
app.listen(process.env.port,async()=>{
    await  connection
    console.log(`server is runining on ${process.env.port}`)
})
