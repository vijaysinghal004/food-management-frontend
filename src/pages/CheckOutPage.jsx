import React from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { FaLocationDot } from "react-icons/fa6";
import { IoSearchOutline } from 'react-icons/io5';
import { TbCurrentLocation } from "react-icons/tb";
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import "leaflet/dist/leaflet.css"
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAddress, setLocation } from '../redux/mapSlice';
import axios from 'axios';
import { MdDeliveryDining } from "react-icons/md";
import { FaMobileAlt } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa";
import { serverUrl } from '../App';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { addMyOrder } from '../redux/userSlice';





function RecenterMap({ location }) {
    if (location.lat && location.lon) {
        const map = useMap();
        map.setView([location.lat, location.lon], 16, { animate: true })

    }
}

const CheckOutPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { location, address } = useSelector(state => state.map)
    const { cardItems, totalAmount } = useSelector(state => state.user)
    const [searchLocation, setSearchLocation] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("cod");
    const deliveryFee = totalAmount > 500 ? 0 : 40;
    const AmountWithDeliveryFee = totalAmount + deliveryFee;
    const ondragend = (e) => {
        console.log(e.target._latlng);
        const loc = e.target._latlng;
        dispatch(setLocation({ lat: loc.lat, lon: loc.lng }))
        getAddressByLatLng(loc.lat, loc.lng);
    }

    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setSearchLocation(address);
    }, [address])

    const getAddressByLatLng = async (latitude, longitude) => {
        try {
            const result = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${import.meta.env.VITE_GEOAPIFY}`)
            const currAddress = result?.data?.results[0]?.address_line2 || result?.data?.results[0]?.housenumber || "";
            console.log(currAddress);
            dispatch(setAddress(currAddress));

        } catch (err) {
            console.log(err);
        }
    }

    const getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            console.log(position);
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            dispatch(setLocation({ lat: latitude, lon: longitude }))
            getAddressByLatLng(latitude, longitude);
        })
    }
    const getLatLngByAddress = async () => {
        try {
            const result = await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(searchLocation)}&format=json&apiKey=${import.meta.env.VITE_GEOAPIFY}`)
            console.log(result.data.results[0].lat);
            console.log(result.data.results[0].lon);
            const location = result.data.results[0];
            // setAddress(searchLocation)
            dispatch(setLocation({ lat: location.lat, lon: location.lon }));
            dispatch(setAddress(searchLocation));
        } catch (err) {
            console.log(err.message);
        }
    }





    const handlePlaceOrder = async () => {
        setLoading(true);
        try {
            const result = await axios.post(`${serverUrl}/api/order/place-order`, {
                paymentMethod,
                deliveryAddress: {
                    text: address,
                    latitude: location.lat,
                    longitude: location.lon
                },
                totalAmount,
                cardItems,

            }, { withCredentials: true })
            console.log(result.data);
            if (paymentMethod == "cod") {
                dispatch(addMyOrder(result.data.newOrder))
                navigate("/order-placed");
            } else {
                const orderId = result.data.orderId
                const razorOrder = result.data.razorOrder
                openRazorPayWindow(orderId, razorOrder)
            }

        } catch (err) {
            console.log(err.response.data.message);
        } finally {
            setLoading(false)
        }
    }

    const openRazorPayWindow = async (orderId, razorOrder) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_ID_KEY, // Replace with your Razorpay key_id
            amount: razorOrder.amount, // Amount is in currency subunits.
            currency: 'INR',
            name: 'vingo',
            description: 'food delivery website',
            order_id: razorOrder.id, // This is the order_id created in the backend
            handler: async (response) => {
                try {
                    const result = await axios.post(`${serverUrl}/api/order/verify-payment`, {
                        razorpay_payment_id: response.razorpay_payment_id,
                        orderId
                    }, { withCredentials: true })
                    dispatch(addMyOrder(result.data.order))
                    navigate("/order-placed");
                } catch (err) {
                    console.log(err.response)
                }
            },
            // callback_url: 'http://localhost:8080/payment/verifyPayment', // Your success URL
            prefill: {
                name: 'Vijay',
                email: 'vijay@example.com',
                contact: '9999999999'
            },
            theme: {
                color: '#F37254'
            },

        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    }

    return (
        <div className="min-h-screen bg-[#fff9f6] flex items-center justify-center p-6">
            <div
                className="absolute top-[20px] left-[20px] z-[10] cursor-pointer"
                onClick={() => navigate("/")}
            >
                <IoIosArrowRoundBack
                    size={35}
                    className="text-[#ff4d2d]"
                />
            </div>
            <div className='w-full max-w-[900px] bg-white rounded-2xl shadow-xl p-6 space-y-6'>
                <h1 className='text-2xl font-bold text-gray-800'>CheckOut</h1>
                <section>
                    <h2 className='text-lg font-semibold mb-2 flex items-center justify-start gap-2 text-gray-800'>
                        <FaLocationDot size={16} className='text-[#ff4d2d]' />
                        Delivery Location
                    </h2>
                    <div className='flex gap-2 mb-3'>
                        <input
                            type="text"
                            value={searchLocation}
                            onChange={(e) => setSearchLocation(e.target.value)}
                            className='flex-1 border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff4d2d] '
                            placeholder='Enter Your Delivery Address...' />
                        <button className='bg-[#ff4d2d] hover:bg-red-600 text-white px-3 py-2 rounded-lg flex  items-center justify-center' onClick={getLatLngByAddress}><IoSearchOutline size={18} />
                        </button >
                        <button className='bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg flex  items-center justify-center' onClick={getCurrentLocation}><TbCurrentLocation size={18} />
                        </button>
                    </div>
                    <div className='border rounded-xl overflow-hidden'>
                        <div className='w-full h-64 flex items-center justify-center bg-red-100'>
                            <MapContainer
                                className='h-full w-full'
                                center={[location?.lat, location?.lon]}
                                zoom={16}
                            >
                                <RecenterMap location={location} />
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={[location?.lat, location?.lon]} draggable eventHandlers={{ dragend: ondragend }}>
                                    <Popup>
                                        A pretty CSS3 popup. <br /> Easily customizable.
                                    </Popup>
                                </Marker>
                            </MapContainer>
                        </div>
                    </div>
                </section>
                <section>
                    <h2 className='text-lg font-semibold mb-3 text-gray-800'>Payment Method</h2>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        <div
                            onClick={() => setPaymentMethod("cod")}
                            className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${paymentMethod === 'cod' ? "border-[#ff4d2d] bg-orange-50 shadow" : "border-gray-200 hover:border-gray-300"}`}>
                            <span className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-100'>
                                <MdDeliveryDining className='text-green-600 text-xl' />
                            </span>
                            <div >
                                <p className='font-medium text-gray-900'>Cash On Delivery</p>
                                <p className='text-xs text-gray-500'>Pay When Food Arrives</p>
                            </div>
                        </div>
                        <div
                            onClick={() => setPaymentMethod("online")}

                            className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${paymentMethod === "online" ? "border-[#ff4d2d] bg-orange-50 shadow" : "border-gray-200 hover:border-gray-300"}`}>
                            <span className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-purple-100'><FaMobileAlt className='text-purple-700 text-lg' /></span>

                            <span className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-100'><FaCreditCard className='text-blue-700 text-lg' /></span>
                            <div >
                                <p className='font-medium text-gray-900'>UPI / Credit / Debit Card</p>
                                <p className='text-xs text-gray-500'>Pay Securly Online</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <h2 className='text-lg font-semibold mb-3 text-gray-800'>Order Summary</h2>
                    <div className='rounded-xl border bg-gray-50 p-4 space-y-2'>
                        {cardItems.map((item, index) => (
                            <div key={index} className='flex justify-between text-sm text-gra-700'>
                                <span>
                                    {item.name} x {item.quantity}
                                </span>
                                <br />
                                <span>
                                    ₹{item.price * item.quantity}
                                </span>
                            </div>
                        ))}
                        <hr className='border-gray-200 my-2' />
                        <div className='flex justify-between items-center font-medium text-gray-800'>
                            <span>SubTotal</span>
                            <span>₹{totalAmount}</span>
                        </div>
                        <div className='flex justify-between items-center text-gray-700'>
                            <span>Delivery Fee</span>
                            <span>{deliveryFee == 0 ? "free" : deliveryFee}</span>
                        </div>
                        <div className='flex justify-between items-center font-bold text-[#ff4d2d] text-lg'>
                            <span>Total</span>
                            <span>₹{AmountWithDeliveryFee}</span>
                        </div>
                    </div>
                </section>
                <button
                    onClick={handlePlaceOrder}
                    className='w-full bg-[#ff4d2d] hover:bg-[#e64526] text-white py-3 rounded-xl font-semibold flex justify-center items-center gap-2'>
                    {loading && <AiOutlineLoading3Quarters size={20} className='animate-spin' />}
                    {loading ? "Placing..." : paymentMethod === "cod" ? "Place Order" : "Pay & Place Order"}
                </button>
            </div>
        </div>

    )
}

export default CheckOutPage
