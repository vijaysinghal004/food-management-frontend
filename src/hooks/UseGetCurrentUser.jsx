import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";


function useGetCurrentUser() {
    const dispatch=useDispatch();
    useEffect(() => {
        const fetchuser = async () => {
            try {
                const result = await axios.get("http://localhost:8080/api/user/current", { withCredentials: true });
                console.log(result);
                dispatch(setUserData(result.data.user))
            } catch (err) {
                console.log(err);
            }
        }
        fetchuser();
    }, [])
}

export default useGetCurrentUser