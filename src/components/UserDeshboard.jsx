import React, { useEffect, useRef, useState } from 'react'
import Navbar from './Navbar'
import { categories } from '../Category'
import CategoryCard from './CategoryCard'
import { FaChevronCircleLeft } from "react-icons/fa";
import { FaChevronCircleRight } from "react-icons/fa";
import { useSelector } from 'react-redux';
import FoodCard from './FoodCard';


const UserDeshboard = () => {
  const { city, shopInMyCity ,itemInMyCity} = useSelector(state => state.user)
  const cateScrollRef = useRef();
  const shopScrollRef = useRef();
  const [showRightCateButton, setShowRightCateButton] = useState(false)
  const [showLeftCateButton, setShowLeftCateButton] = useState(false)
  const [showRightShopButton, setShowRightShopButton] = useState(false)
  const [showLeftShopButton, setShowLeftShopButton] = useState(false)



  const updateButton = (ref, setLeftButton, setRightButton) => {
    const element = ref.current
    if (element) {
      setLeftButton(element.scrollLeft > 0)
      setRightButton(element.scrollLeft + element.clientWidth < element.scrollWidth - 1)
      // console.log(element.scrollLeft+element.clientWidth)
      // console.log(element.scrollWidth)
      // console.log(element.scrollLeft+element.clientWidth<element.scrollWidth-1)
      // console.log(element.scrollLeft)
      // console.log(element.scrollWidth)
      // console.log(element.clientWidth)
    }
  }
  // useEffect(()=>{
  //   if(cateScrollRef.current){
  //       updateButton(cateScrollRef,setShowLeftCateButton,setShowRightCateButton)
  //     cateScrollRef.current.addEventListener('scroll',()=>{
  //       updateButton(cateScrollRef,setShowLeftCateButton,setShowRightCateButton)
  //     })
  //   }
  //   return ()=> cateScrollRef.current.removeEventListener('scroll',()=>{
  //       updateButton(cateScrollRef,setShowLeftCateButton,setShowRightCateButton)
  //     })
  // },[categories])
  // useEffect(() => {
  //   const element = cateScrollRef.current;
  //   if (!element) return;

  //   const handleScroll = () => {
  //     updateButton(cateScrollRef, setShowLeftCateButton, setShowRightCateButton);
  //   };

  //   // Initial check
  //   updateButton(cateScrollRef, setShowLeftCateButton, setShowRightCateButton);

  //   element.addEventListener("scroll", handleScroll);

  //   return () => {
  //     element.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);
  useEffect(() => {
    const setupScroll = (ref, setLeft, setRight) => {
      const element = ref.current;
      if (!element) return;

      const handleScroll = () => {
        updateButton(ref, setLeft, setRight);
      };

      // Initial check
      updateButton(ref, setLeft, setRight);

      element.addEventListener("scroll", handleScroll);

      return () => {
        element.removeEventListener("scroll", handleScroll);
      };
    };

    const cleanupCate = setupScroll(
      cateScrollRef,
      setShowLeftCateButton,
      setShowRightCateButton
    );

    const cleanupShop = setupScroll(
      shopScrollRef,
      setShowLeftShopButton,
      setShowRightShopButton
    );

    return () => {
      cleanupCate && cleanupCate();
      cleanupShop && cleanupShop();
    };
  }, []);


  const ScrollHandler = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction == 'left' ? -200 : 200,
        behavior: "smooth"
      })
    }
  }

  return (
    <div className='w-screen min-h-screen flex flex-col gap-5 items-center bg-[#fff9f6]'>
      <Navbar />
      <div className='w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]'>
        <h1 className='text-gray-800 text-2xl sm:text-3xl'>Inspiration for your first order</h1>
        <div className='w-full relative'>
          {showLeftCateButton &&
            <button className='absolute left-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10 ' onClick={() => ScrollHandler(cateScrollRef, "left")}>
              <FaChevronCircleLeft />
            </button>
          }
          <div className='w-full flex overflow-x-auto gap-4 pb-2 ' ref={cateScrollRef}>
            {categories.map((cate, index) => (
              <CategoryCard name={cate.category} image={cate.image} key={index} />
            ))}
          </div>
          {showRightCateButton &&
            <button className='absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10 ' onClick={() => ScrollHandler(cateScrollRef, "right")}>
              <FaChevronCircleRight />
            </button>
          }
        </div>
      </div>
      <div className='w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]'>
        <h1 className='text-gray-800 text-2xl sm:text-3xl'>Best Shop in {city}</h1>
        <div className='w-full relative'>
          {showLeftShopButton &&
            <button className='absolute left-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10 ' onClick={() => ScrollHandler(shopScrollRef, "left")}>
              <FaChevronCircleLeft />
            </button>
          }
          <div className='w-full flex overflow-x-auto gap-4 pb-2 ' ref={shopScrollRef}>
            {shopInMyCity?.map((shop, index) => (
              <CategoryCard name={shop.name} image={shop.image} key={index} />
            ))}
          </div>
          {showRightShopButton &&
            <button className='absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10 ' onClick={() => ScrollHandler(shopScrollRef, "right")}>
              <FaChevronCircleRight />
            </button>
          }
        </div>
      </div>

      {/* all items */}
      <div className='w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]'>
        <h1 className='text-gray-800 text-2xl sm:text-3xl'>Suggest Food Items </h1>
        <div className='w-full h-auto flex flex-wrap gap-[20px] justify-center'>
   {itemInMyCity.map((item,index)=>(
    <FoodCard key={index} data={item}/>
   ))}
        </div>

      </div>

    </div>

  )
}

export default UserDeshboard
