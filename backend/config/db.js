import mongoose from "mongoose"

const connectDB = async() => {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 30000,
    })
    .then(()=>{
        console.log("Database Connected Successfully ")
    })
    .catch((error)=>{
        console.log("Database Connection Failed!", error)
    })
}

export default connectDB