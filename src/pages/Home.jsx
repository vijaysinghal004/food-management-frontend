import React from 'react'
import UserDeshboard from '../components/UserDeshboard'
import OwnerDeshboard from '../components/OwnerDeshboard'
import DeliveryBoy from '../components/DeliveryBoy'
import { useSelector } from 'react-redux'

const Home = () => {
      const { userData } = useSelector(state => state.user)

  return (

    <div className='w-[100vw] min-h-[100vh] pt-[100px] flex flex-col items-center bg-[#fff9f6]'>
        {/* {userData.fullName} */}
        {userData.role==='user' && <UserDeshboard/>}
        {userData.role==='owner' && <OwnerDeshboard/>}
        {userData.role==='deliveryBoy' && <DeliveryBoy/>}
    </div>
  )
}

export default Home
