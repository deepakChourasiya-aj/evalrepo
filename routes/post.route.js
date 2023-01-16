const express = require('express')
const mongoose =require('mongoose');
const jwt= require('jsonwebtoken')
const bcrypt = require('bcrypt');
const {Socialmodel} =require('../model/socialmode') ;
const socialmedaiaRoutes = express.Router();;

socialmedaiaRoutes.get('/posts',async(req,res)=>{
    let q = req.query;
    console.log(q);
     if(q.device1=='MOBILE' && q.device2=='PC'){
      let my = q.device1
      let my1 = q.device2
      let find = await Socialmodel.find({$or:[{'device':my},{"device":my1}]});
      res.send(find);
    }
    else if(q.device=='MOBILE'){
      let my = q.device
      let find = await Socialmodel.find({'device':my});
      res.send(find);
    } 
     else if(q.device=='PC'){
      let my = q.device
      let find = await Socialmodel.find({'device':my});
      res.send(find);
    }else{
      let find = await Socialmodel.find();
      res.send(find);
    }
  
  })
  socialmedaiaRoutes.post('/posts',async(req,res)=>{
      let {title,body,device} = req.body;
      try {
          let data = req.body
          let create = new Socialmodel(data);
           await create.save();
           res.send(create);
           console.log(create)
      } catch (error) {
          res.send({msg:"error in please login first"});
          console.log(error);
      }
  })
  socialmedaiaRoutes.patch('/posts/update/:id',async(req,res)=>{
         let id = req.params.id;
         let payload = req.body;
         let find = await Socialmodel.find({'_id':id});
         console.log(find);
         let postid = find[0].userID;
         console.log(postid);
         let making_rewq = req.body.userID;
         try {
          if(postid!=making_rewq){
              res.send({msg:'error increating user not authorized'})
             }else{
              let update = await Socialmodel.findByIdAndUpdate({'_id':id},payload);
              res.send({msg:'user post updated ',update});
              console.log(update)
             }
         } catch (error) {
          res.send({msg:'error in updating not authorized'})
           console.log(error);
         }
         
  })
  
  socialmedaiaRoutes.delete('/posts/delete/:id',async(req,res)=>{
      let id = req.params.id;
      let payload = req.body;
      let find = await Socialmodel.find({'_id':id});
      console.log(find);
      let postid = find[0].userID;
      console.log(postid);
      let making_rewq = req.body.userID;
      try {
       if(postid!=making_rewq){
           res.send({msg:'error deleted user not authorized'})
          }else{
           let update = await Socialmodel.findByIdAndDelete({'_id':id});
           res.send({msg:'user post deleted '});
          //  console.log(update)
          }
      } catch (error) {
       res.send({msg:'error in deleted not authorized'})
        console.log(error);
      }
      
  })

  module.exports = {socialmedaiaRoutes}