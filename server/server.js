import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb";

const app = express();
const port = process.env.PORT || 4000;
connectDB()

app.use(express.json());
app.use(cookieParser());
app.use(cors({Credential : true}))

app.get("/",(req,res)=>{
    res.send("Server runs")
})

app.listen(port , ()=>{
    console.log(`server run at http://localhost:${port}`)
});