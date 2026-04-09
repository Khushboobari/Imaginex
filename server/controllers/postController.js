import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import uploadToCloudinary from "../middleware/cloudinaryMiddleware.js";
import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import Report from "../models/reportModel.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));


const generateAndPost = async (req, res) => {

    let userId = req.user.id
    let newPost

    // Check if user exists
    const user = await User.findById(userId)

    if (!user) {
        res.status(404)
        throw new Error("User Not Found!")
    }


    // Check if user have enough credits
    if (user.credits < 1) {
        res.status(409)
        throw new Error("Not Enough Credits!")
    }



    try {
        // Get Prompt
        const { prompt } = req.body

        // Check if prompt is coming in body
        if (!prompt) {
            res.status(409)
            throw new Error("Kindly Provide Prompt To Generate Image!")
        }

        // Use Pollinations for AI Image Generation
        const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;
        console.log(`[DEBUG] Fetching image from Pollinations AI: ${pollinationsUrl}`);
        
        const imageResponse = await fetch(pollinationsUrl);
        console.log(`[DEBUG] Pollinations AI Response Status: ${imageResponse.status}`);
        
        if (!imageResponse.ok) {
            throw new Error("Failed to generate image.");
        }
        
        const arrayBuffer = await imageResponse.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Save locally
        const filename = crypto.randomUUID() + ".png";
        const dirPath = path.join(__dirname, "../generated-content");
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
        const filePath = path.join(dirPath, filename);
        // Write file into server
        fs.writeFileSync(filePath, buffer);
        console.log(`[DEBUG] Image generated and saved locally at: ${filePath}`);
        
        // Upload to cloudinary 
        console.log(`[DEBUG] Uploading image to Cloudinary...`);
        const imageLink = await uploadToCloudinary(filePath);
        console.log(`[DEBUG] Cloudinary upload successful. URL: ${imageLink.secure_url}`);
        
        // Remove Image From Server
        fs.unlinkSync(filePath);

        // Create Post
        newPost = new Post({
            user: userId,
            imageLink: imageLink.secure_url,
            prompt: prompt
        });

        // Save Post To DB
        await newPost.save();
        // Aggregate User Details In newPost Object
        await newPost.populate('user');


        // Update Credits
        await User.findByIdAndUpdate(user._id, { credits: user.credits - 1 }, { new: true })

        res.status(201).json(newPost)


    } catch (error) {
        console.log(error.message)
        res.status(409)
        throw new Error("Post Not Created!")
    }

}


const getPosts = async (req, res) => {
    const posts = await Post.find().populate('user')

    if (!posts) {
        res.status(404)
        throw new Error("Posts Not Found!")
    }

    res.status(200).json(posts)

}

const getPost = async (req, res) => {
    const post = await Post.findById(req.params.pid).populate('user')

    if (!post) {
        res.status(404)
        throw new Error("Post Not Found!")
    }

    res.status(200).json(post)

}


const likeAndUnlikePost = async (req, res) => {

    let currentUser = await User.findById(req.user._id)

    // Check if user exists
    if (!currentUser) {
        res.status(404)
        throw new Error('User Not Found!')
    }

    // Check if posts exist
    const post = await Post.findById(req.params.pid).populate('user')

    if (!post) {
        res.status(404)
        throw new Error("Post Not Found!")
    }

    // Check if already liked
    if (post.likes.includes(currentUser._id)) {
        // Dislike
        // Remove Follower from likes
        let updatedLikesList = post.likes.filter(like => like.toString() !== currentUser._id.toString())
        post.likes = updatedLikesList
        await post.save()
    } else {
        // Like
        // Add Follower in Liked
        post.likes.push(currentUser._id)
        await post.save()
    }

    // Populate after save using the Post model directly
    // await Post.populate(post, { path: 'likes' })

    res.status(200).json(post)


}


const reportPost = async (req, res) => {

    const { text } = req.body
    const postId = req.params.pid
    const userId = req.user._id

    if (!text) {
        res.status(409)
        throw new Error("Please Enter Text")
    }

    const newReport = new Report({
        user: userId,
        post: postId,
        text: text
    })

    await newReport.save()
    await newReport.populate('user')
    await newReport.populate('post')

    if (!newReport) {
        res.status(409)
        throw new Error("Unable To Report This Post")
    }

    res.status(201).json(newReport)

}








const postController = { generateAndPost, getPosts, getPost, likeAndUnlikePost, reportPost }




export default postController





