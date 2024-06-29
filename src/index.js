import dotenv from 'dotenv';
dotenv.config();
import { app } from './app.js';
import connectTODB from "./db/connectDb.js";

const port = process.env.PORT || 6000;

connectTODB()
.then( () => {
    app.listen(port , () => {
        console.log(`Server started on port ${port}`);
    })
})
.catch((err) => {
    console.log('MongoDB connection failed ', err);
})


