
import  axios from "axios"
import { useDispatch, useSelector } from"react-redux"
import { setMyShopData } from "../redux/shopSlice";
import { useEffect } from "react";

 function useGetMyShop(){
    const dispatch=useDispatch();
    const {userData}=useSelector(state=>state.user)
    useEffect(()=>{
    const fetchShop=async()=>{
        try{
      const result=await axios.get("http://localhost:8080/api/shop/get-myShop",{withCredentials:true})
      console.log(result);
      dispatch(setMyShopData(result.data.shop))
        }catch(err){
            console.log(err?.response?.data?.message);
        }
    }
    fetchShop();
    },[])
 }

 export default useGetMyShop;