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
