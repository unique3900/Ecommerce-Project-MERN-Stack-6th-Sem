import React, {
    useEffect,
    useState
} from 'react'
import {
    useSearch
} from './Context-State/search'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography
} from "@material-tailwind/react";
import {
    Link
} from 'react-router-dom';
import axios from 'axios';


const SearchPage = () => {
    const [search, setSearch] = useSearch();
    const [page, setPage] = useState(1);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] =useState(false);


    const getAllCategory = async () => {
        try {
            const {
                data
            } = await axios.get("http://localhost:8080/api/v1/category/get-category");
            if (data.success) {
                setCategories(data.getAllCategory);
            }
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        getAllCategory();

    }, []);




    useEffect(() => {
        if (page === 1) return;
        loadMoreProducts();
    }, [page]);

    const loadMoreProducts = async () => {
        try {
            setLoading(true);
            const {
                data
            } = await axios.get(`http://localhost:8080/api/v1/product/product-listing/${page}`);
                setLoading(false);
                setProducts([...products, ...data?.products]);
        } catch (error) {
            setLoading(false);
            console.log(error)
        }

    }
    return (
        <div className='px-3'>
            <h1 className='text-center font-bold text-4xl'>Search Lists</h1>
            <div className="text-center">
                {
                search ?. results.length <= 0 ? <p className='text-red-500 italic'>Sorry No Products Found</p> : <p className='text-red-500 italic text-2xl'>
                    {
                            <span className='font-semibold text-3xl'>{ search ?. results.length  }</span> 
                }
                    <span> Products Found</span></p>
            } </div>
            <div
                className=" overflow-x-clip grid grid-flow-row gap-4 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mt-5">
                {
                search ?. results.map((item, index) => {
                    return (

                        <Card className="w-96 cursor-grab hover:scale-105 transition-all duration-50"
                            key={index}>
                            <CardHeader color="blue" className="relative h-56">

                                <img src={
                                        `http://localhost:8080/api/v1/product/get-product-image/${
                                            item._id
                                        }`
                                    }
                                    alt="img-blur-shadow"
                                    className="h-full w-full"/>
                                <p className="absolute top-2 text-sm right-3 rounded-full text-white bg-red-500 px-3 py-1">
                                    {
                                        categories.map((e) => {
                                            return (
                                                <span className="" key={e._id}>
                                                {e._id === item.category ?
                                                   e.name  :""
                                            }
                                                    </span>
                                        )
                                    })
                                } </p>

                            </CardHeader>
                            <Link to={
                                    `/product/${
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
                                    <button className="bg-blue-500 px-3 py-2 text-white rounded-sm">Add to Cart</button>
                                </Typography>

                            </CardFooter>
                        </Card>


                    )
                })
                } </div>
            

            {
                search.results.length > 0 && (
                    <div className="flex justify-centy">
                        <button onClick={(e) => {
                                        e.preventDefault();
                                        setPage(page + 1);
    
                                    }} className='bg-transparent text-blue-500 underline mt-3 px-2 py-2'>{loading?"......Loading":search.results.length<=3?"Show More Items":"No more Items to Fetch" }</button>
                    </div>
                )
            }
        </div>
    )
}

export default SearchPage
