
import  axios from "axios"
import { useDispatch, useSelector } from"react-redux"
import { setMyShopData } from "../redux/shopSlice";
import { useEffect } from "react";
import { setItemInMyCity, setShopInMyCity } from "../redux/userSlice";
import { serverUrl } from "../App";

 function UseGetItemByCity(){

    const dispatch=useDispatch();
    const {city}=useSelector(state=>state.user)


    useEffect(()=>{
      if (!city) return; // 👈 STOP if city is null

    const fetchItems=async()=>{
        try{
      const result=await axios.get(`${serverUrl}/api/item/get-item-by-city/${city}`,{withCredentials:true})
      dispatch(setItemInMyCity(result.data.items))
      console.log(result.data.items)
        }catch(err){
            console.log(err?.response?.data?.message);
        }
    }
    fetchItems();
    },[city])
 }

 export default UseGetItemByCity;