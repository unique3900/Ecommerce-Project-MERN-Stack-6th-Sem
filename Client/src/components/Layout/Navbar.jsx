import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/logos/logo.png';
import { FaSearch } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useAuth } from '../Context-State/auth';
import { toast } from 'react-toastify';
const Navbar = () => {

  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  const LogCheck = localStorage.getItem("auth");
    const parsedLogCheck = JSON.parse(LogCheck);
  const handleLogout = (e) => {
    e.preventDefault();
    console.log("Logout")
    setAuth({
      ...auth,
      user: null,
      token: ""
    });
    localStorage.removeItem("auth");
    toast.success("User Logged Out")
    navigate('/login');
  }
  return (
    <div className='flex z-1 lg:justify-between sm:justify-evenly gap-8 bg-[#2874f0] px-4 py-2 items-center flex-1'>
      
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
                    <option  disabled className='text-black'>Category</option>
                      <option value="Electronics" className='text-black'>Electronics</option>
                      <option value="Electronics" className='text-black'>Sneakers</option>
                      <option value="Electronics" className='text-black'>Mens</option>
                      <option value="Electronics" className='text-black'>Womens</option>
                  </select>
                  
        {
          !auth||!parsedLogCheck ? <>
                        <Link to="register" className='font-semibold'>Register</Link>
                        <Link to="login" className='font-semibold'>Login</Link>
          
          </> :parsedLogCheck?<>
          <div className="group flex relative">
          <FiLogOut className='w-10 h-8 font-bold cursor-pointer' onClick={(e)=>handleLogout(e)}/>
           <span className="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-sm text-gray-100 rounded-md absolute left-1/2 
            -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto" >Logout</span>
          </div>
          </>:""
        }

              <div className="cart relative ">
                  <Link to="carts" className='cursor-pointer'><AiOutlineShoppingCart className='w-10  h-10 text-lg relative' /></Link>
                  <a href="#" className='absolute  bg-[#ff1e12] rounded-full top-0 right-0 text-[15px] font-bold px-[3px] '>10</a>
              </div>
          </div>

    </div>
  )
}

export default Navbar
