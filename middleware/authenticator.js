const jwt = require('jsonwebtoken')
const express = require('express')
const mongoose = require('mongoose')

const authenticator = (req,res,next)=>{
  
    let token= req.headers.authorization;
    try {
        let decode = jwt.verify(token,'deepak');
        console.log(decode)
        if(decode){
         let userID = decode.userID;
         req.body.userID = userID;
         next();
        }else{
         console.log('please login firt');
         res.send({msg:'please login firt'})
        }
    } catch (error) {
        console.log('please login firt',error);
        res.send({msg:'please login firt'})
    }
}

module.exports = {authenticator}