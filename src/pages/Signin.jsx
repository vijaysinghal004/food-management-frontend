import React from 'react'
import { useState } from 'react'
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';
import axios from 'axios';




const Signin = () => {
    const primaryColor = '#ff4d2d'
    const hoverColor = '#e64323'
    const bgColor = '#fff9f6'
    const borderColor = '#ddd'
    const [showPassword, setshowPassword] = useState(false);
    const [role, setRole] = useState('user');
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileno, setMobileno] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();



    const handleSignup = async (e) => {
            e.preventDefault();
        try {
            const result = await axios.post(`http://localhost:8080/api/auth/signin`,
                {
                email,
                password,
            }, 
            { withCredentials: true });
            console.log(result);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div className='min-h-screen flex items-center  justify-center p-8' style={{ backgroundColor: bgColor }}>
            <div className={`bg-white rounded-xl shadow-lg w-full max-w-md p-4 `} style={{ border: `1px solid ${borderColor}` }}>
                <h1 className='text-2xl font-bold mb-1' style={{ color: `${primaryColor}` }}> Vingo</h1>
                <p className='text-gray-600 mb-4'>Create your account to get start with delicious food deliveries</p>
                {/* full name */}
            <form 
                     onSubmit={handleSignup} 
            >

                <div className='mb-3'>
                    <label htmlFor="email" className='block text-gray-600 font-medium mb-1'>Email</label>
                    <input id="email" type="email" className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email' style={{ border: `1px solid ${borderColor}` }} />
                </div>
               
                <div className='mb-3'>
                    <label htmlFor="password" className='block text-gray-600 font-medium mb-1'>Password</label>
                    <div className='relative'>
                        <input id="password" type={showPassword ? "text" : "password"} className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} style={{ border: `1px solid ${borderColor}` }} />
                        <button className='absolute right-3 top-3 text-gray-500' onClick={() => setshowPassword(prev => !prev)}>{!showPassword ? <IoEye /> : <IoMdEyeOff />}</button>
                    </div>
                </div>
                <div className="text-right mb-4 text-[#ff4d2d] font-medium underline  cursor-pointer" onClick={()=>navigate("/forget-password")}>forget password?</div>
                <button  type='submit' className={`text-center w-full border rounded-lg mt-4 px-4 py-2 flex justify-center gap-2  transition duration-200 bg-[#ff4d2d] hover:bg-[green] text-white cursor-pointer`} 
                    //  onClick={handleSignup}
                     >
                    Signin
                </button>
                <button  className='w-full mt-4 px-4 py-2 flex items-center justify-center gap-2  border rounded-lg transition duration-200 border-gray-400 hover:bg-gray-100'>
                    <FcGoogle size={20} />
                    <span>Sign in with Google</span>
                </button>
                </form>
                <p className='text-center mt-2 cursor-pointer' onClick={() => navigate("/signUp")}>Create an Account ? <span className=' text-[#ff4d2d]' >SignUp</span></p>
            </div>
        </div>
    )
}

export default Signin