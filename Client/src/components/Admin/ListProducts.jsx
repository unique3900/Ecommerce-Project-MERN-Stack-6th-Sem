import React, {
    useEffect,
    useState
} from 'react'

import axios from 'axios';
import {
    toast
} from 'react-toastify';
import {
    Modal,
    Select
} from 'antd';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography
} from "@material-tailwind/react";
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
        if (!name || !description || !price || !quantity || !category || !photo) {
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

                const {
                    data
                } = await axios.put(`http://localhost:8080/api/v1/product/update-product/${_id}`, productData);
                if (data.success) {
                    toast.success(data.message);
                    navigate('/dashboard/admin/new-product');
                    window.location.reload(false);

                } else {
                    toast.error(data.message);
                }
            } catch (error) {
                console.log(error)
            }

        }
    }
    const deleteProduct = async (_id) => {
        try {
            const {
                data
            } = await axios.delete(`http://localhost:8080/api/v1/product/delete-product/${_id}`);
            if (data.success) {
                toast.success(data.message);
                window.location.reload(false);
                
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='mt-5 w-full relative shadow-md sm:rounded-lg flex flex-col justify-center place-items-center overflow-x-auto'>
            <h1 className="text-4xl text-center">All Products</h1>
            <div className="grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mt-5">

                
                {
                    products.map((item) => {
                        return (
                            <Card className="w-96" key={item._id}>
                            <CardHeader color="blue" className="relative h-56">
                                <img src={`http://localhost:8080/api/v1/product/get-product-image/${item._id}`} alt="img-blur-shadow" className="h-full w-full"/>
                            </CardHeader>
                            <CardBody className="text-center">
                                <Typography variant="h5" className="mb-2">
                                    {item.name}
                                </Typography>
                                <Typography>
                                        {
                                            item.description
                                }
                                </Typography>
                            </CardBody>
                                <CardFooter divider className="flex items-center justify-between py-3">
                                    <div className="flex flex-col">
                                    <Typography variant="small">Nrs. {item.price}</Typography>
                                        <Typography variant="small">{item.quantity} pcs</Typography>
                                        
                                    </div>
                                    
                                <Typography variant="small" color="gray" className="flex gap-1">
                                    <button className="bg-green-500 px-3 py-1 text-white">Edit</button>
                                    <button className="bg-red-500 px-2 py-1 text-white" onClick={()=>{deleteProduct(item._id)}}>Delete</button>
                                </Typography>
                            </CardFooter>
                            </Card>
                        )
                    })
                }

                


                
            </div>


            
        </div>
    )
}

export default ListProducts
