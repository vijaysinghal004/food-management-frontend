import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartItemCard from "../components/CartItemCard";

function CartPage() {
    const navigate = useNavigate();
    const { cardItems, totalAmount } = useSelector(state => state.user);
    return (
        <div className="min-h-screen bg-[#fff9f6] flex justify-center p-6">
            <div className="w-full max-w-[800px]">
                <div className="flex items-center gap-[20px] mb-6">

                    {/* Back Button */}
                    <div
                        className="z-[10] cursor-pointer"
                        onClick={() => navigate("/")}
                    >
                        <IoIosArrowRoundBack
                            size={35}
                            className="text-[#ff4d2d]"
                        />
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl font-semibold">Your Cart</h1>
                </div>


                {!cardItems || cardItems?.length === 0 ? (
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <p className="text-gray-500">Your cart is empty.</p>
                    </div>) :
                    (<><div className="space-y-4">
                        {cardItems?.map((item, index) => (
                            <CartItemCard data={item} key={index} />
                        ))}
                    </div>
                        <div className="mt-6 bg-white p-4 rounded-xl shadow flex justify-between items center border">
                            <h1 className="text-lg font-semibold">Total Amount</h1>
                            <span className="text-xl font-bold text-[#ff4d2d]">
                             ₹{totalAmount}
                            </span>
                        </div>
                        <div className="mt-4 flex justify-end" onClick={() => navigate("/checkout")}>
                            <button className="bg-[#ff4d2d] hover:bg-[#e64526] cursor-pointer text-white px-6 py-3 rounded-lg text-lg font-bold transition  ">Proceed to CheckOut</button>
                        </div>
                    </>)
                }

            </div>
        </div>
    );
}

export default CartPage;