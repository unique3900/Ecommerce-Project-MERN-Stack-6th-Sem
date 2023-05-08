import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom';




const ParticularProductWithCategory = () => {
    const params = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProductUsingCategory();
    }, [params.slug])
    const getProductUsingCategory = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8080/api/v1/product/get-product-categorywise/${params.slug
                }`);
                
            setProducts(data.product);
           console.log(data)
        } catch (error) {
            console.log(error)
        }
    }


    
  return (
    <div>
          {
            products.length>0 ?
              products.map((item, index) => {
                  return (
                      <div key={index}>
                          <p>{item.name }</p>
                          
                    </div>
                     
                  )
              }):"No Product Found"
      }
    </div>
  )
}

export default ParticularProductWithCategory
