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
    cloud_name: 'daiawfeup',
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
            console.error("Cloudinary Upload Error:", error);
            // If failes remove file from our server
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
            throw new Error("Unable to upload image to Cloudinary");
        });
    return uploadResult

}


export default uploadToCloudinary