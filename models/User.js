const  mongoose = require('mongoose');

const User = mongoose.Schema({
    name: {
        type:String,
        required: true,
    },
    email:{
        type :String,
        required:true,
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
})
const userModelFinal =mongoose.model('User', User) 
module.exports = userModelFinal;