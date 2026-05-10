const express = require("express");
const router = express.Router();
const mongoose = require("mongoose")
const User = require("../models/User.js")

const { login , signup } = require("../controler/auth.js");
const { auth , isStudent , isAdmin} = require("../middlewares/auth.js")


router.get("/home" , auth , async(req,res)=>{
    let {id} = req.user;
    let data = await User.findById(id)
    res.render("Home.ejs" ,{data})
})

router.get("/signup",(req,res)=>{
    res.render("signup.ejs")
})

router.get("/login",(req,res)=>{
    res.render("Login.ejs")
})

// router.post("/login",login)
router.post("/signup" , signup)
router.post("/login",login)

//protrcted routes
router.get("/student" , auth  , isStudent , (req,res)=>{
    res.json({
        success:true,
        message:"welcome to protected route for students"
    })
})

router.get("/Admin" , auth , isAdmin , (req,res)=>{
    res.json({
        success:true,
        message:"welcome to protected route for Admin"
    })
})

module.exports = router