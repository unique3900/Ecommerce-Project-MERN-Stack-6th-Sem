import React from 'react'

const Login = () => {
  return (
<div className='flex justify-center items-center h-screen bg-slate-200'>
            <div className="block bg-slate-50 p-10 round-xl shadow-md shadow-slate-400">
                <div>
                    <h1 className='text-center font-semibold text-3xl'>Login</h1>
                </div>
                <div className="form grid grid-flow-row  gap-2  mt-5">


                    <div className="inputBox flex flex-col gap-1">
                        <label htmlFor="email">Email Address:</label>
                        <input type="email" name='email' className='outline-black border-b-2 px-2 rounded-md shadow-smpx-2' placeholder='Enter email address'/>
                    </div>

                    
                    <div className="inputBox flex flex-col gap-1">
                        <label htmlFor="password">Password:</label>
                     
                        <input type="password" className='px-2' name='password' placeholder="Enter Password"  />
                    </div>
                   
                </div>
                <button className='mt-5 bg-blue-500 p-2 w-full text-white'>Login</button>
            </div>

        </div>
  )
}

export default Login
