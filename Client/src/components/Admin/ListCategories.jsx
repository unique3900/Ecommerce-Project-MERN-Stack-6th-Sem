import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';

import { toast } from 'react-toastify';


const ListCategories = () => {

    const [categories, setCategories] = useState([]);

    const getAllCategory = async () => {
        try {
            const {data} = await axios.get("http://localhost:8080/api/v1/category/get-category");
        if (data.success) {
            setCategories(data.getAllCategory);
        }
        } catch (error) {
            console.log(error)
        }
        
    }

    useEffect(() => {
        getAllCategory();
    }, [])
    
    const handleDeleteCategory = async (itemId) => {
        try {
            const { data } = await axios.delete(`http://localhost:8080/api/v1/category/delete-category/${itemId}`);
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
    <div className="mt-5">
      
          <h1 className='text-4xl text-center underline lg:text-5xl'>All Categories</h1>
          <div className="mt-5 flex flex-row flex-wrap justify-center gap-5">
              
              {
                            
             categories.map((item) => {
                 return (
                  
                     <p key={item._id} className='bg-slate-200 px-2 py-1 flex items-center justify-center align-middle gap-2 cursor-pointer'>{item.name} <span><IoMdClose className='cursor-pointer text-red-500 font-extrabold scale-110' onClick={() => { handleDeleteCategory(item._id) }} /></span>
     
                     </p> 
                  

               )
           })
            }

       



          </div>
    </div>
  )
}

export default ListCategories

