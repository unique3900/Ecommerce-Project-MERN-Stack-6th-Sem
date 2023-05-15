import React, { useEffect, useState } from 'react'
import { useAuth } from '../components/Context-State/auth'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const  UserInfo = () => {
    const [auth, setAuth] = useAuth();
    const [currUser, setcurrUser] = useState([]);
    const navigate = useNavigate();
    const titles = [{ name: ['Name','Address','Gender','Email','Phone']}];
    const user = [auth.user];
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");


    console.log(user)
    const changePassword = () => {
        navigate('/change-password');
    }

    useEffect(() => {
        getUser();
    }, [])
    
    const getUser = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8080/api/v1/auth/get-user-by-id/${auth.user._id}`);
            console.log(data);
            setName(data.user.name);
            setEmail(data.user.email);
            setAddress(data.user.address);
            setPhone(data.user.phone);
            setGender(data.user.gender);
           
        } catch (error) {
            console.log(error)
        }
    }
  
    return (
      <>
            
        
            <div className='grid grid-rows-1 place-items-center lg:place-items-stretch items-center gap-3 justify-center lg:grid-cols-20/80 lg:justify-between lg:items-start  mt-4 mx-10'> 
                
            {/* Actions */}
                <div className="flex flex-col py-5 gap-4 bg-slate-100 lg:w-48 w-screen shadow-sm items-center">
                    <h4 className='font-bold text-xl'>Actions</h4>
                   <button className="text-white bg-red-500 rounded-lg px-3 py-2 w-fit " onClick={changePassword}>Change Password</button>
                  <Link to={`/update-profile/${auth.user._id}`} ><button className="text-white bg-blue-500 rounded-lg px-3 py-2  w-fit">Update profile</button></Link>  
                </div>
                
                {/* User Data */}
                <div className="bg-slate-200 shadow-md px-5 py-3 w-full ">
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
                                
                                            <div className="title flex flex-col gap-5 items-center" >

                                            <div className="one">
                                                <h3 className='text-xl capitalize'>{name}</h3>
                                                </div>
                                                <div className="one">
                                                <h3 className='text-xl capitalize'>{address}</h3>
                                            </div>
                                            <div className="one">
                                                <h3 className='text-xl capitalize'>{gender}</h3>
                                            </div>
                                            <div className="one">
                                                <h3 className='text-xl capitalize'>{email}</h3>
                                                </div>
                                                <div className="one">
                                                <h3 className='text-xl capitalize '>{phone}</h3>
                                            </div>
                                                </div>
                      
                            </div>
                        </div>
                            
                    
                    </div>
                    


                </div>
              
                    </div>
            </>
  )
}

export default UserInfo
