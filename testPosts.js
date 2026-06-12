import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

import Post from './server/models/postModel.js';
import connectDB from './server/config/dbConfig.js';

async function testPosts() {
    await connectDB();
    const posts = await Post.find();
    console.log(`Found ${posts.length} posts.`);
    process.exit();
}
testPosts();
