import React from 'react';
import { useEffect } from 'react';

function TeamView() {


  return (
    <div className='w-[1150px] h-[530px] rounded-[30px] border-[2px] border-black flex items-center relative'>
      
      <div className='flex justify-center'>
<div>
   <div className='ml-[12px] w-[292px] h-[508px] rounded-[20px] border-[2px] border-black flex justify-start'>
        left bar
        <img src="./src/assets/editpen.png" alt="edit_pencil" className='w-[36px] h-[36px] flex justify-end items-end ml-[190px] m-2'  />
      </div>
      
      <div className='absolute bottom-1'>
        <div className='ml-[322px] w-[308px] h-[328px] rounded-[20px] border-[2px] border-black flex justify-start' style={{ marginBottom: '5px' }}>
          
          <img src="./src/assets/logo_flag.png" alt="" className='ml-[27px] w-[68px] h-[325px] flex justify-start items-start mr-[740px]'/>
          
        </div>
      </div>
      

      <div className='absolute bottom-2 left-1/2 transform -translate-x-1/2 flex justify-between ml-[296px]'>
         <div className='mb-15 ml-10 w-[499px] h-[328px] rounded-[20px] border-[2px] border-black'>
        <h1>here</h1>
      </div> 
      </div>
    
      
      <div className='absolute top-2 right-2'>
        
        <div className='w-[816px] h-[172px] rounded-[20px] border-[2px] border-black flex justify-end items-start'>
          {/* <h1>middle top</h1> */}
          <img src="./src/assets/logo_flag.png" alt="" className='h-[169px] flex justify-start items-start mr-[718px]'/>
        </div>
      </div> 
</div>

      
      </div>

      
      
    </div>
  );
}

export default TeamView;
