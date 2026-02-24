import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Signin from './pages/Signin'
import ForgetPassword from './pages/ForgetPassword';
import useGetCurrentUser from './hooks/UseGetCurrentUser.jsx';
import { useSelector } from 'react-redux';
import Home from './pages/Home.jsx';
import UseGetCity from './hooks/UseGetCity.jsx';
import useGetMyShop from './hooks/UseGetMyShop.jsx';
import CreateEditShop from './pages/CreateEditShop.jsx';
import AddItem from './pages/AddItem.jsx';
import EditItem from './pages/EditItem.jsx';
 export const serverUrl='http://localhost:8080';
const App = () => {
  useGetCurrentUser();
  UseGetCity();
  useGetMyShop()
  const {userData}=useSelector(state=>state.user)
      const { myShopData } = useSelector(state => state.owner)
  
  return (
   <Routes>
    <Route path='/signUp' element={!userData?<SignUp/>:<Navigate to={"/"}/>}/>
    <Route path='/signin' element={!userData?<Signin/>:<Navigate to={"/"}/>}/>
    <Route path='/forget-password' element={!userData?<ForgetPassword/>:<Navigate to="/"/>}  />
    <Route path='/' element={userData?<Home/>:<Navigate to={"/signUp"} />}  />
    <Route path="/create-edit-shop" element={userData?<CreateEditShop/>:<Navigate to="/signIn"/>}></Route>
    <Route path="/add-food" element={myShopData?<AddItem/>:<Navigate to="/signIn"/>}></Route>
    <Route path="/edit-item/:itemId" element={myShopData?<EditItem/>:<Navigate to="/signIn"/>}></Route>
   </Routes>
  )
}

export default App
