import axios from "axios";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux"
import { setCity, setCurrAddress, setState } from "../redux/userSlice";
import { setAddress, setLocation } from "../redux/mapSlice";
import { serverUrl } from "../App";

function UseUpdateUserLocation() {
    // const dispath = useDispatch();
    const { userData } = useSelector(state => state.user)
    useEffect(() => {
        const updateLocation = async (lat, lon) => {
            try{
      const result = await axios.post(`${serverUrl}/api/user/update-location`, {
                lat, lon
            }, { withCredentials: true })
            console.log(result.data);
            }catch(err){
       console.log(err.response)
            }
      
        }
        navigator.geolocation.watchPosition(async (position) => {
            console.log(position);
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            updateLocation(Number(latitude),Number(longitude));
        })
    }, [userData])
}

export default UseUpdateUserLocation; 