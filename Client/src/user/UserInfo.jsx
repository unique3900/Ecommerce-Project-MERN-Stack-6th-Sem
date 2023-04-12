import React from 'react'
import { useAuth } from '../components/Context-State/auth'

const UserInfo = () => {
     const[auth,setAuth] = useAuth();
    return (
      <>
                    <h3 className='text-3xl text-center font-bold'>User Section</h3>
        
            <div className='grid grid-rows-1 items-center gap-3 justify-center lg:grid-cols-20/80 lg:justify-between lg:items-start  mt-4 mx-5'> 
                
            {/* Actions */}
                <div className="flex flex-col py-5 bg-slate-100 w-48 shadow-sm items-center">
                    <h4 className='font-bold text-xl'>Actions</h4>
                    <button className="text-white bg-red-500 rounded-lg px-2">Change Password</button>
                </div>
                
                {/* User Data */}
                <div className="bg-slate-200 shadow-md">
                    <div className="title">
                        <h4 className='font-bold text-xl border-black text-center '>User Information's</h4> 
                    </div>
                    <div className=" flex flex-col justify-center">
                        {
                            <>
                                 <h2>Name:{JSON.stringify(auth.user.name)}</h2>
                            <h2>Phone:{JSON.stringify(auth.user.phone) }</h2>
                            <h2>Email:{JSON.stringify(auth.user.email) }</h2>
                            <h2>Address:{JSON.stringify(auth.user.address) }</h2>
                            </>
                       
                            
                            }
                    </div>
                       


                </div>
              
                    </div>
            </>
  )
}

export default UserInfo
