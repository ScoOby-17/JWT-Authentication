const bcrypt = require("bcrypt");
const User = require("../models/User.js");
const mongoose = require("mongoose");
var jwt = require("jsonwebtoken");

//signUp route
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    //user exist;
    const isExist = await User.findOne({ email });
    if (isExist) {
      return res.send("Email already registerd");
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

    let payload = {
      name: user.name,
      role: user.role,
      email: user.email,
      id: user._id,
    };

    let token = jwt.sign(payload, "ThisSecreat", {
      expiresIn: "2h",
    });

    res.cookie("token", token, { httpOnly: true }).redirect("/api/v1/home");
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "user cant register plzz try again later",
    });
  }
};

//login route
exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;
    //miss info
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Fill all details",
      });
    }

    //user not exist;
    let user = await User.findOne({ email });
    if (!user) {
      return res.send("Email not registerd please signu first then login");
    }

    // verify password and generate JWT token
    if (await bcrypt.compare(password, user.password)) {
      let payload = {
        name: user.name,
        role: user.role,
        email: user.email,
        id: user._id,
      };

      let token = jwt.sign(payload, "ThisSecreat", {
        expiresIn: "2h",
      });

      user.password = undefined;
      let option = {
        httpOnly: true,
        secure: true, // in production
        sameSite: "strict",
        expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
      };

      return res.cookie("token", token, option).redirect("/api/v1/home");
    } else {
      return res
        .status(400)
        .json({
          success: false,
          message: "Wrong Password",
        })
        .send("Wrong Password");
    }
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({
        success: false,
        message: "Some error occure",
      })
      .send("Error occure in signup");
  }
};
