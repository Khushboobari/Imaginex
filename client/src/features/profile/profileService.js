import axios from "axios"

const API_URL = "/api/profile"

const fetchProfile = async (username) => {
    const response = await axios.get(API_URL + "/" + username)
    localStorage.setItem('profile', JSON.stringify(response.data))
    return response.data
}

const sendFollowRequest = async (uid, token) => {


    let options = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put('/api/user/follow/' + uid, {}, options)
    return response.data


}

const sendUnFollowRequest = async (uid, token) => {


    let options = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put('/api/user/unfollow/' + uid, {}, options)
    return response.data


}



const profileService = { fetchProfile, sendFollowRequest, sendUnFollowRequest }

export default profileService