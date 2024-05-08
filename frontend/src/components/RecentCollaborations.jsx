import React from 'react'


function RecentCollaborations() {
  return (

<div className='flex justify-start'> 

        <div className="p-3 relative flex justify-center w-full max-w-[24rem]">


<div className='flex justify-start item'>
  <div className=' flex justify-start mr-11'>
               <span className='w-[117px] h-[48px] font-bold flex justify-start'>
            <p >Recent Collaborators</p>
          </span>
          </div>
       
          <div className='mr-11  flex items-end justify-between w-[48px] h-[48px] '>
            <img className='-m-1' src="./src/assets/user2.png" alt="random-user1" />
            <img className='-m-1' src="./src/assets/user3.png" alt="random-user2" />
            <img className='-m-1' src="./src/assets/user1.png" alt="random-user3" />
          </div>

           </div>
</div>
          
        

  <div className='flex justify-center'>
  <h3 className='font-semibold'>Links+</h3>
  
     <img src="./src/assets/googledrive.png" alt="goole-drive" className='w-[35px] h-[35px]'/>
     <img src="./src/assets/github.png" alt="GitHub" className='w-[35px] h-[35px]' />
     <img src="./src/assets/instagram.png" alt="Instagram" className='w-[35px] h-[35px]'/>
     <img src="./src/assets/office.png" alt="Ms_Office" className='w-[35px] h-[35px]'/>
     <img src="./src/assets/npm.png" alt="NPM" className='w-[35px] h-[35px]' />
</div>

    </div>
  )
}

export default RecentCollaborations;
