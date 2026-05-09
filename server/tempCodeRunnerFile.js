const express = require("express");
const app = express();
const connectDb = require("./config/database")
var jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");

require('dotenv').config();
const port = 4000;
connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const user = require("./routes/user.js")
app.use("/api/v1",user);

app.listen(port,()=>{
    console.log("Server Running")
})