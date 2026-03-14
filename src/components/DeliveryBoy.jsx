import React from 'react'
import Navbar from './Navbar'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useEffect } from 'react'
import { serverUrl } from '../App'
import { useState } from 'react'
import DeliveryBoyTracking from './DeliveryBoyTracking'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'


const DeliveryBoy = () => {
  const { userData, socket } = useSelector(state => state.user)
  const [availableAssignment, setAvailableAssignment] = useState(null);
  const [currentOrder, setCurrentOrder] = useState();
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [otp, setOtp] = useState("")
  const [loading1, setLoading1] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [deliveryBoyLocation, setDeliveryBoyLocation] = useState(null)
  const [todaydelivery, setTodayDelivery] = useState([])
// const [loading,setLoading]=useState(false)
const [message,setMessage]=useState("")

  useEffect(() => {
    if (!socket || userData?.role !== "deliveryBoy") {
      return;
    }
    let watchId;
    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition((position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        setDeliveryBoyLocation({ lat: latitude, lon: longitude })
        socket.emit('updateLocation', {
          latitude, longitude, userId: userData?._id
        })
      },
        (error) => {
          console.log(error)
        },
        {
          enableHighAccuracy: true,
        }
      )
    }
    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId)
      }
    }
  }, [socket, userData])


  const handleTodayDeliveries=async ()=>{
    try{
 const result=await axios.get(`${serverUrl}/api/order/get-today-deliveries`,{withCredentials:true})
 console.log(result.data)
 setTodayDelivery(result.data)
    }catch(err){
console.log(err?.response?.data?.message)
    }
  }

  const getAssignments = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/order/get-assignments`, { withCredentials: true });
      setAvailableAssignment(res.data.formated);
      console.log(res.data.formated)
    } catch (err) {
      console.log(err.response);
    }
  }

  const acceptOrder = async (assignmentId) => {
    try {
      const res = await axios.get(`${serverUrl}/api/order/accept-order/${assignmentId}`, { withCredentials: true })
      console.log(res.data);
      setError("")

      await getCurrentOrder();
    } catch (err) {
      setError(err?.response?.data?.message);
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
    setLoading1(true);
    try {
      const res = await axios.post(`${serverUrl}/api/order/send-delivery-otp`, { orderId: currentOrder._id, shopOrderId: currentOrder?.shopOrder._id }, { withCredentials: true })
      console.log(res.data);
      setError("")

      setShowOtpBox(true);

    } catch (err) {
      setError(err?.response?.data?.message);
      console.log(err.response);
    } finally {
      setLoading1(false);
    }
  }
  const verifyOtp = async () => {
    setLoading2(true);
    try {
      const res = await axios.post(`${serverUrl}/api/order/verify-delivery-otp`, { orderId: currentOrder._id, shopOrderId: currentOrder.shopOrder._id, otp }, { withCredentials: true })
      console.log(res.data);
      setError("")
      // setCurrentOrder(res.data);
      navigate("/my-orders")
    } catch (err) {
      setError(err?.response?.data?.message);
      console.log(err.response);
    } finally {
      setLoading2(false)
    }
  }



  useEffect(() => {
    socket?.on("newAssignment", (data) => {
      if (String(data.sendTo) === String(userData._id)) {
        setAvailableAssignment(prev => [data.d, ...(prev || [])])
      }
    })
    return () => {
      socket?.off('newAssignment')
    }
  }, [socket, userData])

const ratePerDelivery=50
const todayEarning=todaydelivery.reduce((sum,d)=>sum+d.count*ratePerDelivery,0)

  useEffect(() => {
    getAssignments();
    getCurrentOrder();
    handleTodayDeliveries();
  }, [])
  return (

    <div className='w-screen min-h-screen flex flex-col gap-5 items-center bg-[#fff9f6]'>
      <Navbar />
      <div className='w-full max-w-[800px] flex flex-col gap-5 items-center'>
        <div className='bg-white rounded-2xl shadow-md p-5 flex  flex-col justify-start items-center w-[90%] border border-orange-100 text-center gap-2'>
          <h1 className='text-xl font-bold text-[#ff4d2d]'>  Welcome, {userData.fullName} </h1>
          <p className='text-[#ff4d2d]'> <span className='font-semibold'>Latitude: </span>{deliveryBoyLocation?.lat || userData.location.coordinates[1]}, <span className='font-semibold'>Longitude: </span> {deliveryBoyLocation?.lon || userData.location.coordinates[0]}</p>
        </div>


        <div className='bg-white rounded-2xl shadow-md p-5 w-[90%] mb-6 border border-orange-100'>
          <h1 className='text-lg font-bold mb-3'>Today Deliveries</h1>
          <ResponsiveContainer width="100%" height={200}>
              <BarChart data={todaydelivery}>
      <CartesianGrid strokeDasharray="3 3"/>
<XAxis dataKey="hour" tickFormatter={(h)=>`${h}:00`} />
<YAxis  allowDecimals={false  }/>
<Tooltip  formatter={(value)=>[value,"orders"]} labelFormatter={(label)=>`${label}:00`}/>
         <Bar dataKey="count" fill="#ff4d2d"/>
              </BarChart>
          </ResponsiveContainer>

<div className='max-w-sm mx-auto mt-6 p-6 bg-white rounded-2xl shadow-lg text-center'>
  <h1>Today's Earning</h1>
  <span className='text-3xl font-bold text-green-600'>₹
{todayEarning}</span>
   
</div>
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
            <DeliveryBoyTracking data={{
              deliveryBoyLocation: deliveryBoyLocation ||{
                  lat: userData.location.coordinates[1],
                  lon: userData.location.coordinates[0]
                },
              customerLocation: {
                lat: currentOrder.deliveryAddress.latitude,
                lon: currentOrder.deliveryAddress.longitude,
              }
            }} />
            {!showOtpBox ?
              <button
                onClick={handleSendOtp}
                className='mt-4 w-full bg-green-500 text-white font-semibold rounded-xl flex justify-center items-center gap-2 shadow-md hover:bg-green-600 active:scale-95 transition-all px-4 py-2 disabled:opacity-70'
                disabled={loading1}
              >
                {loading1 && <AiOutlineLoading3Quarters size={20} className='  animate-spin  ' />}
                {!loading1 ? " Mark as Delivered" : `Sending Otp to ${currentOrder.user.fullName}... `}

              </button> :
              <div className='mt-4 p-4 border rounded-xl bg-gray-100'>
                <p className='text-sm font-semibold mb-2'> Enter Otp send to <span className='text-orange-500'>{currentOrder.user.fullName}</span></p>
                <input type="text"
                  onChange={(e) => setOtp(e.target.value)}
                  value={otp}
                  className='w-full border px-3 py-2 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-orange-400'
                  placeholder='enter otp' />
                <button className=' w-full bg-orange-500 text-white font-semibold rounded-xl shadow-md hover:bg-orange-600 active:scale-95 transition-all px-4 py-2  flex items-center justify-center gap-2 disabled:opacity-70'
                  disabled={loading2}

                  onClick={verifyOtp}>
                  {loading2 && <AiOutlineLoading3Quarters size={20} className='  animate-spin' />}
                  {!loading2 ? "Submit Otp" : "Verifying.. "}</button>
              </div>
            }
            {error && (
              <div className="w-full bg-red-100 mt-3 border  text-center border-red-300 text-red-600 px-4 py-2 rounded-lg text-sm">
                {error}
              </div>
            )}
          </div>
        }


      </div>
    </div>
  )
}

export default DeliveryBoy
