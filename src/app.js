import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

//for data coming to server in json format
app.use(express.json({limit: '16kb'}));

//for data coming to server from url as encoded format
app.use(express.urlencoded({limit: '16kb'}));

//if a file upload is done and want to keep it on the server 
app.use(express.static('public'));

//for secure cookie access to server only
app.use(cookieParser());



export {app};