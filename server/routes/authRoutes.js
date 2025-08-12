const express = require('express');
const { register, login, logout,deleteAllUsers,sendVerifyOtp,verifyOtp } = require('../controllers/authController');
const userAuth = require('../middleware/userAuth'); // importing userAuth middleware for protected routes

const authRouter = express.Router();

authRouter.post('/register',register);
authRouter.post('/login',login);
authRouter.post('/logout',logout);
authRouter.get('/hello',(req,res)=>{res.json({message:"Hello from auth route!"})});
authRouter.delete('/delete-all-users', deleteAllUsers);
authRouter.post('/send-verify-otp', userAuth,sendVerifyOtp);
authRouter.post('/verify-account', userAuth,verifyOtp);

module.exports = authRouter;