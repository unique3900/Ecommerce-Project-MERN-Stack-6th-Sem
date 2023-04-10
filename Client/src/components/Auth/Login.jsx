import React, { useState } from 'react'
import { AiOutlineLogin } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);


    const navigate = useNavigate();
    const handleSubmit = async() => {
        if ( !email || !password ) {
            setError(true);
            toast.error('Enter Details Correctly');
        }
        else {
            try {
                const fetch = await axios.post(`http://localhost:8080/api/v1/auth/login`,{email,password});
                if (fetch.data.success == true) {
                    toast.success(fetch.data.message);
                    console.log(fetch.data.token);
                    navigate('/home');
                }
                else {
                    toast.error(fetch.data.message);
                    
                }
            } catch (error) {
                toast.error("Something Went Wrong");
            }
           
            console.log(email,password);
        }


}
  return (
<div className='flex  justify-center items-center h-screen bg-slate-200'>
            <div className="mt-14 w-[500px] lg:mt-0 bg-slate-50 p-6 round-xl shadow-md shadow-slate-400">
              <div className='flex flex-col gap-3 place-items-center'>
                  <AiOutlineLogin className='h-16 w-10'/>
                    <h1 className='text-center  font-semibold text-3xl'>Login</h1>
                </div>
                <div className="form grid grid-flow-row  gap-2  mt-5">


                    <div className="inputBox flex flex-col gap-1">
                        <label htmlFor="email">Email Address:</label>
                        <input type="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} className='outline-black border-b-2 px-2 rounded-md shadow-smpx-2' placeholder='Enter email address'/>
                        {
                            error&&!email?<span className='bg-red-200 text-gray-500'>Email is Required</span>:""
                        }
                    </div>

                    
                    <div className="inputBox flex flex-col gap-1">
                        <label htmlFor="password">Password:</label>
                     
                        <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} className='px-2' name='password' placeholder="Enter Password"  />
                        {
                            error&&!password?<span className='bg-red-200 text-gray-500'>Password is Required</span>:""
                        }
                    </div>
                   
                </div>
                <button className='mt-5 bg-blue-500 p-2 w-full text-white' onClick={handleSubmit}>Login</button>
            </div>

        </div>
  )
}

export default Login
