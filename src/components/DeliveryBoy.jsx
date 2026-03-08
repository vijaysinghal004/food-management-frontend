import React from 'react'
import Navbar from './Navbar'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useEffect } from 'react'
import { serverUrl } from '../App'
import { useState } from 'react'
import DeliveryBoyTracking from './DeliveryBoyTracking'

const DeliveryBoy = () => {
  const { userData } = useSelector(state => state.user)
  const [availableAssignment, setAvailableAssignment] = useState(null);
  const [currentOrder, setCurrentOrder] = useState();
const [showOtpBox,setShowOtpBox]=useState(false);
const [otp,setOtp]=useState("")

  const getAssignments = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/order/get-assignments`, { withCredentials: true });
      setAvailableAssignment(res.data.formated);
      console.log(res.data.formated)
    } catch (err) {
      console.log(err);
      console.log(err.response);
    }
  }

  const acceptOrder = async (assignmentId) => {
    try {
      const res = await axios.get(`${serverUrl}/api/order/accept-order/${assignmentId}`, { withCredentials: true })
      console.log(res.data);
      await getCurrentOrder();
    } catch (err) {
      console.log(err.response);
    }
  }



  const getCurrentOrder = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/order/get-current-order`, { withCredentials: true })
      console.log(res.data);
      setCurrentOrder(res.data);
    } catch (err) {
      console.log(err.response);
    }
  }

 const handleSendOtp = async () => {

    try {
      const res = await axios.post(`${serverUrl}/api/order/send-delivery-otp`, {orderId:currentOrder._id,shopOrderId:currentOrder?.shopOrder._id}, { withCredentials: true })
      console.log(res.data);
   setShowOtpBox(true);

    } catch (err) {
      console.log(err.response);
    }
  }
   const verifyOtp = async () => {
    try {
      const res = await axios.post(`${serverUrl}/api/order/verify-delivery-otp`, {orderId:currentOrder._id,shopOrderId:currentOrder.shopOrder._id,otp}, { withCredentials: true })
      console.log(res.data);
      // setCurrentOrder(res.data);
    } catch (err) {
      console.log(err.response);
    }
  }

  useEffect(() => {
    getAssignments();
    getCurrentOrder();
  }, [])
  return (

    <div className='w-screen min-h-screen flex flex-col gap-5 items-center bg-[#fff9f6]'>
      <Navbar />
      <div className='w-full max-w-[800px] flex flex-col gap-5 items-center'>
        <div className='bg-white rounded-2xl shadow-md p-5 flex  flex-col justify-start items-center w-[90%] border border-orange-100 text-center gap-2'>
          <h1 className='text-xl font-bold text-[#ff4d2d]'>  Welcome, {userData.fullName} </h1>
          <p className='text-[#ff4d2d]'> <span className='font-semibold'>Latitude: </span>{userData.location.coordinates[1]}, <span className='font-semibold'>Longitude: </span> {userData.location.coordinates[0]}</p>
        </div>
        {!currentOrder &&
          <div className='bg-white rounded-2xl p-5 shadow-md w-[90%] border border-orange-100'>
            <h1 className='text-lg font-bold mb-4 flex items-center gap-'>Available Orders</h1>
            <div className='space-y-4'>
              {availableAssignment?.length > 0 ? (
                availableAssignment.map((a, index) => (
                  <div className='border rounded-lg p-4 flex justify-between items-center' key={index}>
                    <div>

                      <p className='text-sm font-semibold'>{a?.shopName}</p>
                      <p className='text-sm text-gray-500'>  <span className='font-semibold'>Delivery Address:</span> {a?.deliveryAddress?.text}</p>
                      <p className='text-xs text-gray-400'>{a.items.length} items | ₹{a.subTotal}</p>
                    </div>
                    <button className='bg-orange-500 text-white px-4 py-1 text-sm border rounded-lg hover:bg-orange-600'

                      onClick={() => acceptOrder(a.assignmentId)}
                    >Accept</button>

                  </div>
                ))) :
                (
                  <p className='text-gray-400 text-sm'>No Available Orders</p>
                )
              }
            </div>
          </div>
        }
        {currentOrder &&

          <div className='bg-white rounded-2xl shadow-md p-5 w-[90%] border border-orange-100'>
            <h2 className='text-lg font-bold mb-3'>Current Order</h2>
            <div className='border rounded-lg p-4 mb-3'>
              <p className='text-sm font-semibold'>{currentOrder?.shopOrder.shop.name}</p>
              <p className='text-xs text-gray-500'>{currentOrder?.deliveryAddress.text}</p>
              <p className='text-xs text-gray-400'>{currentOrder?.shopOrder?.shopOrderItems.length} items | ₹{currentOrder?.shopOrder.subtotal}</p>
            </div>
            <DeliveryBoyTracking data={currentOrder}/>
            {!showOtpBox ?
            <button 
            onClick={handleSendOtp}
            className='mt-4 w-full bg-green-500 text-white font-semibold rounded-xl shadow-md hover:bg-green-600 active:scale-95 transition-all px-4 py-2'>Mark as Delivered</button>:
            <div className='mt-4 p-4 border rounded-xl bg-gray-100'>
              <p className='text-sm font-semibold mb-2'> Enter Otp send to <span className='text-orange-500'>{currentOrder.user.fullName}</span></p>
           <input type="text"
           onChange={(e)=>setOtp(e.target.value)}
           value={otp}
            className='w-full border px-3 py-2 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-orange-400' 
            placeholder='enter otp'/>
           <button className=' w-full bg-orange-500 text-white font-semibold rounded-xl shadow-md hover:bg-orange-600 active:scale-95 transition-all px-4 py-2' onClick={verifyOtp}>Submit Otp</button>
            </div>
            }
          </div>
        }

      </div>
    </div>
  )
}

export default DeliveryBoy
