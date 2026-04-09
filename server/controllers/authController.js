import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

const registerUser = async (req, res) => {

    const { name, email, phone, password, bio } = req.body

    // Check if all fields are coming
    if (!name || !email || !phone || !password || !bio) {
        res.status(409)
        throw new Error('Please Fill All Details!')
    }

    // Check if user already exists 
    let userNameExist = await User.findOne({ name: name })
    let emailExist = await User.findOne({ email: email })
    let phoneExist = await User.findOne({ phone: phone })

    if (userNameExist || emailExist || phoneExist) {
        res.status(409)
        throw new Error("User Already Exists!")
    }


    // Hash Password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Register User
    let user = await User.create({ name, email, phone, password: hashedPassword, bio })

    if (!user) {
        res.status(400)
        throw new Error("User Not Created!")
    }

    res.status(201).json({
        id: user._id,
        name: user.name,
        bio: user.bio,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin,
        isActive: user.isActive,
        createdAt: user.createdAt,
        credits: user.credits,
        token: generateToken(user._id)
    })


}


const loginUser = async (req, res) => {
    const { email, password } = req.body

    // Check if all fields are coming
    if (!email || !password) {
        res.status(409)
        throw new Error('Please Fill All Details!')
    }

    // Check if user  exists 
    let user = await User.findOne({ email: email })

    // Check if users is not banned
    if (!user.isActive) {
        res.status(401)
        throw new Error("You Are Banned! Contact Admin!")
    }


    if (user && await bcrypt.compare(password, user.password)) {
        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            bio: user.bio,
            phone: user.phone,
            isAdmin: user.isAdmin,
            isActive: user.isActive,
            credits: user.credits,
            createdAt: user.createdAt,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid Credentials!")
    }


}


// Protected Controller
const privateController = (req, res) => {
    res.send("I am Private Controller " + req.user.name)
}




// Generate Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}




const authController = { registerUser, loginUser, privateController }

export default authController

