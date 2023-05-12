import React from 'react'

const CartItems = () => {
  return (
    <div className='flex flex-col h-screen mt-5'>
          <div className="header">
              <h2 className='text-center text-4xl font-bold'>Your Cart</h2>
          </div>
          
          {/* Cart Item Box */}
          <div className="flex flex-col mt-5 w-full justify-center place-items-center gap-10">
              
              {/* Particular Item Listing */}
              <div className="flex w-2/3 md:w-full flex-col flex-wrap gap-3 lg:flex-row border-solid border-2 border-sky-500 py-2 px-5 justify-evenly items-center shadow-md">
                  <img src="https://www.trustedreviews.com/wp-content/uploads/sites/54/2022/10/iphone14promax-4-920x613.jpg" className='w-48' alt="" />

                  <p className="text-2xl">Iphone 14 Pro Max</p>
                  <div className="flex flex-row items-center justify-evenly gap-2">
                <button className='text-lg font-extrabold'>+</button>
                      <input type="number" name="cartValue" className='w-20 h-8 text-center border-solid border-2 border-sky-500' id="" value={2} />
                      <button className='text-lg font-extrabold'>-</button>
                  </div>

                  <div className="">
                      <button className="bg-red-600 text-white py-2 px-3 ">Remove</button>
                  </div>
             

              </div>


              <div className="flex w-2/3 md:w-full flex-col flex-wrap gap-3 lg:flex-row border-solid border-2 border-sky-500 py-2 px-5 justify-evenly items-center shadow-md">
                  <img src="https://www.trustedreviews.com/wp-content/uploads/sites/54/2022/10/iphone14promax-4-920x613.jpg" className='w-48' alt="" />

                  <p className="text-2xl">Iphone 14 Pro Max</p>
                  <div className="flex flex-row items-center justify-evenly gap-2">
                <button className='text-lg font-extrabold'>+</button>
                      <input type="number" name="cartValue" className='w-20 h-8 text-center border-solid border-2 border-sky-500' id="" value={2} />
                      <button className='text-lg font-extrabold'>-</button>
                  </div>

                  <div className="">
                      <button className="bg-red-600 text-white py-2 px-3 ">Remove</button>
                  </div>
             

              </div>



              <div className="flex w-2/3 md:w-full flex-col flex-wrap gap-3 lg:flex-row border-solid border-2 border-sky-500 py-2 px-5 justify-evenly items-center shadow-md">
                  <img src="https://www.trustedreviews.com/wp-content/uploads/sites/54/2022/10/iphone14promax-4-920x613.jpg" className='w-48' alt="" />

                  <p className="text-2xl">Iphone 14 Pro Max</p>
                  <div className="flex flex-row items-center justify-evenly gap-2">
                <button className='text-lg font-extrabold'>+</button>
                      <input type="number" name="cartValue" className='w-20 h-8 text-center border-solid border-2 border-sky-500' id="" value={2} />
                      <button className='text-lg font-extrabold'>-</button>
                  </div>

                  <div className="">
                      <button className="bg-red-600 text-white py-2 px-3 ">Remove</button>
                  </div>
             

              </div>



              <div className="flex w-2/3 md:w-full flex-col flex-wrap gap-3 lg:flex-row border-solid border-2 border-sky-500 py-2 px-5 justify-evenly items-center shadow-md">
                  <img src="https://www.trustedreviews.com/wp-content/uploads/sites/54/2022/10/iphone14promax-4-920x613.jpg" className='w-48' alt="" />

                  <p className="text-2xl">Iphone 14 Pro Max</p>
                  <div className="flex flex-row items-center justify-evenly gap-2">
                <button className='text-lg font-extrabold'>+</button>
                      <input type="number" name="cartValue" className='w-20 h-8 text-center border-solid border-2 border-sky-500' id="" value={2} />
                      <button className='text-lg font-extrabold'>-</button>
                  </div>

                  <div className="">
                      <button className="bg-red-600 text-white py-2 px-3 ">Remove</button>
                  </div>
             

              </div>


            



             


             
              <hr />
         
              <button className="bg-blue-600 text-white py-2 px-3 mt-2 w-full ">Check Out</button>
          </div>

          



          
          
    </div>
  )
}

export default CartItems
