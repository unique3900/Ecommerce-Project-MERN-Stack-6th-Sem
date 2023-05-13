import axios from 'axios';
import React, {
    useEffect,
    useState
} from 'react'
import {
    Link,
    useParams
} from 'react-router-dom';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography
} from "@material-tailwind/react";

import ReactImageMagnify from 'react-image-magnify';
import { useCart } from './Context-State/cartContext';
import { toast } from 'react-toastify';

// import CategoryHook from './../Global/CategoryHook';

const ParticularProduct = () => {
    const [cart, setCart] = useCart();
    const params = useParams();
    const [product, setProduct] = useState([]);
    const [recommended, setRecommended] = useState([]);


    useEffect(() => {
        particularProduct();

    }, [params ?. slug]);

    const particularProduct = async () => {
        try {
            const {
                data
            } = await axios.get(`http://localhost:8080/api/v1/product/get-one-product/${
                params.slug
            }`);
            console.log(data);

            setProduct(data.product);
            getRecommendeds(data.product._id, data.product.category._id)


            // console.log(id)
        } catch (error) {
            console.log(error);
        }

    }


    const getRecommendeds = async (pid, cid) => {
        try {
            const {
                data
            } = await axios.get(`http://localhost:8080/api/v1/product/similar-products/${pid}/${cid}`);
            setRecommended(data.product);
            console.log(recommended);
        } catch (error) {
            console.log(error)
        }

    }


    return (
        <> {/* Boc */}
            <div className=" flex flex-col justify-center items-center h-screen">

                <div className="overflow-auto grid mt-0 grid-flow-row lg:grid-flow-col items-center align-middle lg:grid-cols-2 w-fit   p-6 round-xl shadow-md shadow-slate-400">
                    <div className="relative justify-center place-content-center">

                        <ReactImageMagnify enlargedImagePosition='beside'
                            isEnlargedImagePortalEnabledForTouch={false}
                            className='flex flex-col'
                            {...{
                                                                smallImage: {
                                                                    alt: 'Wristwatch by Ted Baker London',
                                                                    isFluidWidth: true,
                                                                    src: `http://localhost:8080/api/v1/product/get-product-image/${
                                                                        product._id
                                                                    }`
                                                                },
                                                                largeImage: {
                                                                    src: `http://localhost:8080/api/v1/product/get-product-image/${
                                                                        product._id
                                                                    }`,
                                                                    width: 1200,
                                                                    height: 1800
                                                                }
                                                            }}/>

                    </div>
                    <div className="">
                        <h1 className='text-center text-4xl lg:text-6xl py-5 '>
                            {
                            product.name
                        }</h1>

                        <div className="form grid grid-flow-row  gap-2  mt-5 px-4">

                            <p className="text-gray-400 text-center">
                                {
                                product.description
                            }</p>

                            <p className="text-red-500 font-bold text-3xl p-2">NPR {
                                product.price
                            }/-</p>
                        </div>
                        <button onClick={() => {
                            setCart([...cart, product]);
                            localStorage.setItem('cartItems',JSON.stringify([...cart,product]))
                            toast.success("Product Added to Cart")
                        }} className='mx-3 mt-5 bg-blue-500 p-2 w-full text-white'>Add to Cart</button>

                    </div>
                </div>
            </div>


            {/* Recommended Products Page */}
            <div className="mt-5 ">
                <h3 className="text-center text-4xl">You May Also Like</h3>


            </div>


            {/* ===== Recommended Products====== */}

            <div className="grid  grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mt-5 px-5">
                {
                recommended.map((item,index)=>{
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
                                        item.category.name
                                    }
                                 </p>

                            </CardHeader>
                            <Link to={
                                    `/home/product/${
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
                                    <button onClick={() => {
                                        setCart([...cart, item]);
                                        localStorage.setItem('cartItems',JSON.stringify([...cart,item]))
                                         toast.success("Product Added to Cart")
                                    }} className="bg-blue-500 px-3 py-2 text-white rounded-sm">Add to Cart</button>
                                </Typography>

                            </CardFooter>
                        </Card>
                    )
                })
            } </div>


        </>
    )
}

export default ParticularProduct
