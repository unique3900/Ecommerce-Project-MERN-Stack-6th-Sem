import React, {
    useEffect,
    useState
} from 'react';
import {
    Link,
    useNavigate
} from "react-router-dom";
import logo from '../../assets/logos/logo.png';
import {
    FaSearch
} from 'react-icons/fa';
import {
    FiLogOut
} from 'react-icons/fi';
import {
    AiOutlineShoppingCart
} from 'react-icons/ai';
import {
    useAuth
} from '../Context-State/auth';
import {
    toast
} from 'react-toastify';
import {
    Select
} from 'antd';
import CategoryHook from '../../Global/CategoryHook';
import axios from 'axios';
import SearchBoxNav from '../SubComponents/SearchBoxNav';

const {
    Option
} = Select;
const Navbar = () => {

    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();
    const [username, setUsername] = useState();

    const [category, setCategory] = useState("");
    const [products, setProducts] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadioPrice] = useState([100, 999999]);
    const LogCheck = localStorage.getItem("auth");

    const parsedLogCheck = JSON.parse(LogCheck);
    if (parsedLogCheck) { // setUsername(parsedLogCheck.user.name.split(" ")[0]) ;
    }


    const categories = CategoryHook();


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
            const {
                data
            } = await axios.post("http://localhost:8080/api/v1/product/filter-product-by-category", {
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
                <Link to="home">
                    <img src={logo}
                        className=' md:flex lg:flex h-7 w-full lg:h-14'
                        alt=""/></Link>
            </div>

            {/* Middle */}
            <SearchBoxNav/> {/* Right */}
            <div className='flex  items-center text-white gap-3'>
                <Link to="home" className='underline'>Home</Link>
                {/* <Link to="category">Category</Link> */}

                <select onChange={
                        (value) => {
                            setCategory(value)
                        }
                    }
                    
                    name="navSelectCategory"
                    className=' md:flex lg:flex bg-transparent text-black '
                    placeholder='Category'
                    id="">
                    {
                    categories.map((item, index) => {
                        return (
                          <option key={index} value={item.name}>
                            <Link to={`/category/${item.slug}`}>{ item.name}</Link>
          
                            </option>


                        )
                    })
                } </select>

                {
                !auth || ! parsedLogCheck ? <>
                    <Link to="register" className='font-semibold'>Register</Link>
                    <Link to="login" className='font-semibold'>Login</Link>

                </> : parsedLogCheck ? <>
                    <Link to={
                            `dashboard/${
                                auth ?. user ?. designation === 1 ? "admin" : "user"
                            }`
                        }
                        className='font-bold capitalize '>Hi,{
                        parsedLogCheck.user.name.split(" ")[0]
                    }</Link>
                    <div className="group flex relative">
                        <FiLogOut className='w-10 h-8 font-bold cursor-pointer'
                            onClick={
                                (e) => handleLogout(e)
                            }/>
                        <span className="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-sm text-gray-100 rounded-md absolute left-1/2
                                        -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto">Logout</span>
                    </div>
                </> : ""
            }

                <div className="cart relative ">
                    <Link to="carts" className='cursor-pointer'><AiOutlineShoppingCart className='w-10  h-10 text-lg relative'/></Link>
                    <a href="#" className='absolute  bg-[#ff1e12] rounded-full top-0 right-0 text-[15px] font-bold px-[3px] '>10</a>
                </div>
            </div>

        </div>
    )
}

export default Navbar
