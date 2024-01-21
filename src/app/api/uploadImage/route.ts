import { ShowLogs } from "@/app/config/config";
import { NextRequest, NextResponse} from "next/server";
import { put } from "@vercel/blob";

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

        const { url } = await put(image.name, image, { access: 'public' });

        return NextResponse.json({
            image: url,
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