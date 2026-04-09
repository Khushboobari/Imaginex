import { v2 as cloudinary } from 'cloudinary';
import fs from "node:fs"
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });


// Configuration
cloudinary.config({
    cloud_name: 'dqdejbfnx',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});




const uploadToCloudinary = async (filePath) => {


    // Upload an image
    const uploadResult = await cloudinary.uploader
        .upload(
            filePath, {
            resource_type: "auto"
        }
        )
        .catch((error) => {
            console.log(error);
            // If failes remove file from our server
            fs.unlinkSync(filePath)
        });
    return uploadResult

}


export default uploadToCloudinary