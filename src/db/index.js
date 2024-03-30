import mongoose from "mongoose"



const connectDB = async () => {
    const dbInstance = mongoose.connect(process.env.MONGODB_URI)
    .then(db => console.log("Database connected successfully"))
    .catch((err) => {
        console.error(err.message);
    })
}


export default connectDB;