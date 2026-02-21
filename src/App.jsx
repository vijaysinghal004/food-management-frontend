import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Signin from './pages/Signin'
import ForgetPassword from './pages/ForgetPassword';
import useGetCurrentUser from './hooks/UseGetCurrentUser.jsx';
import { useSelector } from 'react-redux';
import Home from './pages/Home.jsx';
import UseGetCity from './hooks/UseGetCity.jsx';
 export const serverUrl='http://localhost:8080';
const App = () => {
  useGetCurrentUser();
  UseGetCity();
  const {userData}=useSelector(state=>state.user)
  return (
   <Routes>
    <Route path='/signUp' element={!userData?<SignUp/>:<Navigate to={"/"}/>}/>
    <Route path='/signin' element={!userData?<Signin/>:<Navigate to={"/"}/>}/>
    <Route path='/forget-password' element={!userData?<ForgetPassword/>:<Navigate to="/"/>}  />
    <Route path='/' element={userData?<Home/>:<Navigate to={"/signUp"} />}  />
   </Routes>
  )
}

export default App
