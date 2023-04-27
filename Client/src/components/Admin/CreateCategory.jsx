import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ListCategories from './ListCategories';

const CreateCategory = () => {

  const [name, setName] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const handleCreate = async() => {
    if (!name) {
      setError(true);
    }
    else {
      try {
        const fetchResponse = await axios.post('http://localhost:8080/api/v1/category/create-category', { name });
        
        if (fetchResponse.data.success) {
          toast.success(fetchResponse.data.message);
          // navigate('/dashboard/admin/create-category');
          window.location.reload(false);
        }
        else {
          toast.error(fetchResponse.data.message);
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
  return (
    <div>
         <ListCategories className="mt-5"/>
      {/* Boc */}
      <div className="flex flex-col justify-center items-center h-screen">

        <div className=" grid mt-0 grid-flow-row lg:grid-flow-col items-center align-middle lg:grid-cols-2 w-fit  bg-slate-50 p-6 round-xl shadow-md shadow-slate-400">
                    <div className="relative justify-center place-content-center">
                      <img className='lg:w-fit' src="https://www.bstones.in/wp-content/uploads/2020/08/Responsive-web-design-1.png" alt="" />
                    </div>
                    <div className="">
                      <h1 className='text-center text-4xl lg:text-6xl py-5 '>Create Category</h1>
                     
                              <label htmlFor="category">Enter New Product Category</label>
              <input type="text" name="category" placeholder='Enter Category Here' className='w-full mt-1 p-2 outline-8' onChange={(e) => setName(e.target.value)} id="" />
              

              {
                            error&&!name?<span className='bg-red-200 text-gray-500'>Category is Required</span>:""
                        }
                               <button className='mt-5 bg-blue-500 p-2 w-full text-white' onClick={handleCreate} >Create New Category</button>
                    
                    </div>
        </div>
        
     
      </div>


    </div>
  )
}

export default CreateCategory
