
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import {
    Modal, Select
} from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
const {Option} = Select;
const UpdateProduct = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [products, setProducts] = useState([]);
    const [updateProducts, setUpdateProducts] = useState([]);
    const [selected, setSelected] = useState("");
    const [name, setSelectedName] = useState("");
    const [description, setSelectedDesc] = useState("");
    const [price, setSelectedPrice] = useState("");
    const [quantity, setSelectedQuantity] = useState("");
    const [photo, setPhoto] = useState("");
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [id, setId] = useState("");
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

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const getOneProduct = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8080/api/v1/product/get-one-product/${params.slug}`);
            console.log(data);
            setId(data.product._id);
            setSelectedName(data.product.name);
            setSelectedDesc(data.product.description);
            setSelectedPrice(data.product.price);
            setSelectedQuantity(data.product.quantity);
        } catch (error) {
            toast.error(error);
        }
}


    useEffect(() => {

        getOneProduct();
        getAllCategory();
    }, [])

    const updateProduct = async (_id) => {
        if (!name || !description || !price || !quantity || !category ||!photo) {
            toast.error("Please Fill Out Every Fields");
        } else {
          try {
            console.log(name, description, price, quantity, category, photo);
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("category", category);
            productData.append("quantity", quantity);
            productData.append("image", photo);

              const {data} = await axios.put(`http://localhost:8080/api/v1/product/update-product/${id}`,productData);
              if (data.success) {
                  toast.success(data.message);
                  navigate('/dashboard/admin/new-product');
                  

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
                <h1 className='text-center text-4xl lg:text-6xl py-5 '>Update Product</h1>

                <div className="inputBox">
                    <label htmlFor="category">Product Name</label>
                    <input type="text"
                              value={name}
                              onChange={(e)=>setSelectedName(e.target.value)}
                        name="productName"
                        placeholder='Enter Product Name'
                        className='w-full mt-1 p-2 outline-8'
                        id=""/>
                </div>
                <div className="inputBox">
                    <label htmlFor="category">Product Description</label>
                          <textarea 
                              value={description}
                              onChange={(e)=>setSelectedDesc(e.target.value)}
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

                    <Select 
                        className='w-full'
                              placeholder="Select Product Category"
                              onChange={
                                (value) => setCategory(value)
                            }
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
                        value={price}
                        onChange={
                            (e) => setSelectedPrice(e.target.value)
                        }
                        name="productPrice"
                        placeholder='Enter Product Price'
                        className='w-full mt-1 p-2 outline-8'
                        id=""/>
      </div>

                <div className="inputBox">
                    <label htmlFor="category">Product Quantity</label>
                    <input type="number"
                         value={quantity}
                         onChange={
                             (e) => setSelectedQuantity(e.target.value)
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
                onClick={()=>updateProduct(selected)} >Update</button>

        </div>
    </div>


    </div>
    
</div>
  )
}

export default UpdateProduct
