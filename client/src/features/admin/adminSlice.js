import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import adminService from './adminService';

const initialState = {
    users: [],
    posts: [],
    reports: [],
    adminLoading: false,
    adminSuccess: false,
    adminError: false,
    adminErrorMessage: ""
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state, action) => {
                state.adminLoading = true
                state.adminSuccess = false
                state.adminError = false
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.adminLoading = false
                state.adminSuccess = true
                state.users = action.payload
                state.adminError = false
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.adminLoading = false
                state.adminSuccess = false
                state.adminError = true
                state.adminErrorMessage = action.payload
            })
            .addCase(getAllPosts.pending, (state, action) => {
                state.adminLoading = true
                state.adminSuccess = false
                state.adminError = false
            })
            .addCase(getAllPosts.fulfilled, (state, action) => {
                state.adminLoading = false
                state.adminSuccess = true
                state.posts = action.payload
                state.adminError = false
            })
            .addCase(getAllPosts.rejected, (state, action) => {
                state.adminLoading = false
                state.adminSuccess = false
                state.adminError = true
                state.adminErrorMessage = action.payload
            })
            .addCase(getAllReports.pending, (state, action) => {
                state.adminLoading = true
                state.adminSuccess = false
                state.adminError = false
            })
            .addCase(getAllReports.fulfilled, (state, action) => {
                state.adminLoading = false
                state.adminSuccess = true
                state.reports = action.payload
                state.adminError = false
            })
            .addCase(getAllReports.rejected, (state, action) => {
                state.adminLoading = false
                state.adminSuccess = false
                state.adminError = true
                state.adminErrorMessage = action.payload
            })
            .addCase(banUnBanUser.pending, (state, action) => {
                state.adminLoading = true
                state.adminSuccess = false
                state.adminError = false
            })
            .addCase(banUnBanUser.fulfilled, (state, action) => {
                state.adminLoading = false
                state.adminSuccess = true
                state.users = state.users.map(user => user._id === action.payload._id ? action.payload : user)
                state.adminError = false
            })
            .addCase(banUnBanUser.rejected, (state, action) => {
                state.adminLoading = false
                state.adminSuccess = false
                state.adminError = true
                state.adminErrorMessage = action.payload
            })
            .addCase(publishUnPublishPost.pending, (state, action) => {
                state.adminLoading = true
                state.adminSuccess = false
                state.adminError = false
            })
            .addCase(publishUnPublishPost.fulfilled, (state, action) => {
                state.adminLoading = false
                state.adminSuccess = true
                state.posts = state.posts.map(post => post._id === action.payload._id ? action.payload : post)
                state.adminError = false
            })
            .addCase(publishUnPublishPost.rejected, (state, action) => {
                state.adminLoading = false
                state.adminSuccess = false
                state.adminError = true
                state.adminErrorMessage = action.payload
            })
    }
});

export const { } = adminSlice.actions

export default adminSlice.reducer


// GET ALL USERS
export const getAllUsers = createAsyncThunk("FETCH/ADMIN/USERS", async (_, thunkAPI) => {

    let token = thunkAPI.getState().auth.user.token

    try {
        return await adminService.fetchAllUsers(token)
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }

})

// GET ALL POSTS
export const getAllPosts = createAsyncThunk("FETCH/ADMIN/POSTS", async (_, thunkAPI) => {

    let token = thunkAPI.getState().auth.user.token

    try {
        return await adminService.fetchAllPosts(token)
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }

})


// GET ALL REPORTS
export const getAllReports = createAsyncThunk("FETCH/ADMIN/REPORTS", async (_, thunkAPI) => {

    let token = thunkAPI.getState().auth.user.token

    try {
        return await adminService.fetchAllReports(token)
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }

})


// Ban/Unban User
export const banUnBanUser = createAsyncThunk("ADMIN/UPDATE/USER", async (uid, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token
    try {
        return await adminService.updateUser(uid, token)
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})


// Publish/UnPublish Post
export const publishUnPublishPost = createAsyncThunk("ADMIN/UPDATE/POST", async (pid, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token
    try {
        return await adminService.updatePost(pid, token)
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})