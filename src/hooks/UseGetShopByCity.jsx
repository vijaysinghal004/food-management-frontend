
import  axios from "axios"
import { useDispatch, useSelector } from"react-redux"
import { setMyShopData } from "../redux/shopSlice";
import { useEffect } from "react";
import { setShopInMyCity } from "../redux/userSlice";

 function UseGetShopByCity(){

    const dispatch=useDispatch();
    const {city}=useSelector(state=>state.user)


    useEffect(()=>{
      if (!city) return; // 👈 STOP if city is null

    const fetchShops=async()=>{
        try{
      const result=await axios.get(`http://localhost:8080/api/shop/get-by-city/${city}`,{withCredentials:true})
      console.log(result);
      dispatch(setShopInMyCity(result.data.shops))
      console.log(result.data)
        }catch(err){
            console.log(err?.response?.data?.message);
        }
    }
    fetchShops();
    },[city])
 }

 export default UseGetShopByCity;