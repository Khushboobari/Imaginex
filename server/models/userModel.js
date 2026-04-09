import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, "Please Enter Your Name"],
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true
    },
    phone: {
        type: String,
        required: [true, "Please Enter Your Phone"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
    },
    avatar: {
        type: String,
        default: "",
    },
    bio: {
        type: String,
        required: [true, "Please Enter Your Bio"],
    },
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    isAdmin: {
        type: Boolean,
        default: false,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true,
        required: true
    },
    credits: {
        type: Number,
        default: 5,
        required: true
    }
}, {
    timestamps: true
})


const user = mongoose.model('User', userSchema)


export default user