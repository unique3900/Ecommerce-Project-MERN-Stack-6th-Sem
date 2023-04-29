import React, {
    useEffect,
    useState
} from 'react'

import axios from 'axios';
import {
    toast
} from 'react-toastify';

const ListProducts = () => {

    const [products, setProducts] = useState([]);

    const getAllProducts = async () => {
        const {
            data
        } = await axios.get("http://localhost:8080/api/v1/product/get-product");
        if (data.success) {
            setProducts(data.productFetch);
            
        }

    }
    useEffect(() => {
        getAllProducts();
    }, [])

    return (
        <div className='mt-5 w-full relative shadow-md sm:rounded-lg flex flex-col justify-center place-items-center overflow-x-auto'>
            <h1 className='text-4xl text-center font-bold'>List Products</h1>
            <table className='w-3/4 text-xs lg:text-sm text-center text-gray-500  dark:text-gray-400 overflow-x-auto'>
                <thead className=' text-sm lg:text-xs  text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 '>

                    <tr className=''>
                        <th className='px-6 py-3'>SN</th>
                        <th className='px-6 py-3'>Name</th>
                        <th className='px-6 py-3'>Description</th>
                        <th className='px-6 py-3'>Price</th>
                        <th className='px-6 py-3'>Quantity</th>
                        <th className='px-6 py-3'>Action</th>
                    </tr>
                </thead>
                 {
                    products.map((item,count=0) => {
                        return (
                            <tbody key={item._id} className=''>
                            <tr className='bg-white border-b dark:bg-gray-900 dark:border-gray-700'>
                                    <td>{count + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.description }</td>
                                    <td>{item.price }</td>
                                    <td>{item.quantity }</td>
                                    <td><div className="flex flex-col lg:flex-row gap-2 justify-center align-middle items-center">
                                        <button className="bg-green-500 text-white px-2 py-1 rounded-sm w-full lg:w-fit">Edit</button>
                                        <button className="bg-red-500 text-white px-2 py-1 rounded-sm w-full lg:w-fit">Delete</button>
                                    
                                    </div></td>
                                </tr>
                            </tbody>
                        )
                       
                    })
                } 


            </table>
        </div>
    )
}

export default ListProducts
