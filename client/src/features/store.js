import { configureStore } from '@reduxjs/toolkit'
import auth from "./auth/authSlice"
import profile from "./profile/profileSlice"
import post from "./post/postSlice"
import admin from "./admin/adminSlice"

export const store = configureStore({
    reducer: { auth, profile, post, admin },
})