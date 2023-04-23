import React from 'react'
import { Routes, Route } from "react-router-dom"
import Navbar from './components/Layout/Navbar'
import './App.css'
import Footer from './components/Layout/Footer'
import Hero from './components/Layout/Hero'
import PagenotFound from './components/SubComponents/PagenotFound'
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { ToastContainer} from 'react-toastify';
import Home from './components/Home'
import Dashboard from './user/Dashboard'
import PrivateRoute from './routes/PrivateRoute'
import UserInfo from './user/UserInfo'
import ForgotPassword from './components/Auth/ForgotPassword'
import ChangePassword from './components/Auth/ChangePassword'
import AdminDashboard from './components/Admin/AdminDashboard'
import AdminRoute from './routes/AdminRoute'
const App = () => {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="home" element={<Home/>} />
        <Route path="login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute/>} >
          <Route path='user' element={<Dashboard />} />
          
          <Route path="admin"  element={<AdminDashboard />} />
        </Route>
        <Route path="" element={<AdminRoute/>} >
        <Route path='change-password' element={<ChangePassword />} />
        </Route>
        
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={ <ForgotPassword/>} />
        <Route path="products" element={ <h1>Products</h1> } />
        <Route path="category" element={ <h1>Categories</h1> } />
      </Routes>

      {/* <Hero/> */}
      {/* <PagenotFound/> */}
      {/* <Footer/> */}
    </div>
  )
}

export default App
