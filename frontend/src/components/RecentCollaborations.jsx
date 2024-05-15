import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getAllUsers } from '../services/UserRequests';
import { Avatar } from '@material-tailwind/react';
import { AuthContext } from '../context/AuthProvider';
import googledrive from '../assets/googledrive.png';
import github from '../assets/github.png';

function RecentCollaborations() {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [hoveredUser, setHoveredUser] = useState(null);

  useEffect(() => {
    getAllUsers()
      .then(data => {
        console.log('Users:', data);
        setUsers(data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  return (
    <div className='flex justify-start'>
      <div className="p-3 relative flex justify-center w-full max-w-[24rem]">
        {/* Display the avatar of the logged-in user
      {user && user.profilePicture && (
        <div className='relative ml-[-210px]'>
          
        </div>
      
        
      )} */}
        <div className='flex justify-start item-start'>
          <div className=' flex justify-start mr-11'>
            {/* <span className='w-[117px] h-[48px] font-bold flex justify-start'> */}
              {/* <p >Recent Collaborators</p> */}
            {/* </span> */}
          </div>
          <div className='flex justify-between w-[48px] h-[48px] absolute bottom-[-50px] left-[30px]'>
          <h2 className="font-outfit font-[800] text-[45px] text-start px-14 mb-2">Recent <span className="">Collaborators</span></h2>
           {/* Display avatars of other collaborators */}
           <div>
            
      {/* {hoveredUser && (
        <div className="absolute bottom-[10px] left-[20px] bg-white border border-gray-300 p-2 rounded shadow">
          <p>{hoveredUser.name}</p>
        </div>
      )} */}
            
           </div>
           
      {users.map(collaborator => (
    
          
       
    <Avatar size="l" variant="circular" 
          key={collaborator.id}
          src={collaborator.profilePicture}
          alt={collaborator.name} 
          onMouseEnter={() => setHoveredUser(collaborator)}
          onMouseLeave={() => setHoveredUser(null)}
          class="relative inline-block ! rounded-full object-cover object-center "
          />
      ))}
          </div>
        </div>
      </div>

      <div className='relative flex justify-end'>
        <div className='flex justify-end absolute right-[-1002px] m-6'>
           <h3 className='font-semibold text-3xl text-gray-800 mr-2'>Links</h3>
        
           <a
              href="https://www.google.com/intl/de/drive/"
              target="_blank"
              rel="noopener noreferrer"
              // className="mx-2"
            >
              <img
                src={googledrive}
                alt="Google Drive"
                className="w-[35px] h-[35px]"
              />
            </a>
       
         {/* <img src="./src/assets/googledrive.png" alt="Google Drive" className='w-[35px] h-[35px]' />  */}
     
         <a
          href='https://github.com/'
           target="_blank"
            rel="noopener noreferrer"
            className="mx-2"
          >
          <img 
         src={github} 
          alt="GitHub" 
          className="w-[35px] h-[35px]" 
          />
        </a>
        
        <img src="./src/assets/instagram.png" alt="Instagram" className='w-[35px] h-[35px]' />
        <img src="./src/assets/office.png" alt="MS Office" className='w-[35px] h-[35px]' />
        <img src="./src/assets/npm.png" alt="NPM" className='w-[35px] h-[35px]' />
        </div>
       
      </div>

      {hoveredUser && (
        <div className="absolute bottom-[10px] left-[20px] bg-white border border-gray-300 p-2 rounded shadow">
          <p>{hoveredUser.name}</p>
        </div>
      )}
    </div>
  );
}

export default RecentCollaborations;