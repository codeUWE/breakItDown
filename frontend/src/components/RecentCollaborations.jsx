import React, { useEffect, useState } from 'react';
import { getAllUsers } from './GoodNews';
import { Avatar } from '@material-tailwind/react'; // Import the Avatar component

function RecentCollaborations() {
  const [users, setUsers] = useState([]);
  const [hoveredUser, setHoveredUser] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    // Fetch users
    getAllUsers()
      .then(data => {
        console.log('Users:', data); // Log the users data
        setUsers(data);
        if (users.length > 0) {
          // Generate a random index within the range of users array
          const randomIndex = Math.floor(Math.random() * users.length);
          // Set the logged-in user to the user at the random index
          setLoggedInUser(users[randomIndex]);
        }
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  return (
    <div className='flex justify-start'>
      <div className="p-3 relative flex justify-center w-full max-w-[24rem]">
        <div className='flex justify-start item'>
          <div className=' flex justify-start mr-11'>
            <span className='w-[117px] h-[48px] font-bold flex justify-start'>
              <p >Recent Collaborators</p>
            </span>
          </div>
          <div className='mr-11  flex items-end justify-between w-[48px] h-[48px]'>
            {loggedInUser && loggedInUser.profilePicture && (
              <Avatar src={loggedInUser.profilePicture} alt="LoggedInUser" onMouseEnter={() => setHoveredUser(loggedInUser)} onMouseLeave={() => setHoveredUser(null)} />
            )}
          </div>
        </div>
      </div>

      <div className='flex justify-center items-center ml-[200px]'>
        <h3 className='font-semibold'>Links+</h3>
        <img src="./src/assets/googledrive.png" alt="Google Drive" className='w-[35px] h-[35px]' />
        <img src="./src/assets/github.png" alt="GitHub" className='w-[35px] h-[35px]' />
        <img src="./src/assets/instagram.png" alt="Instagram" className='w-[35px] h-[35px]' />
        <img src="./src/assets/office.png" alt="MS Office" className='w-[35px] h-[35px]' />
        <img src="./src/assets/npm.png" alt="NPM" className='w-[35px] h-[35px]' />
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
