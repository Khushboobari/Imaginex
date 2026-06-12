import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import uploadToCloudinary from './server/middleware/cloudinaryMiddleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testCloud() {
    try {
        const dummyPath = path.join(__dirname, 'dummy.txt');
        fs.writeFileSync(dummyPath, 'test file');
        console.log("Uploading to cloudinary...");
        const result = await uploadToCloudinary(dummyPath);
        console.log("Uploaded! URL:", result.secure_url);
    } catch(e) {
        console.error("Cloudinary failed:", e.message);
    }
}
testCloud();
