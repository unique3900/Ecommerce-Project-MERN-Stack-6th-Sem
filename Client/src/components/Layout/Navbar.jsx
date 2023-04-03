import React from 'react';
import { Link } from "react-router-dom";
import logo from '../../assets/logos/logo.png';
import { FaSearch } from 'react-icons/fa';
import { AiOutlineShoppingCart } from 'react-icons/ai';
const Navbar = () => {
  return (
    <div className='flex lg:justify-between sm:justify-evenly gap-8 bg-[#2874f0] px-4 py-2 items-center flex-1'>
      
          {/* Logo */}
          <div className="logo">
             <Link to="home"> <img src={logo} className=' h-7 w-full lg:h-14' alt="" /></Link>
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
              <Link to="home" className='underline'>Home</Link>
              {/* <Link to="category">Category</Link> */}
              <select name="navSelectCategory" className='bg-transparent' placeholder='Category' id="">
                     <option selected disabled className='text-black'>Category</option>
                      <option value="Electronics" className='text-black'>Electronics</option>
                      <option value="Electronics" className='text-black'>Sneakers</option>
                      <option value="Electronics" className='text-black'>Mens</option>
                      <option value="Electronics" className='text-black'>Womens</option>
                </select>
              <Link to="register" className='font-semibold'>Register</Link>
              <Link to="login" className='font-semibold'>Login</Link>
              <div className="cart relative ">
                  <Link to="carts" className='cursor-pointer'><AiOutlineShoppingCart className='w-10  h-10 text-lg relative' /></Link>
                  <a href="#" className='absolute  bg-[#ff1e12] rounded-full top-0 right-0 text-[15px] font-bold px-[3px] '>10</a>
              </div>
          </div>

    </div>
  )
}

export default Navbar
