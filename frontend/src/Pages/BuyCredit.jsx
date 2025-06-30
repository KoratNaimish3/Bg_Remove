import React from 'react'
import axios from 'axios';
import { assets, plans } from '../assets/assets'
import { useAuth } from '@clerk/clerk-react';
import { toast } from 'react-toastify';

function BuyCredit() {


  const { getToken } = useAuth()


  const handleBuy = async (planId) => {
    const token = await getToken()
    try {

      const res = await axios.post('http://localhost:4000/api/payment/stripe', { planId }, {
        headers: { token }
      });

      window.location.href = res.data.url;

    } catch (error) {
      console.log("Error in handleBuy", error.message)
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message)
      }
      else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };


  return (
    <div className='min-h-[80vh] text-center pt-14 mb-8'>

      <button className='border border-gray-400 px-10 py-2 rounded-full mb-6'>Our plans</button>

      <h1 className='text-center text-2xl md:text-3xl lg:text-4xl  font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent mb-6 sm:mb-10'>Choose the plan that's right for you</h1>

      {/* plan */}

      <div className='flex flex-wrap justify-center gap-6 items-center text-left'>
        {plans.map((item, index) => (
          <div className='bg-white drop-shadow-sm border  rounded-lg py-12 px-8 text-gray-700 hover:scale-105 transition-all duration-500 ' key={index}>
            <img src={assets.logo_icon} alt="" width={30} />
            <p className='mt-3 font-semibold text-lg'>{item.id}</p>
            <p>{item.desc}</p>
            <p className='mt-6'>
              <span className='text-3xl font-medium'>₹{item.price}</span>/{item.credits}credits
            </p>
            <button className='w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52' onClick={() => handleBuy(item.id)}>Purchase</button>

          </div>
        ))}
      </div>


    </div>
  )
}

export default BuyCredit