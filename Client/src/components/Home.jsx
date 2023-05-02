import React, {
    useEffect,
    useState
} from 'react'
import {
    useAuth
} from './Context-State/auth'
import Hero from './Layout/Hero';
import {
    toast
} from 'react-toastify';
import axios from 'axios';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography
} from "@material-tailwind/react";
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();
    const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
    const LogCheck = localStorage.getItem("auth");
    const parsedLogCheck = JSON.parse(LogCheck);

    const getAllProducts = async () => {
        const {
            data
        } = await axios.get("http://localhost:8080/api/v1/product/get-product");
        if (data.success) {
            setProducts(data.productFetch);
            console.log(data);
        }

    }

    const getAllCategory = async () => {
        try {
            const {
                data
            } = await axios.get("http://localhost:8080/api/v1/category/get-category");
            if (data.success) {
                setCategories(data.getAllCategory);
            }
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        if (! parsedLogCheck) {
            toast.error("Logged in as Guest");
        }
      getAllProducts();
      getAllCategory();
    }, [])

    const handleFilterCategory=(name)=>{
        console.log(name);
    }


    return (
        <div title='Parashar Shop-Safe Secure Reliable' className='px-3'>
            <Hero/>
            <hr/>
            <div className="mt-5 grid gap-3 grid-flow-row lg:grid-cols-20/80">
                <div>
                    <h1 className='text-4xl font-bold text-center'>Categories</h1>
            <div className="flex flex-row flex-wrap text-center justify-evenly lg:flex-col gap-1">
              {
                categories.map((item) => {
                  return (
                    //   <button type='text' value={item.name} readOnly key={item._id} className='bg-zinc-400 rounded-lg mt-2 hover:bg-blue-500 ease-in transition duration-300 text-white px-3 py-1 cursor-pointer'></input>
                      <button key={item._id} className='bg-zinc-400 rounded-lg mt-2 hover:bg-blue-500 ease-in transition duration-300 text-white px-3 py-1 cursor-pointer' value={item.name} onClick={(e)=>{handleFilterCategory(e.target.value)}}>{item.name}</button>
                  )
                })
              }
                    </div>
                </div>
                <div>
                    <h1 className='text-4xl font-bold text-center'>Latest Products</h1>
                    <div className="overflow-x-auto grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mt-5">


                        {

                        products.slice(0, 10).map((item) => {

                            return (
                                <Link to={`product/${item.slug}`} key={item._id}>
                                <Card className="w-96"
                                    key={
                                        item._id
                                    } >
                                    <CardHeader color="blue" className="relative h-56">
                                        <img src={
                                                `http://localhost:8080/api/v1/product/get-product-image/${
                                                    item._id
                                                }`
                                            }
                                            alt="img-blur-shadow"
                                            className="h-full w-full"/>
                                    </CardHeader>
                                    <CardBody className="text-center">
                                        <Typography variant="h5" className="mb-2">
                                            {
                                            item.name
                                        } </Typography>
                                        <Typography> {
                                                item.description.length>40?item.description.slice(0,40)+"......Read More" :item.description
                                                
                                        } </Typography>
                                    </CardBody>
                                    <CardFooter divider className="flex items-center justify-between py-3">
                                        <div className="flex flex-col">
                                            <Typography variant="small">Nrs. {
                                                item.price
                                            }</Typography>
                                            <Typography variant="small">
                                                {
                                                item.quantity
                                            }
                                                pcs</Typography>

                                        </div>
                                        <Typography variant="small">
                                            <button className="bg-blue-500 px-3 py-2 text-white rounded-sm">Add to Cart</button>
                                        </Typography>

                                    </CardFooter>
                                    </Card>
                                    </Link>
                            )
                        })
                    } </div>
                </div>

            </div>
        </div>
    )
}

export default Home
