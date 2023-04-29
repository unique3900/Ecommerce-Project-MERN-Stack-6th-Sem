import React, {
    useEffect,
    useState
} from 'react'

import axios from 'axios';
import {
    toast
} from 'react-toastify';
import {
    Modal, Select
} from 'antd';
const ListProducts = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
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
    const getAllProducts = async () => {
        const {
            data
        } = await axios.get("http://localhost:8080/api/v1/product/get-product");
        if (data.success) {
            setProducts(data.productFetch);

        }

    }

    const getOneProduct = async () => {
        const {
            data
        } = await axios.get(`http://localhost:8080/api/v1/product/get-one-product/${selected}`);
        if (data.success) {
            setSelectedName(data.findProduct.name);
            setSelectedDesc(data.findProduct.description);
            setSelectedPrice(data.findProduct.price);
            setSelectedQuantity(data.findProduct.quantity);
            


        }

    }
    
    useEffect(() => {
        getAllProducts();
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
            
              const {data} = await axios.put(`http://localhost:8080/api/v1/product/update-product/${_id}`,productData);
              if (data.success) {
                  toast.success(data.message);
                  navigate('/dashboard/admin/new-product');
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
    const deleteProduct = async (_id) => {
        try {
            const { data } = await axios.delete(`http://localhost:8080/api/v1/product/delete-product/${_id}`);
            if (data.success) {
                window.location.reload(false);
                toast.success(data.message);
            }
            else {
                toast.error(data.message);
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    


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
                products.map((item, count = 0) => {
                    return (
                        <tbody key={
                                item._id
                            }
                            className=''>
                            <tr className='bg-white border-b dark:bg-gray-900 dark:border-gray-700'>
                                <td>{
                                    count + 1
                                }</td>
                                <td>{
                                    item.name
                                }</td>
                                <td>{
                                    item.description
                                }</td>
                                <td>{
                                    item.price
                                }</td>
                                <td>{
                                    item.quantity
                                }</td>
                                <td>
                                    <div className="flex flex-col lg:flex-row gap-2 justify-center align-middle items-center">
                                        <button className="bg-green-500 text-white px-2 py-1 rounded-sm w-full lg:w-fit"
                                            onClick={
                                                () => {
                                                    setSelected(item._id);
                                                    setSelectedName(item.name);
                                                    setSelectedDesc(item.description);
                                                    setSelectedPrice(item.price);
                                                    setSelectedQuantity(item.quantity);
                                                    showModal();
                                                
                                                }
                                        }>Edit</button>
                                        <button className="bg-red-500 text-white px-2 py-1 rounded-sm w-full lg:w-fit"
                                            onClick={
                                                () => deleteProduct(item._id)
                                        }>Delete</button>

                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    )

                })
            } </table>


            <Modal title="Update Product" className=''
                open={isModalOpen}
                footer={null}
                onCancel={handleCancel}>
                <div className="flex flex-col  h-full overflow-x-auto">



                        <div className="px-3">
                            <div className="inputBox">
                                <label htmlFor="category">Product Name</label>
                                <input type="text"
                                    value={name}
                                    onChange={
                                        (e) => setSelectedName(e.target.value)
                                    }
                                    name="productName"
                                    placeholder='Enter Product Name'
                                    className='w-full mt-1 p-2 outline-8'
                                    id=""/>
                            </div>
                            <div className="inputBox">
                                <label htmlFor="category">Product Description</label>
                                <textarea value={description}
                                    onChange={
                                        (e) => setSelectedDesc(e.target.value)
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
                                } </Select>
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

                                <input type="file" className='bg-green-500 p-2 w-full text-white ' placeholder='Upload photo' name="photo" accept="image/*"
                                    onChange={
                                        (e) => setPhoto(e.target.files[0])
                                    }/>

                            </div>
                            <div> {
                                photo && (
                                    <div className="flex justify-center  text-center">
                                        <img src={
                                                URL.createObjectURL(photo)
                                            }
                                            alt="product_photo"
                                            className='h-52 w-64 '/>
                                    </div>
                                )
                            } </div>

                            <button className='mt-5 bg-blue-500 p-2 w-full text-white'
                                onClick={()=>updateProduct(selected)}>Update Product</button>

                        </div>
                 

                    
                </div>
            </Modal>
        </div>
    )
}

export default ListProducts
