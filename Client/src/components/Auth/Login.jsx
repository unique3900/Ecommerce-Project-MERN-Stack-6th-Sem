import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = async() => {
        if ( !email || !password ) {
            setError(true);
        }
        else {
            try {
                const fetchResponse = await axios.post('http://localhost:8080/api/v1/auth/login', {  email, password});
                if (fetchResponse.data.success) {
                    toast.success(fetchResponse.data.message);
                    
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
<div className='flex justify-center items-center h-screen bg-slate-200'>
            <div className="mt-14 w-[600px]  lg:mt-0 bg-slate-50 p-6 round-xl shadow-md shadow-slate-400">
                <div>
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
