import React, { useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from 'axios';


const ForgetPassword = () => {
    const [step, setStep] = useState(1);
    const primaryColor = '#ff4d2d'
    const hoverColor = '#e64323'
    const bgColor = '#fff9f6'
    const borderColor = '#ddd'
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [showNewPassword, setshowNewPassword] = useState(false);
    const [showConfirmPassword, setshowConfirmPassword] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading1, setIsLoading1] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);
    const [isLoading3, setIsLoading3] = useState(false);
    const navigate = useNavigate();


    const handleSendOtp = async () => {
        if (!email) {
            alert("Email is required");
            return;
        }
        try {
            setIsLoading1(true);
            const result = await axios.post("http://localhost:8080/api/auth/send-otp", { email }, { withCredentials: true })
            console.log(result);
            setStep(2);
        } catch (err) {
            alert(err?.response?.data?.message);
            console.log(err?.response?.data.message);
        } finally {
            setIsLoading1(false);
        }
    }

    const handleVerifyOtp = async () => {
        // if (!otp || otp.length !== 4) {
        //     alert("Enter valid 4 digit OTP");
        //     return;
        // }
        try {
            setIsLoading2(true);
            const result = await axios.post("http://localhost:8080/api/auth/verify-otp", { email, otp }, { withCredentials: true })
            console.log(result);
            setStep(3);
        } catch (err) {
            alert(err?.response?.data?.message);
            console.log(err.response.data.message);
        } finally {
            setIsLoading2(false);
        }
    }
    const handleResetPassword = async () => {
        // if (!newPassword || !confirmPassword) {
        //     alert("All fields required");
        //     return;
        // }
        // if (newPassword != confirmPassword) {
        //     alert("password does not match")
        //     return null;
        // }
        try {
            setIsLoading3(true);
            const result = await axios.post("http://localhost:8080/api/auth/reset-password", { email, newPassword, confirmPassword }, { withCredentials: true })
            console.log(result);
            setEmail("");
            navigate("/signIn")
        } catch (err) {
            alert(err?.response?.data?.message);
            console.log(err.message);
        } finally {
            setIsLoading3(false);
        }
    }

    return (

        <div className='min-h-screen flex items-center  justify-center p-3' style={{ backgroundColor: bgColor }}>
            <div className={`bg-white rounded-xl shadow-lg w-full max-w-md p-4 `} style={{ border: `1px solid ${borderColor}` }}>
                <div className='flex items-center gap-4 m-4'>
                    <FaArrowLeftLong size={20} className='text-[#ff4d2d] cursor-pointer ' onClick={() => navigate(-1)} />
                    <h1 className='text-2xl font-bold mb-1' style={{ color: `${primaryColor}` }}> Forget Password</h1>

                </div>
                {step == 1 &&
                    <div>
                        <div className='mb-6'>
                            <label htmlFor="email" className='block text-gray-700 font-medium mb-1'>Email</label>
                            <input id="email" type="email" className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email' style={{ border: `1px solid ${borderColor}` }} />
                        </div>
                        <button
                            type='button'
                            className={`text-center w-full border rounded-lg mt-4 px-4 py-2 flex justify-center gap-2  transition duration-200 bg-[#ff4d2d] hover:bg-[#e64323] text-white cursor-pointer disabled:opacity-70`}
                            onClick={handleSendOtp}
                            disabled={isLoading1}
                        >
                            {isLoading1 && <AiOutlineLoading3Quarters size={20} className=' mt-1 center animate-spin flex justify-center items-center' />}
                            {!isLoading1 ? "Send Otp" : "Sending Otp "}
                        </button>
                    </div>
                }
                {step == 2 &&
                    <div>
                        <div className='mb-6'>
                            <label htmlFor="otp" className='block text-gray-700 font-medium mb-1'> Enter Otp</label>
                            <input id="otp" type="text" className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500' value={otp} onChange={(e) => setOtp(e.target.value)} placeholder='Enter 6 digits Otp' style={{ border: `1px solid ${borderColor}` }} />
                        </div>
                        <button
                            type='button'
                            className={`text-center w-full border rounded-lg mt-4 px-4 py-2 flex justify-center gap-2  transition duration-200 bg-[#ff4d2d] hover:bg-[#e64323] text-white cursor-pointer disabled:opacity-70`}
                            onClick={handleVerifyOtp}
                            disabled={isLoading2}
                        >
                            {isLoading2 && <AiOutlineLoading3Quarters size={20} className=' mt-1 center animate-spin flex justify-center items-center' />}
                            {!isLoading2 ? "Verify" : "Verifying... "}

                        </button>
                    </div>
                }
                {step == 3 &&
                    <div>
                        <div className='mb-3'>
                            <label htmlFor="newPassword" className='block text-gray-600 font-medium mb-1'>New Password</label>
                            <div className='relative'>
                                <input id="newPassword" type={showNewPassword ? "text" : "password"} className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500' placeholder='Enter New password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} style={{ border: `1px solid ${borderColor}` }} />
                                <button className='absolute right-3 top-3 text-gray-500' onClick={() => setshowNewPassword(prev => !prev)}>{!showNewPassword ? <IoEye /> : <IoMdEyeOff />}</button>
                            </div>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="confirmPassword" className='block text-gray-600 font-medium mb-1'>Confirm Password</label>
                            <div className='relative'>
                                <input id="confirmPassword" type={showConfirmPassword ? "text" : "password"} className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500' placeholder='Confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} style={{ border: `1px solid ${borderColor}` }} />
                                <button className='absolute right-3 top-3 text-gray-500' onClick={() => setshowConfirmPassword(prev => !prev)}>{!showConfirmPassword ? <IoEye /> : <IoMdEyeOff />}</button>
                            </div>
                        </div>
                        <button
                            type='button'
                            className={`text-center w-full border rounded-lg mt-4 px-4 py-2 flex justify-center gap-2  transition duration-200 bg-[#ff4d2d] hover:bg-[#e64323] text-white cursor-pointer disabled:opacity-70`}
                            onClick={handleResetPassword}
                            disabled={isLoading3}
                        >
                            {isLoading3 && <AiOutlineLoading3Quarters size={20} className=' mt-1 center animate-spin flex justify-center items-center' />}
                            {!isLoading3 ? "Reset Password" : "Resetting..."}
                        </button>
                    </div>


                }
            </div>

        </div>
    )
}

export default ForgetPassword
