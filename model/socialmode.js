const mongoose = require('mongoose')

const socialschema = mongoose.Schema({
    title : String,
    body : String,
    device : String,
    userID : String
})

const Socialmodel = mongoose.model('socialmediapost',socialschema);
module.exports = {Socialmodel}

