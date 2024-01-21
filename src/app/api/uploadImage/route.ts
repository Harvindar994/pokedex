import { ShowLogs } from "@/app/config/config";
import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse} from "next/server";
import dotenv from 'dotenv';

export async function POST(request: NextRequest) {

    try {
        const from = await request.formData();

        const image = from.get("image") as File;

        if (!image.name){
            return NextResponse.json({
                error: 402,
                message: "Please Select an Image"
            }, {status: 200})
        }

        dotenv.config()
        cloudinary.config()

        const arrayBuffer = await image.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);

        const respose: any = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({
                tags: ["next-server-actions-upload-sneakers"]
            }, function (error, result) {
                if (error) {

                    if (ShowLogs)
                        console.warn(respose);

                    reject(error);
                }
                else {
                    resolve(result);
                }

            }).end(buffer);
        })

        if (!respose){
            return NextResponse.json({
                message: "Unable to upload image"
            }, {status: 400})
        }

        return NextResponse.json({
            image: respose.secure_url,
            message: "Image uploaded"
        }, {status: 200})

    } catch (error) {
        if (ShowLogs)
            console.log(error)
        
        return NextResponse.json({
            message: "Unable to upload image"
        }, {status: 400})
    }
}