import fs from 'node:fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

import User from './server/models/userModel.js';
import Post from './server/models/postModel.js';
import postController from './server/controllers/postController.js';
import connectDB from './server/config/dbConfig.js';

async function testFullApi() {
    await connectDB();
    console.log("DB Connected");

    // find admin user
    const user = await User.findOne({});
    if(!user) {
        console.log("No user found");
        process.exit();
    }
    console.log("Found user:", user.email, "credits:", user.credits);
    if(user.credits < 1) {
        user.credits = 5;
        await user.save();
        console.log("Gave user 5 credits");
    }

    // Mock Req/Res
    const req = {
        user: { id: user._id.toString() },
        body: {
            prompt: "a test prompt"
        }
    };
    const res = {
        status: function(code) {
            console.log("Status set to:", code);
            return this;
        },
        json: function(data) {
            console.log("JSON response:", data);
            process.exit();
        }
    };

    try {
        await postController.generateAndPost(req, res);
    } catch(e) {
        console.error("Caught error in test:", e);
        process.exit();
    }
}
testFullApi();
