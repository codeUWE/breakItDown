// import React, { useState, useEffect } from 'react';

function OpenSubTasks() {
  return (
    <div className='flex justify-end mr-20 py-5'>
      <div className=' border border-gray-900 rounded-[30px] w-[865px] h-[260px] bg-gray-200'>

        <div className="ml-4 font-semibold flex justify-between items-center">
          <h2 className="mr-auto">Open SubTasks</h2>
          <div className="flex justify-end items-center">
            <img src="./src/assets/yellowdot.png" alt="" className="mr-8 m-4 w-[18px] h-[18px]" />
          </div>
        </div>

        <div className='flex justify-start ml-8 '>
          <span>
            <p>
              Wireframing
            </p>

            {/* Nav component */}
            <div className='flex items-center w-[21px]'>
              <img src="./src/assets/wireanchor.png" alt="" className='w-[21px]h-[13px] ml-2 m-2' />
              <div className=' flex items-center ml-2'>
                <span>
                  <p className='text-blue-600 flex justify-center items-center'> Nav </p>
                  {(
                    <div className=' flex justify-end ml-8 bg-blue-gray-900'>
                    </div>
                  )}
                </span>
              </div>
            </div>
          </span>
        </div>

        

        {/* partitioning */}
        <div className='ml-4 m-2 w-[790.01px] border-t border-gray-600 flex-grow'>

         
        
        </div>

        {/* Footer component */}
        <div className='flex justify-start ml-8' >
          <span>
            <p>
              Dark Mode
            </p>
            <div className='flex items-center w-[21px]'>
              <img src="./src/assets/wireanchor2.png" alt="" className='w-[21px]h-[13px] ml-2 m-2' />
              <div className=' flex items-center ml-2'>
                <span>
                  <p className='text-blue-600 flex justify-center items-center py-3'> Footer </p>
                  {(
                    <div className='ml-2 bg-blue-gray-900'></div>
                  )}
                </span>
              </div>
            </div>
          </span>
        </div>

        {/* partitioning line starts */}
        <div className='ml-4 m-2 w-[790.01px] border-t border-gray-600 flex-grow'></div>
        {/* partitioning line ends */}

        {/* Updating controllers */}
        <div className='flex justify-start ml-8' >
          <span>
            <p>
              Updating Controllers
            </p>
          </span>
        </div>

      {/* wrapper div ends here */}
      </div>
    </div>
  )
}

export default OpenSubTasks;
