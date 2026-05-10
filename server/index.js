const express = require("express");
const app = express();
const connectDb = require("./config/database")
var jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");
const ejs = require('ejs');
const path = require("path")

require('dotenv').config();
const port = 4000;
connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "/public")));


const user = require("./routes/user.js")
app.use("/api/v1",user);

app.listen(port,()=>{
    console.log("Server Running http://localhost:4000/api/v1/signup")
})