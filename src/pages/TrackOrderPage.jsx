import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { serverUrl } from '../App';
import { IoIosArrowRoundBack } from 'react-icons/io';
import DeliveryBoyTracking from '../components/DeliveryBoyTracking';
import { useSelector } from 'react-redux';




const TrackOrderPage = () => {
    const {socket}=useSelector(state=>state.user)
    const { orderId } = useParams();
    const [currentOrder, setCurrentOrder] = useState(null);
    const [liveLoation,setLiveLocation]=useState({})
    const navigate = useNavigate();
    console.log(orderId);
    console.log(currentOrder);
    const handleGetOrder = async () => {
        try {
            const res = await axios.get(`${serverUrl}/api/order/get-order-by-id/${orderId}`, { withCredentials: true });
            setCurrentOrder(res.data.order);
            console.log(res.data);
        } catch (err) {
            console.log(err.response);
        }
    }

    useEffect(()=>{
          if(!socket) return;
  socket.on('updateDeliveryLocation',({deliveryBoyId,latitude,longitude})=>{
    setLiveLocation(prev=>({
        ...prev,
        [deliveryBoyId]:{lat:latitude,lon:longitude}
    }))
  })
    },[])

    useEffect(() => {
        handleGetOrder();
    }, [orderId])
    return (
        <div className='max-w-4xl mx-auto p-4 flex flex-col gap-6'>
            <div
                className="relative flex items-center gap-4 top-[20px] left-[20px] z-[10] mb-[10px]"
                onClick={() => navigate(-1)}
            >
                <IoIosArrowRoundBack
                    size={35}
                    className="text-[#ff4d2d] hover:text-orange-600"
                />
                <h1 className='text-2xl font-bold md:text-center'>Track Order</h1>
            </div>

            {currentOrder?.shopOrders?.map((shopOrder, index) => (
                <div className='bg-white p-4 rounded-2xl shadow-md border border-orange-100 space-y-4' key={index}>
                    <div>
                        <p className='text-lg font-bold mb-2 text-[#ff4d2d]'>{shopOrder?.shop.name}</p>
                        <p className='font-semibold'><span className='text-[#ff4d2d]'>Items:</span> {shopOrder?.shopOrderItems.map(i => i.name).join(",")}</p>
                        <p className='font-semibold'><span className='text-[#ff4d2d]'>SubTotal:</span> ₹{shopOrder.subtotal}</p>
                        <p className='mt-4'><span className='text-[#ff4d2d] font-semibold'>Delivery address:</span> {currentOrder.deliveryAddress.text}</p>
                    </div>
                    {
                        shopOrder.status != "delivered" ? <div>

                            {shopOrder.assignedDeliveryBoy ? <div className='text-sm text-gray-700'>
                                  <h3 className='text-[#ff4d2d] text-lg font-bold text-center mt-[10px] underline'> Assigned Delivery Boy</h3>
                                <p className='font-semibold'> <span className='text-[#ff4d2d]'>Delivery Boy Name : </span> {shopOrder?.assignedDeliveryBoy?.fullName}</p>
                                <p className='font-semibold'> <span className='text-[#ff4d2d]'>Delivery Boy Contact no.: </span>{shopOrder?.assignedDeliveryBoy?.mobileno}</p>
                            </div> :
                                <p>Delivery Boy is not assigned yet</p>
                            }
                        </div> : <div className='text-green-600 font-semibold text-lg'>Delivered</div>
                         

                    }
                    {shopOrder.assignedDeliveryBoy && shopOrder.status!=="delivered" &&
                    <div>

                    <DeliveryBoyTracking data={
                        {
                            deliveryBoyLocation:
                                liveLoation[shopOrder.assignedDeliveryBoy._id]||
                            {
                                lat:shopOrder.assignedDeliveryBoy.location.coordinates[1],
                                lon:shopOrder.assignedDeliveryBoy.location.coordinates[0]
                            },
                            customerLocation:{
                                lat:currentOrder.deliveryAddress.latitude,
                                lon:currentOrder.deliveryAddress.longitude,
                            }
                        }
                    }/>
                    </div>

                    }
                </div>

            ))}
        </div>
    )
}

export default TrackOrderPage
