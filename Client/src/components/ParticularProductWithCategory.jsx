import axios from 'axios';
import React, {
    useEffect
} from 'react'
import {
    useState
} from 'react'
import {
    useParams
} from 'react-router-dom';
import {
    toast
} from 'react-toastify';
import { BiErrorAlt } from 'react-icons/bi';


const ParticularProductWithCategory = () => {
    const params = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProductUsingCategory();
    }, [params.slug])
    const getProductUsingCategory = async () => {
        try {
            const {
                data
            } = await axios.get(`http://localhost:8080/api/v1/product/get-product-categorywise/${
                params.slug
            }`);

            setProducts(data.product);
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div>
            <h4 className="text-center mt-4">Total {products.length} Products Found</h4>
            {
            
            products.length > 0 ? products.map((item, index) => {
                
                return (
                    <div key={index}>
                       
                        <div className=" flex gap-9 flex-row flex-wrap justify-center items-center h-fit">

                            <div className="overflow-auto grid mt-0 grid-flow-row lg:grid-flow-col items-center align-middle lg:grid-cols-2 p-6 round-xl shadow-md shadow-slate-400">
                                <div className="relative justify-center place-content-center">
                                    <img className='lg:w-fit lg:h-[500px] h-64'
                                        src={
                                            `http://localhost:8080/api/v1/product/get-product-image/${
                                                item._id
                                            }`
                                        }
                                        alt=""/>
                                </div>
                                <div className="">
                                    <h1 className='text-center text-4xl lg:text-6xl py-5 '>
                                        {
                                        item.name
                                    }</h1>

                                    <div className="form grid grid-flow-row  gap-2  mt-5 px-4">

                                        <p className="text-gray-400 text-center">
                                            {
                                            item.description
                                        }</p>

                                        <p className="text-red-500 font-bold text-3xl p-2">NPR {
                                            item.price
                                        }/-</p>
                                    </div>
                                    <button className='mx-3 mt-5 bg-blue-500 p-2 w-full text-white'>Add to Cart</button>

                                </div>
                            </div>
                        </div>

                                        <hr />
                    </div>
                    

                )
            }) : <div className="flex flex-col gap-3 align-middle justify-center">
                       
                        <h3 className='text-center bg-red-600 px-5 py-5 text-white font-bold'>Sorry,No product Found For This Category</h3>
            </div> 
        } </div>
    )
}

export default ParticularProductWithCategory
