
import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectTODB = async () => {
    try{
        console.log('trying to connect');
        const connectionResponse = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log('MongoDB connected');
    }catch(err){
        console.log('MongoDB connection is not established');
        console.log(err);
        process.exit(1);
    }
}

export default connectTODB;