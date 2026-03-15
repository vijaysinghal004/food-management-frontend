import React, { useRef, useState } from 'react'
import { IoArrowBack } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaUtensils } from "react-icons/fa";
// import { setCurrAddress } from '../redux/userSlice';
import axios from 'axios';
import { setMyShopData } from '../redux/shopSlice';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { serverUrl } from '../App';


const CreateEditShop = () => {
    const navigate = useNavigate();
    const { myShopData } = useSelector(state => state.owner)
    const { state, city, currAddress } = useSelector(state => state.user)

    const [name, setName] = useState(myShopData?.name || "");
    const [stateinp, setStateinp] = useState(myShopData?.state || state);
    const [cityinp, setCityinp] = useState(myShopData?.city || city);
    const [frontendImage, setFrontendImage] = useState(myShopData?.image || null);
    const [backendImage, setBackendImage] = useState(null);
    const [location, setLocation] = useState(myShopData?.location || currAddress || "");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const file = e.target.files[0];
        setBackendImage(file);
        setFrontendImage(URL.createObjectURL(file));
    }
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const formData = new FormData()
            formData.append("name", name)
            formData.append("city", cityinp)
            formData.append("state", stateinp)
            formData.append("address", location)
            if (backendImage) {
                formData.append("image", backendImage)
            }
            const result = await axios.post(`${serverUrl}/api/shop/create-edit`, formData, { withCredentials: true })
            console.log(result.data);
            dispatch(setMyShopData(result.data.shop));
            setLoading(false);
            navigate("/")

        } catch (err) {
            console.log(err?.response?.data?.message);
        }
        finally {
            setLoading(false);
        }
    }
    return (
        <div className='flex items-center justify-center flex-col p-6 bg-gradient-to-br from-orange-50 relative to-white min-h-screen'>
            <div className='absolute top-[20px]  left-[20px] z-[10] mb-[10px] ' onClick={() => navigate(-1)}>
                <IoArrowBack size={35} className='text-[#ff4d2d] ' />
            </div>
            <div className='max-w-lg w-full bg-white shadow-xl rounded-2xl p-8 border border-orange-100 '>
                <div className='flex flex-col items-center mb-6'>
                    <div className='bg-orange-100 p-4 rounded-full mb-4'>
                        <FaUtensils className='text-[#ff4d2d] w-16 h-16' />
                    </div>
                    <div className='text-2xl font-extrabold text-gray-900'>
                        {myShopData ? "Edit Shop" : "Add Shop"}
                    </div>
                </div>
                <form action="" className='space-y-5' onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label
                            htmlFor="text"
                            className='block text-sm text-gray-700 font-medium mb-1'

                        >Shop Name</label>
                        <input
                            id="text"
                            type="text"
                            placeholder="enter shop name"
                            className='w-full border rounded-lg px-4 py-2 focus:outline-none  focus:ring-orange-600 focus:ring-2'
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="text" className='block text-sm text-gray-700 font-medium mb-1'>Shop Image</label>
                        <input id="text" type="file" accept="image/*" className='w-full border rounded-lg px-4 py-2 focus:outline-none  focus:ring-orange-600 focus:ring-2'

                            onChange={handleChange}
                        />
                        {frontendImage &&
                            <div className='mt-4'>
                                <img src={frontendImage} alt="" className='w-full h-48 object-cover rounded-lg border' />
                            </div>
                        }
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-3'>
                        <div >
                            <label htmlFor="city" className='block text-sm text-gray-700 font-medium mb-1'>Shop City</label>
                            <input id="city" type="text" placeholder='enter shop city' className='w-full border rounded-lg px-4 py-2 focus:outline-none  focus:ring-orange-600 focus:ring-2'
                                onChange={(e) => setCityinp(e.target.value)}
                                value={cityinp}
                            />
                        </div>
                        <div >
                            <label htmlFor="state" className='block text-sm text-gray-700 font-medium mb-1'>Shop State</label>
                            <input id="state" type="text" placeholder='enter shop state' className='w-full border rounded-lg px-4 py-2 focus:outline-none  focus:ring-orange-600 focus:ring-2'
                                onChange={(e) => setStateinp(e.target.value)}
                                value={stateinp}
                            />
                        </div>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="text"
                            className='block text-sm text-gray-700 font-medium mb-1'
                        >
                            Shop Address
                        </label>
                        <input id="text" type="text" placeholder="enter shop address" className='w-full border rounded-lg px-4 py-2 focus:outline-none  focus:ring-orange-600 focus:ring-2'
                            onChange={(e) => setLocation(e.target.value)}
                            value={location}
                        />
                    </div>
                    <button
                        disabled={loading}
                        className='w-full bg-[#ff4d2d] text-white  px-6 cursor-pointer py-3 rounded-lg   font-semibold shadow-md hover:bg-orange-600 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-75'>
                        {
                            loading && <AiOutlineLoading3Quarters className='animate-spin' />
                        }
                        {loading
                            ? (myShopData ? "Updating..." : "Creating...")
                            : (myShopData ? "Update Shop" : "Create Shop")}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateEditShop
