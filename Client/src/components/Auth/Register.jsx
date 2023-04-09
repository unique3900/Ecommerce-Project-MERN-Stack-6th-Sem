import React from 'react';
import PhoneInput from 'react-phone-number-input';

const Register = () => {
    return (
        <div className='flex justify-center items-center h-screen bg-slate-200'>
            <div className="block bg-slate-50 p-6 round-xl shadow-md shadow-slate-400">
                <div>
                    <h1 className='text-center font-semibold text-3xl'>Register</h1>
                </div>
                <div className="form grid grid-flow-row = lg:grid-cols-2   gap-2  mt-5">
                    <div className="inputBox flex flex-col gap-1">
                        <label htmlFor="Name">Full Name:</label>
                        <input type="text" name='name' className='outline-black border-b-2 px-2 rounded-md shadow-sm' placeholder='Enter Your Name'/>
                    </div>

                    <div className="inputBox flex flex-col gap-1">
                        <label htmlFor="email">Email Address:</label>
                        <input type="email" name='email' className='outline-black border-b-2 px-2 rounded-md shadow-sm' placeholder='Enter email address'/>
                    </div>

                    <div className="inputBox flex flex-col gap-1">
                        <label htmlFor="address">Address:</label>
                        <input type='location' name='address' className='outline-black border-b-2 px-2 rounded-md shadow-sm' placeholder='Enter email address'/>
                    </div>

                    <div className="inputBox flex flex-col gap-1">
                        <label htmlFor="phone">Phone:</label>
                     
                        <input type="text" name='phone' placeholder="Enter phone number"  />
                    </div>
                    <div className="inputBox flex flex-col gap-1">
                        <label htmlFor="password">Password:</label>
                     
                        <input type="password" name='password' placeholder="Enter Password"  />
                    </div>
                    <div className="inputBox flex flex-col gap-1">
                        <label htmlFor="cpassword">Confirm Password:</label>
                       
                        <input type="password" name='cpassword' placeholder="Confirm Password"  />
                    </div>
                    <div className="inputBox flex flex-col gap-1">
                        <label htmlFor="gender">Gender:</label>
                        <div className="flex gap-4 justify-around">
                            <div className="flex">
                                    <label htmlFor="male">Male:</label>
                                    <input type="radio" name="gender" id="" />
                            </div>
                            <div className="flex">
                                    <label htmlFor="female">Female:</label>
                                    <input type="radio" name="gender" id="" />
                            </div>
                            <div className="flex">
                                    <label htmlFor="Others">Others:</label>
                                    <input type="radio" name="gender" id="" />
                            </div>
                       
           
                        </div>
   
                        
                    </div>
            

                    

                </div>
                <button className='mt-1 bg-blue-500 p-2 w-full text-white'>Register</button>
            </div>

        </div>
    )
}

export default Register
