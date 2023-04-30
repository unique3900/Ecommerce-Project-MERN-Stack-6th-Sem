import React, {
    useEffect,
    useState
} from 'react';

import {
    toast
} from 'react-toastify';
import {
    Select
} from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ListProducts from './ListProducts';
const {
    Option
} = Select;


const NewProduct = () => {
    const [name, setName] = useState("");
    const [Description, setDescription] = useState("");
    const [Price, setPrice] = useState(0);
    const [Quantity, setQuantity] = useState(0);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [photo, setPhoto] = useState("");
    const navigate = useNavigate();

    const getAllCategory = async () => {
        try {
            const {
                data
            } = await axios.get("http://localhost:8080/api/v1/category/get-category");
            if (data.success) {
                setCategories(data.getAllCategory);
            } else {
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
        if (!name || !Description || !Price || !Quantity || !category ||!photo) {
            toast.error("Please Fill Out Every Fields");
        } else {
          try {
            console.log(name, Description, Price, Quantity, category, photo);
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", Description);
            productData.append("price", Price);
            productData.append("category", category);
            productData.append("quantity", Quantity);
            productData.append("image", photo);
            
              const {data} = await axios.post("http://localhost:8080/api/v1/product/create-product",productData);
              if (data.success) {
                  toast.success(data.message);
                  window.location.reload(false);
              }
              else {
                  toast.error(data.message);
              }
          } catch (error) {
            console.log(error)
          }
           
        }
    }
    return (
        <div className=''>
            <h1 className="text-center text-4xl font-bold lg:text-6xl lg:font-extrabold py-4">Product Management</h1>
            <div className="flex flex-col justify-center items-center h-full overflow-x-auto">

                <div className=" grid mt-0 grid-flow-row lg:grid-flow-col items-center align-middle lg:grid-cols-2 w-fit  bg-slate-50 p-6 round-xl shadow-md shadow-slate-400 overflow-x-auto">
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

                            <Select onChange={
                                    (value) => setCategory(value)
                                }
                                className='w-full'
                                placeholder="Select Product Category"
                                showSearch>
                                {
                                categories.map((item) => {
                                    return (
                                        <Option key={
                                                item._id
                                            }
                                            value={
                                                item._id
                                        }>
                                            {
                                            item.name
                                        }</Option>
                                    )

                                })
                            }
                                

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
             
                  <input type="file"  className='bg-green-500 p-2 w-full text-white '  placeholder='Upload photo' 
                    name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                />

              </div>
              <div>
              {photo && (
                  <div className="flex justify-center  text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      className='h-52 w-64 '
                      
                    />
                  </div>
                )}
       </div>
  
                    <button className='mt-5 bg-blue-500 p-2 w-full text-white'
                        onClick={handleSubmit}>Create New Product</button>

                </div>
            </div>

<ListProducts/>
            </div>
            
    </div>
    )
}

export default NewProduct
