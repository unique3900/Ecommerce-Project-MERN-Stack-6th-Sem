import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';

import { toast } from 'react-toastify';
import 'antd/dist/reset.css';
import { Modal } from 'antd';


const ListCategories = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [categories, setCategories] = useState([]);
    const [selected, setSelected] = useState("");
    const [name, setName] = useState("");
    const [selectedId, setSelectedId] = useState("");
    const showModal = () => {
        setIsModalOpen(true);
      };
    
      const handleOk = () => {
        setIsModalOpen(false);
      };
    
      const handleCancel = () => {
        setIsModalOpen(false);
      };

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

    const handleUpdate = async (_id) => {
        const {data} = await axios.put(`http://localhost:8080/api/v1/category/update-category/${_id}`,{_id,name});
        if (data.success) {
            toast.success(data.message);
            window.location.reload(false);
               
        }
        else {
            toast.error(data.message);
        }
    }
    



  return (
    <div className="mt-5">
      
          <h1 className='text-4xl text-center underline lg:text-5xl'>All Categories</h1>
          <div className="mt-5 flex flex-row flex-wrap justify-center gap-5">
              
              {
                            
             categories.map((item) => {
                 return (
                  
                     <p key={item._id} onClick={() => { showModal(); setSelected(item.name);setSelectedId(item._id) }} className='bg-slate-200 px-2 py-1 flex items-center justify-center align-middle gap-2 cursor-pointer'>{item.name} <span><IoMdClose className='cursor-pointer text-red-500 font-extrabold scale-110' onClick={() => { handleDeleteCategory(item._id) }} /></span>
     
                     </p> 
                  

               )
           })
            }

       



          </div>

          <Modal title="Basic Modal" open={isModalOpen} footer={null}  onCancel={handleCancel}>
              <input type="text" name='name' className='w-full px-2 py-2' defaultValue={selected } onChange={(e)=>{setName(e.target.value)}} />
              <button className='mt-5 bg-blue-500 p-2 w-full text-white' onClick={() => { handleUpdate(selectedId) }}  >Update Category</button>
      </Modal>
    </div>
  )
}

export default ListCategories

