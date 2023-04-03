import React from 'react';

import logo from '../../assets/logos/logo.png';
import { FaSearch } from 'react-icons/fa';
import { AiOutlineShoppingCart } from 'react-icons/ai';
const Navbar = () => {
  return (
    <div className='flex lg:justify-between sm:justify-evenly gap-8 bg-[#2874f0] px-4 py-2 items-center flex-1'>
      
          {/* Logo */}
          <div className="logo">
              <img src={logo} className=' h-7 w-full lg:h-14     ' alt="" />
          </div>
          
          {/* Middle */}
          <div className='hidden px-2 w-3/5 relative lg:flex items-center'>
              <input type="search" name="navSearch" className='outline-0 py-1 px-3 rounded-full flex-1' placeholder='Search....' id="" />
              <div  className='bg-[#ffc220] p-1.5 rounded-full absolute  right-5 ' >
              <FaSearch className='text-black'/>
              </div>
          </div>

          {/* Right */}
          <div className='flex items-center text-white gap-3'>
              <a href="#" className='underline'>Home</a>
              <a href="#">Category</a>
              <a href="#" className='font-semibold'>Register</a>
              <a href="#" className='font-semibold'>Login</a>
              <div className="cart relative">
                  <a href="#"><AiOutlineShoppingCart className='w-10 h-10 text-lg relative' /></a>
                  <a href="#" className='absolute bg-[#ff1e12] rounded-full top-0 right-0 text-[15px] font-bold px-[3px] '>10</a>
              </div>
          </div>

    </div>
  )
}

export default Navbar
