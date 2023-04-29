import React from 'react'
import UserInfo from '../../user/UserInfo'
import { useAuth } from '../Context-State/auth'
import { Link } from 'react-router-dom'

const AdminDashboard = () => {
    
  const [auth, setAuth] = useAuth();

  return (
      <div className='mt-5'>
          <h3 className='text-4xl text-center font-bold'>Admin Dashboard</h3>
          <UserInfo />

          <h3 className='text-4xl text-center font-bold mt-5'>Sales Panel</h3>

                 
            <div className='grid grid-rows-1 place-items-center lg:place-items-stretch items-center gap-3 justify-center lg:grid-cols-20/80 lg:justify-between lg:items-start  mt-4 mx-10'> 
                
            {/* Actions */}
                <div className="flex flex-col py-5 gap-4 bg-slate-100  shadow-sm items-center w-screen lg:w-48 ">
                  <h4 className='font-bold text-xl'>Operation</h4>
                <Link to='create-category'><button className="text-white bg-green-500 rounded-lg px-3 py-1 w-full">Category Management</button></Link>  
                <Link to='new-product'> <button className="text-white bg-purple-500 rounded-lg px-3 py-2 w-full">Product Management</button></Link> 
                   
                </div>
                
                {/* Sale Data */}
                <div className="bg-slate-200 shadow-md px-5  py-3  w-full ">
                    <div className="title">
                        <h4 className='font-bold text-xl border-black text-center '>Sales Information's</h4> 
                    </div>
                    <div className=" flex flex-col justify-center">
               
                            
                    
                    </div>
                    


                </div>
              
                    </div>


          
    </div>
  )
}

export default AdminDashboard
