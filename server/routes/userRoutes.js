const express = require("express");
const getUserData = require("../controllers/userController"); // importing getUserData controller
const userAuth = require("../middleware/userAuth"); // importing userAuth middleware for protected routes

const userRoutes = express.Router();

userRoutes.get("/getUserData", userAuth, getUserData);

module.exports = userRoutes;