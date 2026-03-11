import React from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import UserOrderCad from '../components/UserOrderCad';
import OwnerOrderCard from '../components/OwnerOrderCard';
import { useEffect } from 'react';
import { addMyOrder, setMyOrders, updateRealTimeOrderStatus } from '../redux/userSlice';
import { TbShoppingBagDiscount } from 'react-icons/tb';


const MyOrders = () => {
  const { userData, myOrders,socket } = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch=useDispatch();

  useEffect(()=>{
socket?.on('newOrder',(data)=>{
  console.log("someone add order")
  if(data?.shopOrders[0]?.owner?._id==userData._id){
    console.log(data)
dispatch(setMyOrders([data,...myOrders]))  
}
})
socket?.on("update-status",({orderId,shopId,status,userId})=>{
  if(userId==userData._id){
    dispatch(updateRealTimeOrderStatus({orderId,shopId,status}))
  }
})  
return ()=>{
  socket?.off('newOrder')
  socket?.off('update-status')
}
  },[socket,userData])
// useEffect(()=>{
//   socket?.on('newOrder',(data)=>{
//     console.log("New order received",data)

//     if(data?.shopOrders?.owner?._id === userData._id){
//        dispatch(addMyOrder(data))
//     }
//   })

//   return ()=>{
//     socket?.off('newOrder')
//   }
// },[socket,userData])

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
