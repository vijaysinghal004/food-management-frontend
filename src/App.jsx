import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Signin from './pages/Signin'
 export const serverUrl='http://localhost:8080';
const App = () => {
  return (
   <Routes>
    <Route path='/signUp' element={<SignUp/>}/>
    <Route path='/signin' element={<Signin/>}/>
   </Routes>
  )
}

export default App
