import React from 'react'
import heroImageShopping from '../../assets/heroImageShopping.jpg'

const Hero = () => {
  return (
      <div className='flex justify-center flex-col lg:flex-row items-center lg:justify-between lg:px-10 '>
            <div className='w-2/5 ' >
              <h3 className='text-7xl lg:text-9xl font-bold text-[#fea734]'>Reliable</h3>
              <h2 className=' text-6xl lg:text-7xl font-bold'>Safe</h2>
              <h3 className=' text-8xl lg:text-9xl font-bold text-[#a37df6]'>Faster</h3>
          </div>
          <div className= "w-full   lg:w-3/5 ">
          <img src={heroImageShopping} className='w-full h-[300px] lg:h-[500px]' alt="" />
          </div>
          
          
          
          
    </div>
  )
}

export default Hero
