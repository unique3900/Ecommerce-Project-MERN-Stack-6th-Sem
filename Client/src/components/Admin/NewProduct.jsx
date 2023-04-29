import React, {
  useEffect,
  useState
} from 'react';

import { toast } from 'react-toastify';
import { Select } from 'antd';
import axios from 'axios';
const {Option} = Select;


const NewProduct = () => {
    const [name, setName] = useState("");
    const [Description, setDescription] = useState("");
    const [Price, setPrice] = useState(0);
  const [Quantity, setQuantity] = useState(0);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");


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
  

    const handleSubmit = async () => {
      if (!name || !Description || !Price || !Quantity) {
        toast.error("Please Fill Out Every Fields");
        }
    }
    return (
        <div>
            <div className="flex flex-col justify-center items-center h-screen">

                <div className=" grid mt-0 grid-flow-row lg:grid-flow-col items-center align-middle lg:grid-cols-2 w-fit  bg-slate-50 p-6 round-xl shadow-md shadow-slate-400">
                    <div className="relative justify-center place-content-center">
                        <img className='lg:w-fit' src="https://myrepublica.nagariknetwork.com/uploads/media/ecommerce_20210523102303.jpg" alt=""/>
                    </div>
                    <div className="px-3">
                        <h1 className='text-center text-4xl lg:text-6xl py-5 '>New Product</h1>

                        <div className="inputBox">
                            <label htmlFor="category">Product Name</label>
                            <input type="text"
                                value={name}
                                onChange={
                                    (e) => setName(e.target.value)
                                }
                                name="productName"
                                placeholder='Enter Product Name'
                                className='w-full mt-1 p-2 outline-8'
                                id=""/>
                        </div>
                        <div className="inputBox">
                            <label htmlFor="category">Product Description</label>
                            <textarea value={Description}
                                onChange={
                                    (e) => setDescription(e.target.value)
                                }
                                rows="4"
                                cols="50"
                                type="text"
                                name="productDesc"
                                placeholder='Enter Product Description'
                                className='w-full mt-1 p-2 outline-8'
                                id=""/>
              </div>
              
              <div className="inputBox">
                <label htmlFor="productCategory">Product Category</label>
           
                <Select onChange={(value) => setCategory(value)} className='w-full' placeholder="Select Product Category" showSearch>
                  {
                    categories.map((item) => {
                      return (
                        <Option key={item._id} value={item.name}>{item.name}</Option>
                      )
                     
                    })
                  }
=
                  
                </Select>
              </div>

                        <div className="inputBox">
                            <label htmlFor="category">Product Price</label>
                            <input type="number"
                                value={Price}
                                onChange={
                                    (e) => setPrice(e.target.value)
                                }
                                name="productPrice"
                                placeholder='Enter Product Price'
                                className='w-full mt-1 p-2 outline-8'
                                id=""/>
                        </div>
                        <div className="inputBox">
                            <label htmlFor="category">Product Quantity</label>
                            <input type="number"
                                value={Quantity}
                                onChange={
                                    (e) => setQuantity(e.target.value)
                                }
                                name="productQuantity"
                                placeholder='Enter Product Quantity'
                                className='w-full mt-1 p-2 outline-8'
                                id=""/>
                        </div>

              
                        <div className="inputBox">
                            <label htmlFor="category">Product Image</label>
                            <input type="file"
                                name="productImage"
                                placeholder='Upload Product Image'
                                className='w-full mt-1 p-2 outline-8'
                                id=""/>
                        </div>


                        <button className='mt-5 bg-blue-500 p-2 w-full text-white'
                            onClick={handleSubmit}>Create New Product</button>

                    </div>
                </div>


            </div>
        </div>
    )
}

export default NewProduct
