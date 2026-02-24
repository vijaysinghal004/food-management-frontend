import axios from "axios";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux"
import { setCity, setCurrAddress, setState } from "../redux/userSlice";

function UseGetCity(){
    const dispath=useDispatch();
    const {userData}=useSelector(state=>state.user)
    useEffect(()=>{
    navigator.geolocation.getCurrentPosition(async (position)=>{
        console.log(position);
        const latitude=position.coords.latitude;
        const longitude=position.coords.longitude;
        const result=await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${import.meta.env.VITE_GEOAPIFY}`)
        const city=result?.data?.results[0]?.city;
        // const currAddress=result?.data?.results[0]?.housenumber;
        const currAddress=result?.data?.results[0]?.address_line2 || result?.data?.results[0]?.housenumber || "";
        const state=result?.data?.results[0]?.state;
        console.log(city);
        dispath(setCity(city));
        dispath(setState(state));
        dispath(setCurrAddress(currAddress));
    })
    },[userData])
}

export default UseGetCity; 