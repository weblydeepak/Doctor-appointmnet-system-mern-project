const mongoose = require('mongoose');

const userSchema = new  mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    isAdmin:{
    type: Boolean,
        default: false
    },
    isDoctor:{      
        type:Boolean,
        default: false
    },
    notification:{
        type:Array,
        default:[]
    },
    seennotification:{
        type:Array,
        default:[]
    }
})


const Usermodel = mongoose.model('userdata',userSchema);
module.exports= Usermodel;