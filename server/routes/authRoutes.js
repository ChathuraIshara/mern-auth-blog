const express = require('express');
const { register, login, logout,deleteAllUsers,sendVerifyOtp,verifyOtp, isAuthenticated, sendResetOtp, resetPassword } = require('../controllers/authController');
const { makeUserAdmin, getAllUsers } = require('../controllers/adminController');
const userAuth = require('../middleware/userAuth'); // importing userAuth middleware for protected routes
const adminAuth = require('../middleware/adminAuth'); // importing adminAuth middleware for admin routes

const authRouter = express.Router();

authRouter.post('/register',register);
authRouter.post('/login',login);
authRouter.post('/logout',logout);
authRouter.get('/hello',(req,res)=>{res.json({message:"Hello from auth route!"})});

// Admin routes
authRouter.delete('/delete-all-users', adminAuth, deleteAllUsers);
authRouter.get('/admin/users', adminAuth, getAllUsers);
authRouter.put('/admin/make-admin', adminAuth, makeUserAdmin);

// User routes
authRouter.post('/send-verify-otp', userAuth,sendVerifyOtp);
authRouter.post('/verify-account', userAuth,verifyOtp);
authRouter.get('/is-auth', userAuth,isAuthenticated);
authRouter.post('/send-reset-otp',sendResetOtp);
authRouter.post('/reset-password',resetPassword);




module.exports = authRouter;