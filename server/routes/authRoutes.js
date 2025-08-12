const express = require('express');
const { register, login, logout,deleteAllUsers } = require('../controllers/authController');

const authRouter = express.Router();

authRouter.post('/register',register);
authRouter.post('/login',login);
authRouter.post('/logout',logout);
authRouter.get('/hello',(req,res)=>{res.json({message:"Hello from auth route!"})});
authRouter.delete('/delete-all-users', deleteAllUsers);
module.exports = authRouter;