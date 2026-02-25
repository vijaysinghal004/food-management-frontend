import React, { useState } from "react";
import { FaLeaf, FaDrumstickBite } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaMinus, FaPlus } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";



function FoodCard({ data }) {
  const [quantity, setQuantity] = useState(0);

  const renderStar = (rating) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        (i <= rating) ? (<FaStar key={i} className="text-yellow-500 text-lg" />
        ) : (<FaRegStar key={i} className="text-yellow-500 text-lg" />)
      )
    }
    return stars;
  }

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  }

  const handleDesc = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <div className="w-[250px] rounded-2xl border-2 border-[#ffd4d2] bg-white shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">

      <div className="relative w-full h-[170px] flex justify-center items-center bg-white">

        {/* Veg / Non-Veg Badge */}
        <div className="absolute top-3 right-3 bg-white rounded-full p-1 shadow">
          {data.foodType === "veg" ? (
            <FaLeaf className="text-green-600 text-lg" />
          ) : (
            <FaDrumstickBite className="text-red-600 text-lg" />
          )}
        </div>

        <img
          src={data.image}
          alt={data.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h2 className="text-lg font-semibold text-gray-900 text-base truncate">{data.name}</h2>
        <div className="flex items-center gap-1 mt-1">
          {renderStar(data.rating?.average || 0)}
          <span className="text-xs text-gray-500 ">
            {data.rating?.count || 0}
          </span>
        </div>
        <div className="flex items-center justify-between mt-auto pt-3">
          <span className="font-bold text-gray-900 text-lg">{data.price}</span>
          <div className="flex items-center border rounded-full overflow-hidden shadow-sm">
            <button className="px-2 py-1 hover:bg-gray-100 transition" onClick={handleDesc}>
              <FaMinus size={12} />
            </button>
            <span>{quantity}</span>
            <button className="px-2 py-1 hover:bg-gray-100 transition" onClick={handleIncrease} >
              <FaPlus size={12} />
            </button>
            <button className="bg-[#ff4d2d] text-white px-3 py-2 transition-colors">
              <FaCartShopping size={16}/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;