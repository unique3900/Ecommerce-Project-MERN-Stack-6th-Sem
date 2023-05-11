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
import {
    Checkbox
} from 'antd';


const Home = () => {
    const [auth, setAuth] = useAuth();

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadioPrice] = useState([]);
    const [totalProduct, setTotalProduct] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const LogCheck = localStorage.getItem("auth");
    const parsedLogCheck = JSON.parse(LogCheck);

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
        getAllCategory();
        totalP();
        if (! parsedLogCheck) {
            toast.error("Logged in as Guest");
        }
    }, []);

    useEffect(() => {
        getAllProducts();
    }, [])

    const getAllProducts = async () => {
        try {
            setLoading(true);
            const {
                data
            } = await axios.get(`http://localhost:8080/api/v1/product/product-listing/${page}`);
            setLoading(false);
            setProducts(data.products);
        } catch (error) {
            setLoading(true);
            console.log(error)
        }


    }


    const totalP = async () => {
        try {
            const {
                data
            } = await axios.get("http://localhost:8080/api/v1/product/count-product");
            if (data) {
                setTotalProduct(data.totalCount);
            } else {
                toast.error("Set totel error")
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (page === 1) 
            return;
        

        loadMoreProducts();
    }, [page]);

    const loadMoreProducts = async () => {
        try {
            setLoading(true);
            const {
                data
            } = await axios.get(`http://localhost:8080/api/v1/product/product-listing/${page}`);
            setLoading(false);
            setProducts([
                ...products,
                ...data ?. products
            ]);
        } catch (error) {
            setLoading(false);
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

    useEffect(() => {
        if (!checked.length || !radio.length) 
            getAllProducts();
        

    }, [checked.length, radio.length]);

    useEffect(() => {
        if (checked.length || radio.length) 
            filterProduct();
        

    }, [checked, radio]);

    const filterProduct = async () => {
        try {
            const {
                data
            } = await axios.post("http://localhost:8080/api/v1/product/filter-product", {
                checked,
                radio
            });
            console.log(data.products)
            setProducts(data.products);
        } catch (error) {
            console.log(error);
        }
    }

    const handleResetFilter = async () => {
        setChecked([]);
        setRadioPrice([100, 9999]);
        window.location.reload(false);
    }


    return (
        <div title='Parashar Shop-Safe Secure Reliable' className='px-3'>
            <Hero/>
            <hr/>
            <div className="mt-5 grid gap-3 grid-flow-row lg:grid-cols-20/80">
                <div className='flex flex-col gap-4'>
                    <div className="flex justify-center">
                        <button className=" bg-slate-950 text-white rounded-md py-3 w-full"
                            onClick={handleResetFilter}>Reset Filter</button>
                    </div>
                    <div className="">
                        <h1 className='text-4xl font-bold text-center'>Price Range</h1>
                        <div className="flex flex-row flex-wrap text-center justify-evenly lg:flex-col gap-1">
                            <Radio.Group className='flex lg:flex-col mt-4 gap-3'
                                onChange={
                                    (e) => setRadioPrice(e.target.value)
                            }>
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
                                    <div className="flex flex-row flex-wrap text-center justify-evenly lg:flex-col gap-1"
                                        key={
                                            item._id
                                    }>
                                        <Checkbox className='bg-zinc-200 rounded-lg mt-2 hover:bg-blue-500 ease-in transition duration-300 text-black px-3 py-1 cursor-pointer'

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


                <div className=''>
                    <h1 className='text-4xl font-bold text-center'>Products We Offer</h1>

                    <div className="overflow-x-clip grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mt-5">


                        {

                        products.map((item, index) => {

                            return (

                                <Card className="relative w-96 cursor-grab hover:scale-105 transition-all duration-50"
                                    key={index}>
                                    <CardHeader color="blue" className="relative h-56">


                                        <img src={
                                                `http://localhost:8080/api/v1/product/get-product-image/${
                                                    item._id
                                                }`
                                            }
                                            alt="img-blur-shadow"
                                            className="h-full object-cover w-full"/> 
                                        <p className="absolute top-2 text-sm right-3 rounded-full text-white bg-red-500 px-3 py-1">
                                            {
                                            categories.map((e) => {
                                                return (
                                                    <span className=""
                                                        key={
                                                            e._id
                                                    }>
                                                        {
                                                        e._id === item.category ? e.name : ""
                                                    } </span>
                                                )
                                            })
                                        } </p>

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
                                        <div className="flex justify-around flex-col">
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

                    {/* <div className="flex justify-between px-3">
                        
                        {
                            page==1? <button className='bg-gray-500 text-white px-2 py-2' disabled>Previous</button>:<button className='bg-black text-white px-2 py-2' onClick={()=>setPage(page-1)}>Previous</button>
                        }

                        
{
                            page>=totalProduct/5? <button className='bg-gray-500 text-white px-2 py-2' disabled>Next</button>:<button className='bg-black text-white px-2 py-2' onClick={()=>setPage(page+1)}>Next</button>
                        }
                        
                  </div> */}
                    {
                    checked.length <= 0 && radio.length <= 0 && (
                        <div className="flex justify-center px-3">
                            {
                            products && products.length < totalProduct && (
                                <button onClick={
                                        (e) => {
                                            e.preventDefault();
                                            setPage(page + 1);

                                        }
                                    }
                                    className='bg-transparent text-blue-500 underline mt-3 px-2 py-2'>
                                    {
                                    loading ? "......Loading" : products.length <= totalProduct ? "Show More Items" : "No more Items to Fetch"
                                }</button>
                            )
                        } </div>
                    )
                } </div>

            </div>
        </div>
    )
}

export default Home
