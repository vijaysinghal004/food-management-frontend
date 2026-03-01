import React from 'react'
import { FaMinus, FaPlus } from "react-icons/fa";
import { CiTrash } from "react-icons/ci";
import { useDispatch } from 'react-redux';
import { removeCartItem, updateQuantity } from '../redux/userSlice';



const CartItemCard = ({ data }) => {
  const dispatch=useDispatch();

      const handleInc=(id,currQty)=>{
        if(currQty>1){
  dispatch(updateQuantity({id,quantity:currQty+1}))    
        }
    }
      const handleDec=(id,currQty)=>{
        if(currQty>1){
      dispatch(updateQuantity({id,quantity:currQty-1}))
        }
    }
  return (

    <div className='flex justify-between items-center bg-white p-4 rounded-xl shadow border'>
      <div className='flex items-center gap-4'>
        <img src={data.image} alt="" className='w-20 h-20 object-cover rounded-lg border' />
        <div className=''>
          <h1 className='font-medium text-gray-800'>{data.name}</h1>
          <p className='text-sm text-gray-500'>₹{data.price} x {data.quantity}</p>
          <p className='font-bold text-gray-900'>₹{data.price * data.quantity}</p>
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <button className="px-2 py-1 bg-gray-100 hover:bg-gray-200 transition rounded-full cursor-pointer" onClick={()=>handleDec(data.id,data.quantity)}>
          <FaMinus size={12} />
        </button>
        <span>{data.quantity}</span>
        <button className="px-2 py-1 bg-gray-100 hover:bg-gray-200 transition rounded-full cursor-pointer" onClick={()=>handleInc(data.id,data.quantity)}>
          <FaPlus size={12} />
        </button>
        <button className='p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200' 
        onClick={()=>dispatch(removeCartItem(data.id))}
        >
          <CiTrash size={18}/>
        </button>
      </div>
    </div>
  )
}

export default CartItemCard
