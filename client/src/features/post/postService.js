import axios from "axios"

const API_URL = "/api/posts"

const generateAndPostImage = async (prompt, token) => {

    let options = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, { prompt: prompt }, options)
    return response.data
}

const fetchPosts = async (token) => {

    let options = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, options)
    return response.data
}


const fetchPost = async (pid, token) => {

    let options = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + "/" + pid, options)
    return response.data
}


const updateLikeUnlike = async (pid, token) => {

    let options = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }


    const response = await axios.put(API_URL + "/" + pid, {}, options)
    return response.data


}


const postReport = async (postDetail, token) => {

    let options = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(`${API_URL}/${postDetail.pid}`, postDetail, options)
    return response.data
}



const postService = { generateAndPostImage, fetchPosts, fetchPost, updateLikeUnlike, postReport }

export default postService