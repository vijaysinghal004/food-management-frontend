import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Signin from './pages/Signin'
import ForgetPassword from './pages/ForgetPassword';
 export const serverUrl='http://localhost:8080';
const App = () => {
  return (
   <Routes>
    <Route path='/signUp' element={<SignUp/>}/>
    <Route path='/signin' element={<Signin/>}/>
    <Route path='/forget-password' element={<ForgetPassword/>}  />
   </Routes>
  )
}

export default App
