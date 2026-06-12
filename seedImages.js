import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

import Post from './server/models/postModel.js';
import User from './server/models/userModel.js';
import connectDB from './server/config/dbConfig.js';

async function seedData() {
    await connectDB();
    
    const mockUsersData = [
        {
            name: "CyberPunk Master",
            email: "cyberpunk@imaginex.com",
            phone: "1111111111",
            password: "password123",
            bio: "Exploring the neon lit future.",
            avatar: "https://picsum.photos/seed/cyberpunk_avatar/100/100",
            isAdmin: false,
            isActive: true,
            credits: 9999
        },
        {
            name: "Nature Lover",
            email: "nature@imaginex.com",
            phone: "2222222222",
            password: "password123",
            bio: "Beautiful landscapes and nature art.",
            avatar: "https://picsum.photos/seed/nature_avatar/100/100",
            isAdmin: false,
            isActive: true,
            credits: 9999
        },
        {
            name: "Abstract Dreamer",
            email: "abstract@imaginex.com",
            phone: "3333333333",
            password: "password123",
            bio: "Surreal and abstract dimensions.",
            avatar: "https://picsum.photos/seed/abstract_avatar/100/100",
            isAdmin: false,
            isActive: true,
            credits: 9999
        }
    ];

    let createdUsers = [];

    for (let data of mockUsersData) {
        let mockUser = await User.findOne({ email: data.email });
        if (!mockUser) {
            mockUser = new User(data);
            await mockUser.save();
            console.log(`Mock user ${data.name} created.`);
        }
        createdUsers.push(mockUser);
    }

    const allUsers = await User.find({ _id: { $nin: createdUsers.map(u => u._id) } });

    for (let mockUser of createdUsers) {
        for (let user of allUsers) {
            if (!user.following.includes(mockUser._id)) {
                user.following.push(mockUser._id);
                await user.save();
            }
            if (!mockUser.followers.includes(user._id)) {
                mockUser.followers.push(user._id);
            }
        }
        await mockUser.save();
    }
    console.log(`Updated following lists for ${allUsers.length} users to follow new mock creators.`);

    console.log("Generating mock posts for new accounts...");
    const basePrompts = [
        "A futuristic cyberpunk city",
        "A serene landscape with mountains and a lake",
        "A portrait of a knight in shining armor",
        "An astronaut floating in deep space",
        "A magical forest with glowing plants",
        "A steampunk flying machine",
        "A realistic painting of a cute cat",
        "An ancient temple in the jungle",
        "A neon-lit street in Tokyo at night",
        "A dragon soaring over a castle",
        "A beautiful sunset on a tropical beach",
        "A surreal dreamscape with floating islands"
    ];

    for (let i = 0; i < createdUsers.length; i++) {
        let mockUser = createdUsers[i];
        for (let j = 0; j < 6; j++) {
            const height = (j % 2 === 0) ? 800 : 500;
            const newPost = new Post({
                user: mockUser._id,
                imageLink: `https://picsum.photos/seed/imaginex_art_new_${i}_${j}_${Date.now()}/400/${height}`,
                prompt: basePrompts[(i * 4 + j) % basePrompts.length] + ` - by ${mockUser.name}`,
                isPublished: true,
                likes: []
            });
            await newPost.save();
        }
    }

    console.log("Successfully seeded 18 new posts from 3 new accounts!");
    process.exit();
}

seedData();
