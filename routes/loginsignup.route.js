const express = require('express')
const mongoose =require('mongoose');
const jwt= require('jsonwebtoken')
const bcrypt = require('bcrypt');
const { UserModel } = require('../model/usermode');

const userRouter = express.Router();

userRouter.post('/register',async(req,res)=>{
    console.log(req.body)
    const {name,email,gender,password} = req.body;
   try {
    bcrypt.hash(password, 5, async function(err, securepass) {
        // Store hash in your password DB.
        if(err){
            res.send({msg:'error in register'})
        }else{
            let user = new UserModel({name,email,gender,password:securepass});
            await user.save();
            res.send({msg:'user has been created',user});
            console.log(user)
        }
    });
   } catch (error) {
     console.log('error in user create',error)
     res.send(error)
     
   }
})

userRouter.post("/login",async(req,res)=>{
    let {email,password} = req.body;

    try {
        let user = await UserModel.find({email});
        if(user.length>0){
            let token = jwt.sign({userID:user[0]._id},'deepak');
            res.send({msg:'ser has been login ',token})
            console.log(user);
        }else{
            res.send('plealse login first')

        }
    } catch (error) {
        console.log(error);
        res.send({msg:'errr in login '})
    }
})

module.exports = {userRouter}