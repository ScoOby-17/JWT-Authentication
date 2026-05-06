const bcrypt = require("bcrypt");
const User = require("../models/User.js");

//signUp route

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    //user exist;
    const isExist = await User.findOne({ email });
    if (isExist) {
      return res.status(400).json({
        success: false,
        message: "user already exists",
      });
    }
    //USer doesNot exists
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Error In hasing password",
      });
    }
    //create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return res.status(200).json({
      success: true,
      message: "user created sucessfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "user cant register plzz try again later",
    });
  }
};


exports.login = async(req,res)=>{
  try{
    let {email , password} = req.body;
  //miss info
  if(!email || !password){
    return res.status(400).json({
      success:false,
      message:"Fill all details"
    })
  }

  //user not exist;
  let user = await User.findOne({email});
  if(!user){
    return res.status(400).json({
      success:false,
      message:"User not exist"
    })
  }
  
  // verify password and generate JWT token
  if(await bcrypt.compare(password,user.password)){

  }else{
    return res.status(400).json({
      success:false,
      message:"Wrong Password"
    })
  }
  }catch(error){
    console.log(error.message);
    res.status({
      success:false,
      message: "Some error occure"
    })
  }
}