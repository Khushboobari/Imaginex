import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import postService from './postService';

const initialState = {
    posts: [],
    post: null,
    postLoading: false,
    postSuccess: false,
    postError: false,
    postErrorMessage: ""
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(generatePost.pending, (state, action) => {
                state.postLoading = true
                state.postSuccess = false
                state.postError = false
            })
            .addCase(generatePost.fulfilled, (state, action) => {
                state.postLoading = false
                state.postSuccess = true
                state.post = action.payload
                state.postError = false
            })
            .addCase(generatePost.rejected, (state, action) => {
                state.postLoading = false
                state.postSuccess = false
                state.postError = true
                state.postErrorMessage = action.payload
            })
            .addCase(getPosts.pending, (state, action) => {
                state.postLoading = true
                state.postSuccess = false
                state.postError = false
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.postLoading = false
                state.postSuccess = true
                state.posts = action.payload
                state.post = null
                state.postError = false
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.postLoading = false
                state.postSuccess = false
                state.postError = true
                state.postErrorMessage = action.payload
            })
            .addCase(getPost.pending, (state, action) => {
                state.postLoading = true
                state.postSuccess = false
                state.postError = false
            })
            .addCase(getPost.fulfilled, (state, action) => {
                state.postLoading = false
                state.postSuccess = true
                state.post = action.payload
                state.postError = false
            })
            .addCase(getPost.rejected, (state, action) => {
                state.postLoading = false
                state.postSuccess = false
                state.postError = true
                state.postErrorMessage = action.payload
            })
            .addCase(likeUnlikePost.pending, (state, action) => {
                state.postLoading = true
                state.postSuccess = false
                state.postError = false
            })
            .addCase(likeUnlikePost.fulfilled, (state, action) => {
                state.postLoading = false
                state.postSuccess = true
                state.post = action.payload
                state.postError = false
            })
            .addCase(likeUnlikePost.rejected, (state, action) => {
                state.postLoading = false
                state.postSuccess = false
                state.postError = true
                state.postErrorMessage = action.payload
            })
            .addCase(reportPost.pending, (state, action) => {
                state.postLoading = true
                state.postSuccess = false
                state.postError = false
            })
            .addCase(reportPost.fulfilled, (state, action) => {
                state.postLoading = false
                state.postSuccess = true
                state.postError = false
            })
            .addCase(reportPost.rejected, (state, action) => {
                state.postLoading = false
                state.postSuccess = false
                state.postError = true
                state.postErrorMessage = action.payload
            })
    }
});

export const { } = postSlice.actions

export default postSlice.reducer

// Generate Post
export const generatePost = createAsyncThunk("POST/GENERATE", async (prompt, thunkAPI) => {

    let token = thunkAPI.getState().auth.user.token

    try {
        return await postService.generateAndPostImage(prompt, token)
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})


// Get Posts
export const getPosts = createAsyncThunk("POSTS/GET", async (_, thunkAPI) => {

    let token = thunkAPI.getState().auth.user.token

    try {
        return await postService.fetchPosts(token)
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})


// Get Post
export const getPost = createAsyncThunk("POST/GET", async (pid, thunkAPI) => {

    let token = thunkAPI.getState().auth.user.token

    try {
        return await postService.fetchPost(pid, token)
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})


// Like Or Unlike Post
export const likeUnlikePost = createAsyncThunk("POST/LIKEORUNLIKE", async (pid, thunkAPI) => {

    let token = thunkAPI.getState().auth.user.token

    try {
        return await postService.updateLikeUnlike(pid, token)
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }


})



// Report Post
export const reportPost = createAsyncThunk("POST/REPORT", async (postDetails, thunkAPI) => {

    let token = thunkAPI.getState().auth.user.token

    try {
        return await postService.postReport(postDetails, token)
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }


})
