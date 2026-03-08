import axios from 'axios';
import React from 'react'
import { FaPhoneAlt } from "react-icons/fa";
import { serverUrl } from '../App';
import { useDispatch } from 'react-redux';
import { UpdateOrderStatus } from '../redux/userSlice';
import { useState } from 'react';

const OwnerOrderCard = ({ data }) => {
  const [availableBoys, setAvailableBoys] = useState([]);
  const dispatch = useDispatch();
  console.log(data);
  const formateDate = (dateString) => {
    const date = new Date(dateString);
    // console.log(date);
    return date.toLocaleString('en-GB', {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    })
  }
  // console.log(data);
  const handleUpdateStatus = async (orderId, shopId, status) => {
    try {
      const result = await axios.post(`${serverUrl}/api/order/update-status/${orderId}/${shopId}`, { status }, { withCredentials: true });
      console.log(result.data);
      dispatch(UpdateOrderStatus({
        orderId,
        shopId,
        status
      }))
      setAvailableBoys(result.data.availableBoys)
      console.log("hello");
      console.log(result?.data);
    } catch (err) {
      console.log(err.response);
    }
  }
  return (
    <div className='bg-white rounded-lg shadow p-4 space-y-4'>
      <div className="flex justify-between border-b pb-2">
        <p className='font-semibold'>order #{data._id.slice(-6)}</p>
        <p className='text-sm text-gray-500'>Date: {formateDate(data.createdAt)}</p>
      </div>
      <div>
        <h2 className='text-lg font-semibold text-gray-800'>{data.user.fullName}</h2>
        <p className='text-sm text-gray-600'>{data.user.email}</p>
        <p className='text-sm text-gray-600 flex items-center gap-2 mt-1'><FaPhoneAlt /> <span>{data.user.mobileno}
   
        </span>
        </p>
               {data.paymentMethod=="online"? <p className='text-gray-600 gap-2 text-sm'>payment:{data.payment?"true":"false"}</p>:
          <p className='text-gray-600 gap-2 text-sm'>Payment Method : {data.paymentMethod}</p>
  }
      </div>
      <div className='flex items-start gap-2 text-gray-600 text-sm flex-col'>
        <p>{data.deliveryAddress.text}</p>
        <p className='text-sm text-gray-500'>lat: {data.deliveryAddress.latitude} , lon: {data.deliveryAddress.longitude}</p>
      </div>

      <div className='flex space-x-4 overflow-x-auto pb-2'>
        {data?.shopOrders[0].shopOrderItems.map((item, index) => (
          <div key={index} className='flex-shrink-0 w-40 border rounded-lg p-2 bg-white'>
            <img src={item.item.image} alt="" className="w-full h-24 object-cover rounded" />
            <p className='text-sm font-semibold mt-1'>{item.name}</p>
            <p className='text-xs text-gray-500'>Qty: {item.quantity} x ₹{item.price}  </p>
          </div>
        ))}
      </div>

      <div className='flex justify-between items-center mt-auto pt-3 border-t border-gray-200'>
        <span className='text-sm'> status:  <span className='font-semibold capitalize text-[#ff4d2d]'> {data.shopOrders[0].status}</span></span>
        <select
          value={data.shopOrders[0].status}
          className='rounded-md border px-3 py-1 text-sm 1 border-[#ff4d2d] text-[#ff4d2d]'
          onChange={(e) => handleUpdateStatus(data._id, data.shopOrders[0].shop._id, e.target.value)}>
          <option value="">Select</option>
          <option value="pending">Pending</option>
          <option value="preparing">Preparing</option>
          <option value="out of delivery">Out Of delivery</option>
        </select>
      </div>
      {data.shopOrders[0].status === "out of delivery" &&
        <div className='mt-3 p-2 border rounded-lg text-sm bg-orange-50'>
          {  data.shopOrders[0].assignedDeliveryBoy ?
           <p>Assigned Delivery Boys:</p>:
            <p>Available Delivery Boys:</p>
        }
          
         
          {availableBoys && availableBoys.length > 0 ? (
            availableBoys.map((b, index) => (
              <div className='text-gray-300'>
                {b.fullName}-{b.mobileno}
              </div>
            ))
          ) :
            data.shopOrders[0].assignedDeliveryBoy ?
              <div>
                {data?.shopOrders[0]?.assignedDeliveryBoy?.fullName}-{data?.shopOrders[0]?.assignedDeliveryBoy?.mobileno}
                </div> :
              (
                <div>Waiting for delivery boy to accept</div>
              )}
        </div>}
      <div className='text-right font-bold text-gray-800 text-sm'>
        Total: ₹{data.shopOrders[0].subtotal}
      </div>

    </div>

  )
}

export default OwnerOrderCard
