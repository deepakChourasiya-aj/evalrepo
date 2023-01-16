const mongoose = require('mongoose')

const userSchmema = mongoose.Schema({
    name : String,
    email : String,
    gender : String,
    password : String
})

const UserModel = mongoose.model('userdata',userSchmema);
module.exports = {UserModel}