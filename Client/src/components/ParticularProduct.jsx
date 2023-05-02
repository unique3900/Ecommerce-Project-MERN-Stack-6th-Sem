import axios from 'axios';
import React, {
    useEffect,
    useState
} from 'react'
import {
    useParams
} from 'react-router-dom';


const ParticularProduct = () => {
    const params = useParams();
    const [product, setProduct] = useState([]);
    const [name, setSelectedName] = useState("");
    const [description, setSelectedDesc] = useState("");
    const [price, setSelectedPrice] = useState("");
    const [quantity, setSelectedQuantity] = useState("");
    const [photo, setPhoto] = useState("");
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [id, setId] = useState("");

    const particularProduct = async () => {
        try {
            const {
                data
            } = await axios.get(`http://localhost:8080/api/v1/product/get-one-product/${
                params.slug
            }`);
            console.log(data);
            setProduct(data.product);
            setId(data.product._id);
            setSelectedName(data.product.name);
            setSelectedDesc(data.product.description);
            setSelectedPrice(data.product.price);
            setSelectedQuantity(data.product.quantity);
            setPhoto(data.product.image);
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        particularProduct();
    }, [])

    return (
        <div className='flex flex-col justify-center items-center h-screen bg-slate-300 '>
            {/* <h1 className="text-4xl text-center">Buy Now</h1> */}
            <div className=" grid grid-col grid-cols-40/60 shadow-md bg-white">
                <div className="h-full">
                    <img src={
                            `http://localhost:8080/api/v1/product/get-product-image/${
                                product._id
                            }`
                        }
                        alt=""/>
                </div>
                <div className="relative flex flex-col gap-4">
                    <div className="px-4 py-3">
                        <h1 className='text-center text-3xl '>
                            {
                            product.name
                        }</h1>

                        <h3 className="text-gray-400">
                            {
                            product.description
                }</h3>
              
              <div className="mt-10">
                <div className="flex flex-col lg:flex-row justify-around">
                <p className=" text-red font-bold">NRS {product.price }</p>
              <button className="bg-blue-500 px-2 py-1 text-white">Add To Cart</button>
                </div>
               
              </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default ParticularProduct
