import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Signin from './pages/Signin'
import ForgetPassword from './pages/ForgetPassword';
import useGetCurrentUser from './hooks/UseGetCurrentUser.jsx';
import { useDispatch, useSelector } from 'react-redux';
import Home from './pages/Home.jsx';
import UseGetCity from './hooks/UseGetCity.jsx';
import useGetMyShop from './hooks/UseGetMyShop.jsx';
import CreateEditShop from './pages/CreateEditShop.jsx';
import AddItem from './pages/AddItem.jsx';
import EditItem from './pages/EditItem.jsx';
import UseGetShopByCity from './hooks/UseGetShopByCity.jsx';
import UseGetItemByCity from './hooks/UseGetItemByCity.jsx';
import CartPage from './pages/CartPage.jsx';
import CheckOutPage from './pages/CheckOutPage.jsx';
import OrderPlacedPage from './pages/OrderPlacedPage.jsx';
import MyOrders from './pages/MyOrders.jsx';
import UseGetMyOrders from './hooks/UseGetMyOrders.jsx';
import UseUpdateUserLocation from './hooks/UseUpdateUserLocation.jsx';
import TrackOrderPage from './pages/TrackOrderPage.jsx';
import Shop from './pages/Shop.jsx';
import { linkWithCredential } from 'firebase/auth';
import { io } from 'socket.io-client';
import { setSocket } from './redux/userSlice.jsx';
 export const serverUrl='http://localhost:8080';
const App = () => {
  useGetCurrentUser();
  UseGetCity();
  useGetMyShop();
  UseGetShopByCity();
  UseGetItemByCity();
  UseGetMyOrders();
  UseUpdateUserLocation();
  const dispatch=useDispatch();

useEffect(()=>{ 
 const socketInstance=io(serverUrl,{withCredentials:true})
 dispatch(setSocket(socketInstance))
 socketInstance.on('connect',()=>{
  console.log("connection successfully ");
  if(userData){
    socketInstance.emit('identity',{userId:userData._id})
  }
 })
 return ()=>{
  socketInstance.disconnect()
 }
},[])
// },[userData?._id])

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
    <Route path="/cart" element={userData?<CartPage/>:<Navigate to="/signIn"/>}></Route>
    <Route path="/checkout" element={userData?<CheckOutPage/>:<Navigate to="/signIn"/>}></Route>
    <Route path="/order-placed" element={userData?<OrderPlacedPage/>:<Navigate to="/signIn"/>}></Route>
    <Route path="/my-orders" element={userData?<MyOrders/>:<Navigate to="/signIn"/>}></Route>
    <Route path="/track-order/:orderId" element={userData?<TrackOrderPage/>:<Navigate to="/signIn"/>}></Route>
    <Route path="/shop/:shopId" element={userData?<Shop/>:<Navigate to="/signIn"/>}></Route>
   </Routes>
  )
}

export default App
