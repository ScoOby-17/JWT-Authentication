var jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  try {
    let token = req.cookies.token;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "token Missing",
      });
    }

    try {
      let payload = jwt.verify(token, "ThisSecreat");
      req.user = payload;
      next();
    } catch (err) {
      console.log("error in verify payload");
      return res.status(401).json({
        success: false,
        message: "Token expired please login again :(",
      });
    }
  } catch (error) {
    console.log(error.name);
    return res.status(400).json({
      success: false,
      message: "Error occure",
    });
  }
};


exports.isStudent = (req, res, next) => {
  try {

    if (req.user.role !== "Student") {
      return res.status(401).json({
        success: false,
        message: "You are not a student",
      });
    }

    next();

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: "Error occured in server",
    });

  }
};

exports.isAdmin = (req, res, next) => {
  try {

    if (req.user.role !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "You are not a Admin",
      });
    }

    next();

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: "Error occured in server",
    });

  }
};