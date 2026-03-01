import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: null,
        city: null,
        state: null,
        currAddress: null,
        shopInMyCity: [],
        itemInMyCity: [],
        cardItems: [],
        totalAmount:0,
    },
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload
        },
        setCity: (state, action) => {
            state.city = action.payload
        },
        setState: (state, action) => {
            state.state = action.payload
        },
        setCurrAddress: (state, action) => {
            state.currAddress = action.payload
        },
        setShopInMyCity: (state, action) => {
            state.shopInMyCity = action.payload
        },
        setItemInMyCity: (state, action) => {
            state.itemInMyCity = action.payload
        },
        addToCart: (state, action) => {
            // state.cardItems=action.payload
            const cardItem = action.payload
            const existing = state.cardItems.find(i => i.id == cardItem.id);
            if (existing) {
                existing.quantity += cardItem.quantity
            } else {
                state.cardItems.push(cardItem);
            }
            // console.log(state.cardItems);
            state.totalAmount=state.cardItems.reduce((sum,i)=>sum+=i.price*i.quantity,0)
        },
        updateQuantity:(state,action)=>{
            const {id,quantity}=action.payload
            const item=state.cardItems.find(i=>i.id==id)
            if(item){
                item.quantity=quantity
            }
                        state.totalAmount=state.cardItems.reduce((sum,i)=>sum+=i.price*i.quantity,0)

        },
         removeCartItem:(state,action)=>{
            const id=action.payload
            state.cardItems=state.cardItems.filter(i=>i.id!==id)
                        state.totalAmount=state.cardItems.reduce((sum,i)=>sum+=i.price*i.quantity,0)

        },


    }
})

export const { setUserData, setCity, setState, setCurrAddress, setShopInMyCity, setItemInMyCity, addToCart,updateQuantity,removeCartItem } = userSlice.actions
export default userSlice.reducer