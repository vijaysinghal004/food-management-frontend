import React, { useEffect, useRef, useState } from 'react'
import { IoArrowBack } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { FaUtensils } from "react-icons/fa";
import { LuLoaderCircle } from "react-icons/lu";

// import { setCurrAddress } from '../redux/userSlice';
import axios from 'axios';
import { setMyShopData } from '../redux/shopSlice';

const EditItem = () => {
    const navigate = useNavigate();
    const { itemId } = useParams();
    const [currentItem, setCurrentItem] = useState(null);
    const { myShopData } = useSelector(state => state.owner)
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [frontendImage, setFrontendImage] = useState(null);
    const [backendImage, setBackendImage] = useState(null);
    const [category, setCategory] = useState("");
    const [foodType, setFoodType] = useState("");
    const [loading, setLoading] = useState(false)
    const categories = [
        "Snacks",
        "Main Course",
        "Desserts",
        "Pizza",
        "Burgers",
        "Sandwiches",
        "South Indian",
        "North Indian",
        "Chinese",
        "Fast Food",
        "Others"
    ]
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const file = e.target.files[0];
        setBackendImage(file);
        setFrontendImage(URL.createObjectURL(file));
    }
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        if (!name || !price || !category || !foodType) {
            alert("All fields are required");
            return;
        }
        try {
            const formData = new FormData()
            formData.append("name", name)
            formData.append("category", category)
            formData.append("price", price)
            formData.append("foodType", foodType)

            if (backendImage) {
                formData.append("image", backendImage)
            }
            const result = await axios.post(`http://localhost:8080/api/item/edit-item/${itemId}`, formData, { withCredentials: true })
            console.log(result.data.shop);
            dispatch(setMyShopData(result.data.shop));
            setLoading(false);
            navigate("/")

        } catch (err) {
            console.log(err?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        const handleGetItemById = async () => {
            try {
                const result = await axios.get(`http://localhost:8080/api/item/get-item-by-id/${itemId}`, { withCredentials: true });
                setCurrentItem(result.data.item)
                console.log(result.data);
            } catch (err) {
                console.log(err);
            }
        }
        handleGetItemById();
    }, [itemId])
    useEffect(() => {
        setName(currentItem?.name || "");
        setPrice(currentItem?.price || 0);
        setCategory(currentItem?.category || "");
        setFoodType(currentItem?.foodType || "");
        setFrontendImage(currentItem?.image || "");

    }, [currentItem])

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

                        Add Food                    </div>
                </div>
                <form action="" className='space-y-5' onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label
                            htmlFor="text"
                            className='block text-sm text-gray-700 font-medium mb-1'

                        >Food Name</label>
                        <input
                            id="text"
                            type="text"
                            placeholder="enter food name"
                            className='w-full border rounded-lg px-4 py-2 focus:outline-none  focus:ring-orange-600 focus:ring-2'
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="text" className='block text-sm text-gray-700 font-medium mb-1'>Food Image</label>
                        <input id="text" type="file" accept="image/*" className='w-full border rounded-lg px-4 py-2 focus:outline-none  focus:ring-orange-600 focus:ring-2'

                            onChange={handleChange}
                        />
                        {frontendImage &&
                            <div className='mt-4'>
                                <img src={frontendImage} alt="" className='w-full h-48 object-cover rounded-lg border' />
                            </div>
                        }
                    </div>
                    <div className='mb-3'>
                        <label
                            htmlFor="text"
                            className='block text-sm text-gray-700 font-medium mb-1'

                        >Food Price</label>
                        <input
                            id="text"
                            type="number"
                            placeholder="enter price"
                            className='w-full border rounded-lg px-4 py-2 focus:outline-none  focus:ring-orange-600 focus:ring-2'
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="category" className='block text-sm text-gray-700 font-medium mb-1'>Select Category</label>
                        <select
                            id="category"
                            type="text"
                            className='w-full border rounded-lg px-4 py-2 focus:outline-none  focus:ring-orange-600 focus:ring-2'
                            onChange={(e) => setCategory(e.target.value)}
                            value={category}
                        >
                            <option value="" className='block text-sm text-gray-700 font-medium mb-1'>Select Category</option>
                            {categories.map((cate, index) => (
                                <option value={cate} key={cate}>{cate}</option>
                            ))}
                        </select>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="foodType" className='block text-sm text-gray-700 font-medium mb-1'>Select Food Type</label>
                        <select
                            id="foodType"
                            type="text"
                            className='w-full border rounded-lg px-4 py-2 focus:outline-none  focus:ring-orange-600 focus:ring-2'
                            onChange={(e) => setFoodType(e.target.value)}
                            value={foodType}
                        >
                            <option value="">Select Food Type</option>
                            <option value="veg" >veg</option>
                            <option value="non veg">Non veg</option>
                        </select>
                    </div>
                    {/* <button className='w-full bg-[#ff4d2d] text-white  px-6 cursor-pointer py-3 rounded-lg   font-semibold shadow-md hover:bg-orange-600 hover:shadow-lg transition-all duration-200'>
                        {loading && <LuLoaderCircle size={20} className=' mt-1 center animate-spin flex justify-center items-center' />}
                        {!loading ? "Update Item" : "Updating... "}
                    </button> */}
                    <button
  type="submit"
  disabled={loading}
  className="w-full bg-[#ff4d2d] text-white px-6 py-3 rounded-lg font-semibold shadow-md 
  hover:bg-orange-600 hover:shadow-lg transition-all duration-200 
  flex items-center justify-center gap-2 disabled:opacity-80 disabled:cursor-not-allowed"
>
  {loading && (
    <LuLoaderCircle className="animate-spin" size={20} />
  )}
  {loading ? "Updating..." : "Update Item"}
</button>
                </form>
            </div>
        </div>
    )
}

export default EditItem
