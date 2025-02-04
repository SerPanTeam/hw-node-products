import mongoose from "mongoose";
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("MONGO_URI is not defined in .env file!");
    process.exit(1);
}

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI);
        console.log("Connection to DB successful!", conn.connection.host);
    } catch (error) {
        console.log("Error connection to DB!", error);
        process.exit(1);

    }
}

export default connectDB;