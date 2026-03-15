
import  axios from "axios"
import { useDispatch, useSelector } from"react-redux"
import { setMyShopData } from "../redux/shopSlice";
import { useEffect } from "react";
import { serverUrl } from "../App";

 function useGetMyShop(){
    const dispatch=useDispatch();
    const {userData}=useSelector(state=>state.user)

    useEffect(()=>{
            if (!userData) return;
             if (userData.role !== "owner") return;
    const fetchShop=async()=>{
        try{
      const result=await axios.get(`${serverUrl}/api/shop/get-myShop`,{withCredentials:true})
      console.log(result);

      dispatch(setMyShopData(result.data.shop))
        }catch(err){
            console.log(err?.response?.data?.message);
        }
    }
    fetchShop();
    },[userData])
 }

 export default useGetMyShop;