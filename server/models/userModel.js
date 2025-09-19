const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    verifyOtp:{
        type: String,
        default:''
    },
    verifiyOtpExpireAt:{
        type:Number,
        default:0
    },
    isAccountVerified:{
        type:Boolean,
        default:false
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    resetOtp:{
        type:String,
        default:''
    },
    resetOtpExpiresAt:{
        type:Number,
        default:0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;