import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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
          navigate('/dashboard/admin');
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
      {/* Boc */}
      <div className="flex justify-center items-center h-screen bg-slate-200">

        <div className=" grid grid-flow-row lg:grid-flow-col align-middle lg:grid-cols-2   mt-14 w-[800px]  lg:mt-0 bg-slate-50 p-6 round-xl shadow-md shadow-slate-400">
                    <div className="relative justify-center place-content-center">
                      <img className='lg:w-fit' src="https://www.bstones.in/wp-content/uploads/2020/08/Responsive-web-design-1.png" alt="" />
                    </div>
                    <div className="">
                      <h1 className='text-center text-4xl '>Create Category</h1>
                     
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
