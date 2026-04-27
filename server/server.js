import express from "express"
import dotenv from "dotenv"
import colors from "colors"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url"
import connectDB from "./config/dbConfig.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Local Imports
import errorHandler from "./middleware/errorHandler.js"
import authRoutes from "./routes/authRoutes.js"
import followRoutes from "./routes/followRoutes.js"
import profileRoutes from "./routes/profileRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import postRoutes from "./routes/postRoutes.js"
import savedPostsRoutes from "./routes/savedPostRoutes.js"

dotenv.config({ path: path.join(__dirname, '../.env') })

const PORT = process.env.PORT || 5000
const app = express()

// Enable CORS
app.use(cors())

// DB Connection
connectDB()

// Body Parser
app.use(express.json())
app.use(express.urlencoded())


// Default Route
app.get("/", (req, res) => {
    res.json({
        message: "WELCOME TO IMAGINEX API..."
    })
})


// Auth Routes
app.use("/api/auth", authRoutes)

// Follow Routes
app.use("/api/user", followRoutes)

// Profile Routes
app.use("/api/profile", profileRoutes)

// Admin Routes
app.use("/api/admin", adminRoutes)

// Post Routes
app.use("/api/posts", postRoutes)

// Saved Posts
app.use("/api/saved-posts", savedPostsRoutes)



// Error Handler
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING AT PORT : ${PORT}`.bgBlue.black)
}).on('error', err => {
    console.error('❌ Server failed to start:', err);
    process.exit(1);
});