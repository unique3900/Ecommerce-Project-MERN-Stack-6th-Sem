import React from 'react'
import UserInfo from './UserInfo'
import { useAuth } from '../components/Context-State/auth'

const Dashboard = () => {
  const [auth, setAuth] = useAuth();
  return (
    <div className='mt-5'>
         <h3 className='text-4xl text-center font-bold'>Dashboard</h3>
        <UserInfo/>
    </div>
  )
}

export default Dashboard
