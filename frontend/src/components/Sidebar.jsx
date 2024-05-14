import React from 'react'

const Sidebar = () => {
  return (
    <div>
        <nav className='h-full flex flex-col border-r shadow-sm '>
            <div className='p-4 pb-2 flex justify-between items-center'>
            <Avatar
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="avatar"
          size="xl"
          withBorder={true}
          // className="w-[29px] h-[29px] absolute top- left-0 z-50"
          className="m-3"
        />
            
            </div>
        </nav>
    </div>
  )
}

export default Sidebar