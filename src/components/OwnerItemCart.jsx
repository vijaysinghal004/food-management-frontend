
import axios from 'axios';
import React from 'react';
import { FaTrashAlt } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setMyShopData } from '../redux/shopSlice';




function OwnerItemCard({ data }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleDelete = async () => {
        try {
            const result = await axios.get(`http://localhost:8080/api/item/delete/${data._id}`, { withCredentials: true });
            console.log(result.data)
            dispatch(setMyShopData(result.data.shop))
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="flex bg-white rounded-lg shadow-md overflow-hidden border border-[#ff4d2d] w-full max-w-2xl">

            <div className="w-36  flex-shrink-0 bg-gray-50">
            {/* <div className="w-full sm:w-40 h-48 sm:h-auto flex-shrink-0 bg-gray-50"> */}
                <img
                    src={data.image}
                    alt=""
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="flex flex-col justify-between p-4 flex-1">
                <div>
                    <h2 className="text-base font-semibold text-[#ff4d2d]">
                        {data.name}
                    </h2>

                    <p >
                        <span className='font-medium text-gray-700'>Category:</span>  {data.category}
                    </p>
                    <p>
                        <span className='font-medium text-gray-700'>Food Type:</span> {data.foodType}
                    </p>
                </div>
                <div className='flex items-center justify-between'>
                    <div >
                        <span className='text-[#ff4d2d] font bold'>Price:</span> {data.price}<span>&#8377;</span>
                    </div>
                    <div className='flex  items-center gap-2'>
                        <div className='p-2  rounded-full cursor-pointer  hover:bg-[#ff4d2d]/10 text-[#ff4d2d]' onClick={() => navigate(`/edit-item/${data._id}`)}>
                            <FaPen size={16} />
                        </div>
                        <div className='p-2  rounded-full cursor-pointer hover:bg-[#ff4d2d]/10 text-[#ff4d2d]' onClick={handleDelete}>
                            <FaTrashAlt size={16} />

                        </div>
                    </div>


                </div>
            </div>

        </div>
    );
}

export default OwnerItemCard;
