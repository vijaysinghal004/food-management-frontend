import React from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import UserOrderCad from '../components/UserOrderCad';
import OwnerOrderCard from '../components/OwnerOrderCard';

const MyOrders = () => {
  const { userData, myOrders } = useSelector(state => state.user);
  const navigate = useNavigate();

  return (
    <div className='w-full min-h-screen bg-[#fff9f6] flex justify-center  px-
    '>
      <div className="w-full max-w-[800px]">
        <div className="flex items-center gap-[20px] mb-6">

          {/* Back Button */}
          <div
            className="z-[10] cursor-pointer"
            onClick={() => navigate("/")}
          >
            <IoIosArrowRoundBack
              size={35}
              className="text-[#ff4d2d]"
            />
          </div>
          <h1 className="text-2xl font-semibold">My Orders</h1>
        </div>
        <div className='space-y-6'>
          {myOrders.map((order,index)=>(
            userData.role=='user'?(<UserOrderCad data={order} key={index}/>):userData.role=='owner'?(<OwnerOrderCard data={order} key={index}/>):null
          ))}
        </div>
      </div>
    </div>
  )
}

export default MyOrders
