import mongoose from "mongoose";

let connectDB = async()=>{

    mongoose.connection.on('connected',()=>{console.log("Database conneected")})
    console.log(process.env.MONGODB_URI)
    await mongoose.connect(`${process.env.MONGODB_URI}/mern-auth`)
}

export default connectDB