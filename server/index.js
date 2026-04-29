import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config"
import connectDB from "./config/mongoDB.js";

const PORT = process.env.PORT || 4000
const app = express();
connectDB()

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials : true}));

app.get("/",(req,res)=>{
    res.send("API WORKS")
})

app.listen(PORT , ()=>{
    console.log("http://localhost:4000")
})