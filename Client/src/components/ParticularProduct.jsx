import axios from 'axios';
import React, {
    useEffect,
    useState
} from 'react'
import {
    useParams
} from 'react-router-dom';
import Recommended from './Recommended';


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
        <> {/* Boc */}
            <div className=" flex flex-col justify-center items-center h-screen">

                <div className="overflow-auto grid mt-0 grid-flow-row lg:grid-flow-col items-center align-middle lg:grid-cols-2 w-fit   p-6 round-xl shadow-md shadow-slate-400">
                    <div className="relative justify-center place-content-center">
                        <img className='lg:w-fit lg:h-[500px] h-64'
                            src={
                                `http://localhost:8080/api/v1/product/get-product-image/${
                                    product._id
                                }`
                            }
                            alt=""/>
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
                        <button className='mx-3 mt-5 bg-blue-500 p-2 w-full text-white'>Add to Cart</button>

                    </div>
                </div>
            </div>


            {/* Recommended Products Page */}
            <div className="">
                <h3 className="text-center text-4xl">Recommended</h3>
                <Recommended/>
            </div>


        </>
    )
}

export default ParticularProduct
