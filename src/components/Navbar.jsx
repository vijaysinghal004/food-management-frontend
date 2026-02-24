import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { setUserData } from "../redux/userSlice";
import { FaPlus } from "react-icons/fa";
import { LuReceiptIndianRupee } from "react-icons/lu";
import { useNavigate } from "react-router-dom"



function Navbar() {
    const { userData, city } = useSelector(state => state.user);
    const { myShopData } = useSelector(state => state.owner);
    const [showInfo, setShowInfo] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogOut = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/auth/signOut', {
                withCredentials: true
            })
            dispatch(setUserData(null))
            console.log(res);
        } catch (err) {
            console.log(err.response.data.message);
        }
    }
    return (
        <div className="w-full h-[80px] flex items-center justify-between md:justify-center gap-[30px] px-[20px] fixed top-0 z-[9999] bg-[#fff9f6] overflow-visible">

            {/* {showSearch &&
                <div className="w-[90%] h-[70px] bg-white shadow-xl rounded-lg items-center gap-[20px] flex fixed top-[80px] left-[5px]">

                    <div className="flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400">
                        <FaLocationDot size={25} className="text-[#ff4d2d]" />
                        <div className="w-[80%] truncate text-gray-600">
                            Jhansi  
                        </div>
                    </div>
                    <div className="w-[80%] flex items-center gap-[10px]">
                        <IoSearchOutline size={25} className="text-[#ff4d2d] cursor-pointer"  />
                        <input type="text" placeholder="search delicious food... " className="px-[10px] text-gray-700 outline-0 w-full" />
                    </div>
                </div>
            } */}
            {showSearch && userData.role == "user" && (
                <div className="fixed top-[80px] left-1/2 -translate-x-1/2 w-[95%] max-w-[500px] bg-white shadow-2xl rounded-xl p-[15px] flex items-center gap-[15px] z-[9999] md:hidden">

                    <div className="flex items-center gap-[8px] border-r pr-[10px]">
                        <FaLocationDot size={20} className="text-[#ff4d2d]" />
                        <span className="text-gray-600 text-sm truncate">
                            {city}
                        </span>
                    </div>

                    <div className="flex items-center gap-[10px] flex-1">
                        <IoSearchOutline size={20} className="text-[#ff4d2d]" />
                        <input
                            type="text"
                            placeholder="Search delicious food..."
                            className="w-full outline-none text-gray-700 text-sm"
                        />
                    </div>
                </div>
            )}
            <h1 className="text-3xl font-bold mb-2 text-[#ff4d2d]">
                Vingo
            </h1>
            {userData.role == "user" &&
                <div className="md:w-[60%] lg:w-[40%] h-[70px] bg-white shadow-xl rounded-lg items-center gap-[20px] hidden md:flex">

                    <div className="flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400">
                        <FaLocationDot size={25} className="text-[#ff4d2d]" />
                        <div className="w-[80%] truncate text-gray-600">
                            {city}
                        </div>
                    </div>
                    <div className="w-[80%] flex items-center gap-[10px]">
                        <IoSearchOutline size={25} className="text-[#ff4d2d]" />
                        <input type="text" placeholder="search delicious food... " className="px-[10px] text-gray-700 outline-0 w-full" />
                    </div>
                </div>
            }

            <div className="flex items-center gap-[20px]">
                {userData.role == "user" &&
                    <IoSearchOutline size={25} className="text-[#ff4d2d] md:hidden " onClick={() => { setShowSearch(prev => !prev) }} />
                }
                {userData.role == 'owner' ? <>
                    {myShopData &&
                        <>
                            <button className="text-[#ff4d2d] hidden md:flex items-center gap-1 p-2 cursor-pointer rounded-full bg-[#ff4d2d]/10" onClick={() => navigate("/add-food")}>
                                <FaPlus size={20} />
                                <span>Add food items</span>
                            </button>
                            <button className="text-[#ff4d2d] md:hidden flex items-center gap-1 p-2 cursor-pointer rounded-full bg-[#ff4d2d]/10" onClick={() => navigate("/add-food")}>
                                <FaPlus size={20} />
                            </button>
                        </>}
                    {/* {userData.role=='user' &&   */}
                    <div className="  relative text-[#ff4d2d] hidden md:flex items-center gap-1 p-2 cursor-pointer rounded-full bg-[#ff4d2d]/10" >
                        <LuReceiptIndianRupee size={20} />

                        <span>My order</span>
                        <span className="absolute -right-2 -top-2 text-xs font-bold text-white bg-[#ff4d2d] rounded-full px-[6px] py-[1px]">1</span>
                    </div>
                    <div className="relative text-[#ff4d2d] md:hidden flex items-center gap-1 p-2 cursor-pointer rounded-full bg-[#ff4d2d]/10" >
                        <LuReceiptIndianRupee size={20} />
                        <span className="absolute -right-2 -top-2 text-xs font-bold text-white bg-[#ff4d2d] rounded-full px-[6px] py-[1px]">1</span>
                    </div>

                </> : (
                    <>
                        <div className=" relative cursor-pointer">
                            <FiShoppingCart size={25} className="text-[#ff4d2d]" />
                            <span className="absolute right-[-9px] top-[-12px] text-[#ff4d2d] ">0</span>
                        </div>
                        {/* {userData.role=="user" &&   */}

                        <button className="hidden md:block ps-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium">
                            My Orders
                        </button>
                        {/* } */}
                    </>
                )
                }



                <div
                    className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#ff4d2d] text-white text-[18px] shadow-xl font-semibold cursor-pointer"
                    onClick={() => setShowInfo(prev => !prev)}
                >
                    {userData.fullName.slice(0, 1)}
                </div>
                {showInfo &&
                    <div className="fixed top-[80px] right-[10px] md:right-[10%] lg:right-[25%] w-[180px] bg-white shadow-2xl rounded-xl p-[20px] flex flex-col gap-[10px] z-[9999]">
                        <div className="text-[17px] font-semibold">{userData.fullName}</div>
                    {userData.role=='user' &&  <>
                    
                        <div className="md:hidden text-[#ff4d2d] font-semibold cursor-pointer">My Orders</div>
                    
                    </>}
                        
                        <div className="text-[#ff4d2d] font-semibold cursor-pointer" onClick={handleLogOut}>Log Out</div>
                    </div>
                }
            </div>

        </div>
    );
}

export default Navbar;