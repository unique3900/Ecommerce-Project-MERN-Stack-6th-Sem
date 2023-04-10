import React from 'react'
import { useAuth } from './Context-State/auth'
import Hero from './Layout/Hero';

const Home = () => {
    const[auth,setAuth]=useAuth();
  return (
      <div>
          <Hero/>
          {
              <h1>{JSON.stringify(auth,null,4) }</h1>
      }
    </div>
  )
}

export default Home
