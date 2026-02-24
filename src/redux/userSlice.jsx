import { createSlice } from "@reduxjs/toolkit"

const userSlice=createSlice({
    name:"user",
    initialState:{
        userData:null,
        city:null,
        state:null,
        currAddress:null
    },
    reducers:{
        setUserData:(state,action)=>{
        state.userData=action.payload
        },
        setCity:(state,action)=>{
            state.city=action.payload
        },
         setState:(state,action)=>{
            state.state=action.payload
        },
        setCurrAddress:(state,action)=>{
            state.currAddress=action.payload
        }
    }
})

export const {setUserData , setCity, setState, setCurrAddress}=userSlice.actions
export default userSlice.reducer