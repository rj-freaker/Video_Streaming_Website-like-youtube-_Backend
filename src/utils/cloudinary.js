import { v2 } from "cloudinary";
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config({
    path: './../.env'
});

v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloud =  async (localFilePath) => {
    try{
        if(!localFilePath) return null;
        const response = await v2.uploader.upload(localFilePath, {
            resource_type: "auto"
        });
        console.log('File is uploaded successfully', response.url);
        return response;
    }
    catch(err){
        fs.unlinkSync(localFilePath);
        return err;
    }
} 

export {uploadOnCloud};