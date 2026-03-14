import express from "express"
import dotenv from "dotenv"
import colors from "colors"
import connectDB from "./config/dbconfig.js"

//local import
import authRoutes from "./Routes/authRoutes.js"

dotenv.config()

const PORT = process.env.PORT || 5000
const app = express()

//DB CONNECTION
connectDB()

//Default route
app.get("/" , (req, res) => {
    res.json({
        message : "WELCOME TO IMAGINEX API...."
    })
})

//Auth Routes
app.use("/api/auth" , authRoutes )

app.listen(PORT , () => {
    console.log('SERVER IS RUNNING AT PORT : ${PORT}'.bgBlue.white)
})