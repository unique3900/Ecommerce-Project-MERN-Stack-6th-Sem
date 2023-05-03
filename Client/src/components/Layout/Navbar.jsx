import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/logos/logo.png';
import { FaSearch } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useAuth } from '../Context-State/auth';
import { toast } from 'react-toastify';
import { Select } from 'antd';
import axios from 'axios';

const { Option } = Select;
const Navbar = () => {

  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [username, setUsername] = useState();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [products, setProducts] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadioPrice] = useState([100,999999]);
  const LogCheck = localStorage.getItem("auth");

  const parsedLogCheck = JSON.parse(LogCheck);
  if (parsedLogCheck) {
    // setUsername(parsedLogCheck.user.name.split(" ")[0]) ;
  }

  const getAllCategory = async () => {
    try {
        const {data} = await axios.get("http://localhost:8080/api/v1/category/get-category");
    if (data.success) {
        setCategories(data.getAllCategory);
      }
    else {
      toast.error("Couldnot Fetch Category")
      }
    } catch (error) {
        console.log(error)
    }
    
  }
  useEffect(() => {
    getAllCategory();
  }, [])
  
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



  const getAllProducts = async () => {
    try {
        const {
            data
        } = await axios.get("http://localhost:8080/api/v1/product/get-product");
        if (data.success) {
            setProducts(data.productFetch);
            
        }
    } catch (error) {
        console.log(error)
    }


}


const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
}


const filterProduct = async () => {
    try {
        const { data } = await axios.post("http://localhost:8080/api/v1/product/filter-product-by-category", {
      category
        });
      console.log(data.products);
        setProducts(data.products);
      } catch (error) {
        console.log(error);
      }
}



  return (
    <div className='flex flex-wrap lg:flex-nowrap justify-center z-1 lg:justify-between  w-full gap-8 bg-[#2874f0] px-4 py-2 items-center flex-1'>
      
          {/* Logo */}
          <div className="logo">
             <Link to="home"> <img src={logo} className=' md:flex lg:flex h-7 w-full lg:h-14' alt="" /></Link>
          </div>
          
          {/* Middle */}
          <div className=' px-2 w-fit lg:w-3/5 relative lg:flex items-center'>
              <input type="search" name="navSearch" className=' outline-0 py-1 px-3 rounded-full flex-1' placeholder='Search....' id="" />
              <div  className='bg-[#ffc220] p-1.5 rounded-full absolute bottom-0.5  right-5 ' >
              <FaSearch className='text-black'/>
              </div>
          </div>

          {/* Right */}
          <div className='flex  items-center text-white gap-3'>
              <Link to="home" className='underline'>Home</Link>
              {/* <Link to="category">Category</Link> */}

        <Select   onChange={(value) => {setCategory(value)}} showSearch name="navSelectCategory" className='hidden md:flex lg:flex bg-transparent text-black ' placeholder='Category' id="">
          {
            categories.map((item) => {
              return (
                <Option className="bg-transparent" key={item._id} value={item._id}>{item.name}</Option>
              )
            })
                   }
                  </Select>
                  
        {
          !auth||!parsedLogCheck ? <>
                        <Link to="register" className='font-semibold'>Register</Link>
                        <Link to="login" className='font-semibold'>Login</Link>
          
          </> : parsedLogCheck ? <>
              <Link to={`dashboard/${auth?.user?.designation===1?"admin":"user"}`} className='font-bold capitalize '>Hi,{ parsedLogCheck.user.name.split(" ")[0]}</Link>
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
