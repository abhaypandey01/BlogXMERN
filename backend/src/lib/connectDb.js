import mongoose from "mongoose";
import 'dotenv/config';

const connectDb = async () =>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        if(conn){
            console.log("Connection successful: ", conn.connection.host);
        }
    } catch (error) {
        console.log("Error while connecting to mongodb: ", error.message)
    }
}

export default connectDb;