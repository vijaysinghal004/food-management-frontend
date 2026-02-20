import React from 'react'
import { useState } from 'react'
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';
import axios from 'axios';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';




const SignUp = () => {
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
    const [err,setErr]=useState("");



    const handleSignup = async (e) => {
        // setErr("");
        e.preventDefault();
        try {
            const result = await axios.post(`http://localhost:8080/api/auth/signUp`,
                {
                    fullName,
                    email,
                    mobileno,
                    password,
                    role
                },
                { withCredentials: true });
            console.log(result);
            setErr("");
            navigate("/signin");
        } catch (err) {
            // console.log(err);
            setErr(err?.response?.data?.message)
            // alert(err.response.data.message);
        }
    }

    const handleGoogleAuth = async () => {
        // setErr("");
        // if (mobileno.length < 10) {
        //     return setErr("enter mobile no first")
        //     // return alert("enter mobile no first");
        // }
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        console.log(result);
        try {
            const { data } = await axios.post("http://localhost:8080/api/auth/google-auth",
                {
                    fullName: result.user.displayName,
                    email: result.user.email,
                    role,
                    password,
                    mobileno
                }, { withCredentials: true }
            )
            setErr("");
            console.log(data);
            navigate("/");
        } catch (err) {
            //    console.log(err);
            setErr(err?.response?.data?.message);
            // alert(err.response.data.message)
        }
    }


    return (
        <div className='min-h-screen flex items-center  justify-center p-8' style={{ backgroundColor: bgColor }}>
            <div className={`bg-white rounded-xl shadow-lg w-full max-w-md p-4 `} style={{ border: `1px solid ${borderColor}` }}>
                <h1 className='text-2xl font-bold mb-1' style={{ color: `${primaryColor}` }}> Vingo</h1>
                <p className='text-gray-600 mb-4'>Create your account to get start with delicious food deliveries</p>
                {/* full name */}

                <div className='mb-3'>
                    <label htmlFor="fullName" className='block text-gray-700 font-medium mb-1'>Full Name</label>
                    <input id="fullName" type="text" className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500' value={fullName} placeholder='Enter your Full Name' style={{ border: `1px solid ${borderColor}` }} onChange={(e) => setFullName(e.target.value)} required />
                </div>
                <div className='mb-3'>
                    <label htmlFor="email" className='block text-gray-600 font-medium mb-1'>Email</label>
                    <input id="email" type="email" className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email' style={{ border: `1px solid ${borderColor}` }} />
                </div>
                <div className='mb-3'>
                    <label htmlFor="mobileNo" className='block text-gray-600 font-medium mb-1'>Mobile no</label>
                    <input id="mobileNo" type="text" className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500' placeholder='Enter your Mobile No' value={mobileno} onChange={(e) => setMobileno(e.target.value)} style={{ border: `1px solid ${borderColor}` }} />
                </div>
                <div className='mb-3'>
                    <label htmlFor="password" className='block text-gray-600 font-medium mb-1'>Password</label>
                    <div className='relative'>
                        <input id="password" type={showPassword ? "text" : "password"} className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} style={{ border: `1px solid ${borderColor}` }} />
                        <button className='absolute right-3 top-3 text-gray-500' onClick={() => setshowPassword(prev => !prev)}>{!showPassword ? <IoEye /> : <IoMdEyeOff />}</button>
                    </div>
                </div>

                <div className='mb-3'>
                    <label htmlFor="role" className='block text-gray-600 font-medium mb-1'>Role</label>
                    <div className='flex gap-2'>
                        {['user', 'owner', 'deliveryBoy'].map((r) => (
                            <button className='flex-1 border rounded-lg px-3 py-2 text-center font-medium transition-colors cursor-pointer'
                                onClick={() => setRole(r)}
                                style={
                                    role == r ?
                                        { backgroundColor: primaryColor, color: "white" }
                                        : { border: `1px solid ${primaryColor}`, color: "#333" }
                                }>
                                {r}
                            </button>
                        ))}
                    </div>
                </div>
                <button type='submit' onClick={handleSignup} className={`text-center w-full border rounded-lg mt-4 px-4 py-2 flex justify-center gap-2  transition duration-200 bg-[#ff4d2d] hover:bg-[green] text-white cursor-pointer`}
                //  onClick={handleSignup}
                >
                    Signup
                </button>
                {err &&
                <p className='text-red-500 text-center underline'>
                    {err}
                </p>
                }
                <button onClick={handleGoogleAuth} className='w-full mt-4 px-4 py-2 flex items-center justify-center gap-2  border rounded-lg transition duration-200 border-gray-400 hover:bg-gray-100'>
                    <FcGoogle size={20} />
                    <span>Sign up with Google</span>
                </button>
                <p className='text-center mt-2 cursor-pointer' onClick={() => navigate("/signin")}>Already Have an Account ? <span className=' text-[#ff4d2d]' >Sign in</span></p>
            </div>
        </div>
    )
}

export default SignUp