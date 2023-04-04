import React from 'react'
import { Routes, Route } from "react-router-dom"
import Navbar from './components/Layout/Navbar'
import './App.css'
import Footer from './components/Layout/Footer'
import Hero from './components/Layout/Hero'
const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<h1>Home</h1>} /> */}
        {/* <Route path="home" element={ <h1>Home</h1> } /> */}
        <Route path="products" element={ <h1>Products</h1> } />
        <Route path="category" element={ <h1>Categories</h1> } />
      </Routes>

      <Hero/>
      {/* <Footer/> */}
    </div>
  )
}

export default App
