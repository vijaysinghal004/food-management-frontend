import { configureStore } from "@reduxjs/toolkit";
import userSlice from './userSlice'
import ownerSlice from './shopSlice.jsx'

export const store=configureStore({
    reducer:{
        user:userSlice,
        owner:ownerSlice
    }
})