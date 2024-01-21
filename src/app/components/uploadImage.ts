"use server";

import {v2 as cloudinary} from "cloudinary";

cloudinary.config({ 
    cloud_name: 'djl0kis4l', 
    api_key: process.env.CLOUDINARY_api_key, 
    api_secret: process.env.CLOUDINARY_api_secret,
    secure: true
});

export default async function uploadImages(formData: FormData) {
        'use server';

        try {

            const file = formData.get("image") as File;
            const arrayBuffer = await file.arrayBuffer();
            
            const buffer = new Uint8Array(arrayBuffer);

            return new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({
                    tags: ["next-server-actions-upload-sneakers"]
                }, function(error, result){
                    if (error){
                        reject(error);
                        return;
                    }
                    else{
                        resolve(result);
                    } 

                }).end(buffer);
            })
            
        } catch (error) {
            return null;
        }
}