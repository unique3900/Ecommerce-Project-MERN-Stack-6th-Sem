import React, { useEffect, useState } from 'react'
import { useAuth } from './Context-State/auth'
import Hero from './Layout/Hero';
import { toast } from 'react-toastify';
import axios from 'axios';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography
} from "@material-tailwind/react";

const Home = () => {
    const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
    const LogCheck = localStorage.getItem("auth");
  const parsedLogCheck = JSON.parse(LogCheck);
  const getAllProducts = async () => {
    const {
        data
    } = await axios.get("http://localhost:8080/api/v1/product/get-product");
    if (data.success) {
        setProducts(data.productFetch);
      console.log(data);
    }

}
    useEffect(() => {
        if (!parsedLogCheck) {
            toast.error("Logged in as Guest");
      }
      getAllProducts();
    }, [])
    
  return (
      <div title='Parashar Shop-Safe Secure Reliable' className='px-3'>
      <Hero />
      <hr />
      <div className="mt-5 grid place-items-center lg:grid-cols-20/80">
      <div>
          <h1 className='text-4xl font-bold text-center'>Filter</h1>
       </div>
        <div>
          <h1 className='text-4xl font-bold text-center'>Latest Products</h1>
          <div className="overflow-x-auto grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mt-5">

                
            {
              
              products.slice(0, 10).map((item) => {
      
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
              <Typography variant="small">
                  <button className="bg-blue-500 px-3 py-2 text-white rounded-sm">Add to Cart</button>
                        </Typography>
                    
            </CardFooter>
            </Card>
        )
    })
}





</div>
        </div>
  
          </div>
    </div>
  )
}

export default Home
