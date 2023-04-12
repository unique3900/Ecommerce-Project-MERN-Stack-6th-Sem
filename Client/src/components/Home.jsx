import React, { useEffect } from 'react'
import { useAuth } from './Context-State/auth'
import Hero from './Layout/Hero';
import { toast } from 'react-toastify';

const Home = () => {
    const [auth, setAuth] = useAuth();
    
    const LogCheck = localStorage.getItem("auth");
    const parsedLogCheck = JSON.parse(LogCheck);
    useEffect(() => {
        if (!parsedLogCheck) {
            toast.error("Logged in as Guest");
            }
    }, [])
    
  return (
      <div>
          <Hero/>
          {
              // <h1>{JSON.stringify(auth,null,4) }</h1>
      }
    </div>
  )
}

export default Home
