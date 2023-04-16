import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import { useNavigate , Link} from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");

    const [error, setError] = useState(false);
    const [passMatch, setpassMatch] = useState(true);

    const navigate = useNavigate();
    
    const handleSubmit =async () => {
        if (!name || !email || !password || !confirmPassword || !address || !phone || !gender) {
            setError(true);
            console.log(name, email, gender);
        }
    
        else if (confirmPassword !== password) {
            setpassMatch(false);
        }
        else {
            try {
                const fetchResponse = await axios.post('http://localhost:8080/api/v1/auth/register', { name, email, password, address, phone, gender });
                if (fetchResponse.data.success) {
                    toast.success(fetchResponse.data.message);
                    navigate('/login');
                }
                else {
                    toast.error(fetchResponse.data.message);
                 
                }
                
            } catch (error) {
                console.log(error)
            }
           
        }

        console.log(name,email,password,confirmPassword,phone,gender);
}
 
    return (
        <div className='flex overflow-y-auto justify-center items-center h-screen bg-slate-200'>
            <div className="mt-14 w-[600px]  lg:mt-0 bg-slate-50 p-6 round-xl shadow-md shadow-slate-400">
                <div>
                    <h1 className='text-center  font-semibold text-3xl'>Register</h1>
                </div>
                <div className="form grid grid-flow-row = lg:grid-cols-2   gap-2  mt-5">
                    <div className="inputBox flex flex-col gap-1">
                        <label htmlFor="Name">Full Name:</label>
                        <input type="text" name='name' required className='outline-black border-b-2 px-2 rounded-md shadow-sm' value={name} placeholder='Enter Your Name' onChange={(e) => setName(e.target.value)} />
                        {/* Throw error if Empty */}
                        {
                            error&&!name?<span className='bg-red-200 text-gray-500'>Name is Required</span>:""
                        }
                        
                    </div>

                    <div className="inputBox flex flex-col gap-1">
                        <label htmlFor="email">Email Address:</label>
                        <input type="email" name='email' required className='outline-black border-b-2 px-2 rounded-md shadow-sm' value={email} placeholder='Enter email address' onChange={(e) => setEmail(e.target.value)} />
                        {
                            error&&!email?<span className='bg-red-200 text-gray-500'>Email is Required</span>:""
                        }
                    </div>

                    <div className="inputBox flex flex-col gap-1">
                        <label htmlFor="address">Address:</label>
                        <input type='location' name='address' required className='outline-black border-b-2 px-2 rounded-md shadow-sm' value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Enter email address' />
                        {
                            error&&!address?<span className='bg-red-200 text-gray-500'>Address is Required</span>:""
                        }
                    </div>

                    <div className="inputBox flex flex-col gap-1">
                        <label htmlFor="phone">Phone:</label>
                     
                        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required name='phone' placeholder="Enter phone number" />
                        {
                            error&&!phone?<span className='bg-red-200 text-gray-500'>Phone is Required</span>:""
                        }
                    </div>
                    <div className="inputBox flex flex-col gap-1">
                        <label htmlFor="password">Password:</label>
                     
                        <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} required name='password' placeholder="Enter Password" />
                        {
                            error&&!password?<span className='bg-red-200 text-gray-500'>Password is Required</span>:""
                        }
                    </div>
                    <div className="inputBox flex flex-col gap-1">
                        <label htmlFor="cpassword">Confirm Password:</label>
                       
                        <input value={confirmPassword} type="password" onChange={(e) => setConfirmPassword(e.target.value)} required name='cpassword' placeholder="Confirm Password" />
                        {
                            error&&!confirmPassword?<span className='bg-red-200 text-gray-500'>Confirm Password is Required</span>:!passMatch?<span className='bg-red-200 text-gray-500'>Confirm Password Doesnot Match</span>:""
                        }
                    </div>
                    <div className="inputBox flex flex-col gap-1">
                        <label htmlFor="gender">Gender:</label>
                        <div className="flex gap-4 justify-around">
                            <div className="flex">
                                    <label htmlFor="male">Male:</label>
                                    <input type="radio" onChange={(e)=>setGender(e.target.value)} value={'male'} name="gender" id="" />
                            </div>
                            <div className="flex">
                                    <label htmlFor="female">Female:</label>
                                    <input type="radio" onChange={(e)=>setGender(e.target.value)} value={'female'} name="gender" id="" />
                            </div>
                            <div className="flex">
                                    <label htmlFor="Others">Others:</label>
                                    <input type="radio" onChange={(e)=>setGender(e.target.value)} value={'others'} name="gender" id="" />
                            </div>
                            {
                            error&&!gender?<span className='bg-red-200 text-gray-500'>Gender is Required</span>:""
                        }
           
                        </div>
   
                        
                    </div>
            

                    

                </div>
                <button className='mt-1 bg-blue-500 p-2 w-full text-white' onClick={handleSubmit}>Register</button>
            </div>
           
        </div>
    )
}

export default Register
