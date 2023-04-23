import React, { useEffect, useState } from 'react'
import { SpinnerCircular, SpinnerDotted } from 'spinners-react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const Spinner = ({path="login"}) => {
    const [count, setCount] = useState(3);
    const navigate = useNavigate();
    useEffect(() => {
        const interval = setInterval(() => {
          setCount((prevValue) => --prevValue);
        }, 1000);
        if (count === 0) {
            toast.error("Sorry You dont have access to this page,kindly login");
          localStorage.removeItem("auth");
            navigate(`/home`);
       }
        return () => clearInterval(interval);
      }, [count, navigate,path]);
    
  return (
    <div className='h-screen flex flex-row justify-center align-middle place-items-center gap-3 '>
    <div className="title">{
        <h3 className='text-2xl font-semibold'>Checking Authority {count}</h3> 
    }
   
    </div>
    <div className="spin">
    <SpinnerDotted className='place-content-center' />
    </div>
      
</div> 
  )
}

export default Spinner
