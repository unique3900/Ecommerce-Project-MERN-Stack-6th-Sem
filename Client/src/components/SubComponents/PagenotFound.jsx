import React from 'react'
import {MdError} from 'react-icons/md';

const PagenotFound = () => {
  return (
      <div className='flex items-center justify-center h-screen'>
          <MdError className='w-96 h-80'/>
          <h3 className=' font-extrabold text-[50px] text-black'>Page Not Found</h3>
 </div>
  )
}

export default PagenotFound
