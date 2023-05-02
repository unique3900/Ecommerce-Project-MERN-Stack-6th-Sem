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
import {
    Radio
} from 'antd';
import {
    Link,
    useNavigate
} from 'react-router-dom';
import {
    prices
} from './Pricing';
import { Checkbox } from 'antd';

const Home = () => {
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadioPrice] = useState([]);


    const LogCheck = localStorage.getItem("auth");
    const parsedLogCheck = JSON.parse(LogCheck);



    useEffect(() => {
        getAllCategory();
        if (!parsedLogCheck) {
            toast.error("Logged in as Guest");
        }
    }, []);

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
            const { data } = await axios.post("http://localhost:8080/api/v1/product/filter-product", {
              checked,
              radio,
            });
            console.log(data.products)
            setProducts(data.products);
          } catch (error) {
            console.log(error);
          }
    }

    
    useEffect(() => {
        if (!checked.length || !radio.length) getAllProducts();
      }, [checked.length, radio.length]);
    
      useEffect(() => {
        if (checked.length || radio.length) filterProduct();
      }, [checked, radio]);




    
    

   




    return (
        <div title='Parashar Shop-Safe Secure Reliable' className='px-3'>
            <Hero/>
            <hr />
            {
                <h1>{ JSON.stringify(checked )  }</h1>
            }
            <div className="mt-5 grid gap-3 grid-flow-row lg:grid-cols-20/80">
                <div className='flex flex-col gap-4'>
                    <div className="">
                        <h1 className='text-4xl font-bold text-center'>Price Range</h1>
                        <div className="flex flex-row flex-wrap text-center justify-evenly lg:flex-col gap-1">
                            <Radio.Group className='flex lg:flex-col mt-4 gap-3' onChange={(e) => setRadioPrice(e.target.value)}>
                                {
                                prices.map((item) => {
                                    return (
                                        <div className="flex flex-row gap-10"
                                            key={
                                                item._id
                                        }>
                                            <Radio value={
                                                item.array
                                            }>
                                                {
                                                item.name
                                            }</Radio>
                                        </div>
                                    )

                                })
                            } </Radio.Group>
                        </div>


                        <h1 className='text-4xl font-bold text-center'>Categories</h1>
                        <div className="flex flex-row flex-wrap lg:flex-col gap-1">
                            {
                            categories.map((item) => {
                                return (
                                    <div className="flex flex-row flex-wrap text-center justify-evenly lg:flex-col gap-1" key={
                                        item._id
                                    }>
                                             <Checkbox 
                                        className='bg-zinc-200 rounded-lg mt-2 hover:bg-blue-500 ease-in transition duration-300 text-black px-3 py-1 cursor-pointer'
                                        
                                        onChange={
                                            (e) => {
                                                handleFilter(e.target.checked, item._id);
                                                
                                            }
                                    }>
                                        {
                                        item.name
                                    }</Checkbox>
                                    </div>
                                   
                                )
                            })
                        } </div>
                    </div>

                </div>


                <div>
                    <h1 className='text-4xl font-bold text-center'>Latest Products</h1>
                    <div className="overflow-x-auto grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mt-5">


                        {

                        products.map((item) => {

                            return (

                                <Card className="w-96"
                                    key={
                                        item._id
                                }>
                                    <CardHeader color="blue" className="relative h-56">
                                        <img src={
                                                `http://localhost:8080/api/v1/product/get-product-image/${
                                                    item._id
                                                }`
                                            }
                                            alt="img-blur-shadow"
                                            className="h-full w-full"/>
                                    </CardHeader>
                                    <Link to={
                                            `product/${
                                                item.slug
                                            }`
                                        }
                                        key={
                                            item._id
                                    }>
                                        <CardBody className="text-center">
                                            <Typography variant="h5" className="mb-2">
                                                {
                                                item.name
                                            } </Typography>
                                            <Typography> {
                                                item.description.length > 40 ? item.description.slice(0, 40) + "...........Read More" : item.description
                                            } </Typography>
                                        </CardBody>
                                    </Link>
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

                            )
                        })
                    } </div>
                </div>

            </div>
        </div>
    )
}

export default Home
