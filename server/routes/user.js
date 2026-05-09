const express = require("express");
const router = express.Router();

const { login , signup } = require("../controler/auth.js");
const { auth , isStudent , isAdmin} = require("../middlewares/auth.js")

// router.post("/login",login)
router.post("/signup" , signup)
router.post("/login",login)

//test
router.get("/Test" , auth , (req,res)=>{
    res.json({
        success:true,
        message:"welcome to protected route for Test"
    })
})

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