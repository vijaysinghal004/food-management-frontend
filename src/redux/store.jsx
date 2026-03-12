import { configureStore } from "@reduxjs/toolkit";
import userSlice from './userSlice'
import ownerSlice from './shopSlice.jsx'
import mapSlice from './mapSlice.jsx'

export const store=configureStore({
    reducer:{
        user:userSlice,
        owner:ownerSlice,
        map:mapSlice
    },
    //  middleware:(getDefaultMiddleware)=>
    // getDefaultMiddleware({
    //   serializableCheck:false
    // })
})