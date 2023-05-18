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
import CreateCategory from './components/Admin/CreateCategory'
import NewProduct from './components/Admin/NewProduct'
import UpdateProduct from './components/Admin/UpdateProduct'
import ParticularProduct from './components/ParticularProduct'
import SearchPage from './components/SearchPage'
import ParticularProductWithCategory from './components/ParticularProductWithCategory'
import CartItems from './components/CartItems'
import UpdateProfile from './user/UpdateProfile'
import OrderManagement from './components/Admin/OrderManagement'
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
          
        </Route>

        <Route path='carts' element={<CartItems/>}/>
        <Route path="" element={<PrivateRoute/>} >
          <Route path='change-password' element={<ChangePassword />} />
          <Route path='update-profile/:_id' element={<UpdateProfile/>}/>
        </Route>

        <Route path="/dashboard" element={<AdminRoute/>} >
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/new-product/:slug" element={<UpdateProduct/>} />
          <Route path="admin/new-product" element={<NewProduct />} />
          <Route path="admin/order-management" element={<OrderManagement/>}  />
        </Route>
        
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={ <ForgotPassword/>} />
        <Route path="product/:_id" element={<ParticularProduct />} />
        <Route path="home/product/:slug" element={ <ParticularProduct/> } />
        <Route path="products/:slug" element={<ParticularProductWithCategory/>} />
        <Route path="search" element={<SearchPage/>}/>
      </Routes>

      {/* <Hero/> */}
      {/* <PagenotFound/> */}
      {/* <Footer/> */}
    </div>
  )
}

export default App
