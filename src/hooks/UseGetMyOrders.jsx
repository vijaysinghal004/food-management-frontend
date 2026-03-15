
import  axios from "axios"
import { useDispatch, useSelector } from"react-redux"
import { setMyShopData } from "../redux/shopSlice";
import { useEffect } from "react";
import { setItemInMyCity, setMyOrders, setShopInMyCity } from "../redux/userSlice";
import { serverUrl } from "../App";

 function UseGetMyOrders(){

    const dispatch=useDispatch();
    const {userData}=useSelector(state=>state.user)


    useEffect(()=>{
      if (!userData) return; 

    const fetchOrders=async()=>{
        try{
      const result=await axios.get(`${serverUrl}/api/order/my-orders`,{withCredentials:true})
      dispatch(setMyOrders(result.data.orders))
      console.log(result.data.orders)
        }catch(err){
            console.log(err?.response?.data?.message);
        }
    }
    fetchOrders();
    },[userData])
 }

 export default UseGetMyOrders;