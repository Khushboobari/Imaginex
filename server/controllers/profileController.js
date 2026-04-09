import Post from "../models/postModel.js"
import User from "../models/userModel.js"

const getMyFollowers = async (req, res) => {

    const user = await User.findById(req.user.id).populate('followers')

    if (!user) {
        res.status(404)
        throw new Error('User Not Found!')
    }

    res.status(200).json(user.followers)


}

const getProfile = async (req, res) => {

    const { name } = req.params
    const user = await User.findOne({ name: name }).populate('followers').populate('following')
    const posts = await Post.find({ user: user._id })

    if (!user || !posts) {
        res.status(404)
        throw new Error('User Not Found! , Posts Not Found')
    }

    const profile = {
        _id: user._id,
        name: user.name,
        email: user.email,
        bio: user.bio,
        followers: user.followers,
        following: user.following,
        credits: user.credits,
        posts: posts,
        createdAt: user.createdAt
    }


    res.status(200).json(profile)


}



const getMyFollowings = async (req, res) => {
    const user = await User.findById(req.user.id).populate('following')

    if (!user) {
        res.status(404)
        throw new Error('User Not Found!')
    }

    res.status(200).json(user.following)
}


const profileController = { getMyFollowers, getMyFollowings, getProfile }


export default profileController