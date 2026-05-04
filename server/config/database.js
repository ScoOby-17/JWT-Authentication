const mongoose = require("mongoose");
require("dotenv").config();

async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/AuthApp");
    console.log("connected to database");
  } catch (err) {
    console.log("Error occure");
    console.log(err.name);
  }
}

module.exports = main;
