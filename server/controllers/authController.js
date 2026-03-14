const registerUser =async (req , res) => {
    res.send("User Registered!")
}

const authController = { registerUser }

export default authController