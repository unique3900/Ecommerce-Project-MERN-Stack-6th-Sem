import React from 'react'
import { useAuth } from '../components/Context-State/auth'
import { Link, useNavigate } from 'react-router-dom';

const UserInfo = () => {
    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();
    const titles = [{ name: ['Name','Address','Gender','Email','Phone']}];
    const user = [auth.user];
    console.log(user)
    const changePassword = () => {
        navigate('/change-password');
    }
  
    return (
      <>
                    <h3 className='text-3xl text-center font-bold'>User Section</h3>
        
            <div className='grid grid-rows-1 place-items-center lg:place-items-stretch items-center gap-3 justify-center lg:grid-cols-20/80 lg:justify-between lg:items-start  mt-4 mx-10'> 
                
            {/* Actions */}
                <div className="flex flex-col py-5 gap-4 bg-slate-100 w-48 shadow-sm items-center">
                    <h4 className='font-bold text-xl'>Actions</h4>
                   <button className="text-white bg-red-500 rounded-lg px-3 py-2" onClick={changePassword}>Change Password</button>
                    <button className="text-white bg-blue-500 rounded-lg px-3 py-2">Update profile</button>
                </div>
                
                {/* User Data */}
                <div className="bg-slate-200 shadow-md px-5 py-3">
                    <div className="title">
                        <h4 className='font-bold text-xl border-black text-center '>User Information's</h4> 
                    </div>
                    <div className=" flex flex-col justify-center">
                        <div className="flex flex-row gap-4">
                            {
                       
                                titles.map((item, index) => {
                                    return (
                                      
                                        <div className="title flex flex-col gap-4" key={index}>
                                            <div className="one">
                                                <h3 className='text-2xl font-bold capitalize '>{item.name[index]}:</h3>
                                            </div>
                                            <div className="one">
                                                <h3 className='text-2xl font-bold capitalize'>{item.name[index+1]}:</h3>
                                            </div>
                                            <div className="one">
                                                <h3 className='text-2xl font-bold capitalize'>{item.name[index+2]}:</h3>
                                            </div>
                                            <div className="one">
                                                <h3 className='text-2xl font-bold capitalize'>{item.name[index+3]}:</h3>
                                            </div>
                                            <div className="one">
                                                <h3 className='text-2xl font-bold capitalize'>{item.name[index+4]}:</h3>
                                            </div>
                                            

                                           
                                            </div>

                                    )
                                    
                                })
                            }

                            <div className="flex flex-col">
                                {
                                    user.map((item, index) => {
                                        return (
                                            <div className="title flex flex-col gap-5 items-center" key={index}>

                                            <div className="one">
                                                <h3 className='text-xl capitalize'>{item.name}</h3>
                                                </div>
                                                <div className="one">
                                                <h3 className='text-xl capitalize'>{item.address}</h3>
                                            </div>
                                            <div className="one">
                                                <h3 className='text-xl capitalize'>{item.gender}</h3>
                                            </div>
                                            <div className="one">
                                                <h3 className='text-xl capitalize'>{item.email}</h3>
                                                </div>
                                                <div className="one">
                                                <h3 className='text-xl capitalize '>{item.phone}</h3>
                                            </div>
                                                </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                            
                    
                    </div>
                    


                </div>
              
                    </div>
            </>
  )
}

export default UserInfo
