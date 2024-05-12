import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAllRoles, getRoleById } from '../services/RoleRequests';
import { getAllUsers, getUsersById } from '../services/UserRequests';

function TeamView() {
  const [socialNetworks, setSocialNetworks] = useState('Social Networks');
  const [isEditing, setIsEditing] = useState(false);
  const [editedSocialNetworks, setEditedSocialNetworks] = useState('');
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch roles
    getAllRoles()
      .then(data => {
        console.log('Roles:', data); // Log the roles data
        setRoles(data);
      })
      .catch(error => {
        console.error('Error fetching roles:', error);
      });

    // Fetch users
    getAllUsers()
      .then(data => {
        console.log('Users:', data); // Log the roles data
        setUsers(data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);



  const handleEditClick = () => {
    setIsEditing(true);
    setEditedSocialNetworks(socialNetworks);
  };

  const handleSaveClick = () => {
    setSocialNetworks(editedSocialNetworks);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    setEditedSocialNetworks(e.target.value);
  };

  return (
    <div className='w-[1150px] h-[530px] rounded-[30px] border-[2px] border-black flex items-center relative m-[80px]'>
      <div className='flex justify-center'>
        <div>
          <div className='ml-[12px] w-[292px] h-[508px] rounded-[20px] border-[2px] border-black flex justify-start'>
            <div>
           
              <img
                src="./src/assets/editpen.png"          
                alt="edit_pencil"
                className='w-[36px] h-[36px] flex justify-end items-end ml-[230px] absolute top-[20px]'
                onClick={handleEditClick}
              />
              <img
                src="./src/assets/logo_flag.png"
                alt="logo-flag"
                className='h-[169px] ml-[110px] flex justify-center items-center mr-[718px]'
              />
              <div className='flex justify-center mr-[590px] relative z-[12px]'>
                <img src="./src/assets/user2.png" alt="user2" className='w-[89px] h-[89px] absolute top-[-30px] ml-[40px]'/>
              </div>
              <div className='text-xs ml-[100px] relative top-[14px]'>
                <div className='absolute bottom-[-145px]'>
                  <div className='flex justify-start font-bold text-3xl'>
                    <h1>Name</h1>
                  </div>
                  <p>Email:</p>
                  <p>Role: </p>
                  <p>Skills: </p>
                  <p className=''>Social Networks: {isEditing ? (
                    <>
                     
                    </>
                  ) : (
                    socialNetworks
                  )}</p>
                </div>
              </div>
            </div>
          </div>
          {/* Add a pop-up modal for editing */}
          {isEditing && (
          <div className="fixed top-0 left-[100px] w-full h-full flex justify-start items-center">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Edit Social Networks</h2>
            <input
  type="text"
  value={editedSocialNetworks}
  onChange={handleInputChange}
  className="w-full border border-gray-300 rounded px-2 py-1 mb-2"
  autoFocus  // Add the autoFocus attribute here
/>
            <div className="flex justify-center"> {/* Adjusted positioning */}
              <button onClick={handleSaveClick} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Save</button>
              <button onClick={() => setIsEditing(false)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded">Cancel</button>
            </div>
          </div>
        </div>
          )}
          
          {/* End of pop-up modal */}
          <div className='absolute bottom-1'>
            <div className='ml-[322px] w-[308px] h-[328px] rounded-[20px] border-[2px] border-black flex justify-start' style={{ marginBottom: '5px' }}>
              <div className="relative">
                <h1 className="font-bold text-3xl ml-[109px] absolute top-[6px]">Leaders</h1>
              </div>
              <img src="./src/assets/logo_flag.png" alt="logo-flag" className='ml-[27px] w-[68px] h-[325px]  flex justify-start items-start mr-[740px]'/>
              {/* First developer */}
              <div className="absolute top-[50px] left-[340px] flex flex-col items-start ">
                <img src="./src/assets/user4.png" alt="user2" className='w-[89px] h-[89px]'/>

                <div className='flex'>
                  <div className='absolute top-2 left-[100px]'>
                    <p className="text-xs">Name:</p>
                    <p className="text-xs">Email:</p>
                    <p className="text-xs">Skills</p>
                    <p className="text-xs">Social Networks</p>
                  </div>
                  <img src="./src/assets/user5.png" alt="user2" className='w-[89px] h-[89px] absolute bottom-[-125px]'/>
                  <div className='absolute bottom-[-120px] left-[100px]'>
                    <p className="text-xs">Name:</p>
                    <p className="text-xs">Email</p>
                    <p className="text-xs">Skills</p>
                    <p className="text-xs">Social Networks:</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Replace "down right" with "Developers" and make it bold */}
          <div className='absolute bottom-2 left-1/2 transform -translate-x-1/2 flex justify-between ml-[296px]'>
            <div className='mb-1 ml-10 w-[499px] h-[328px] rounded-[20px] border-[2px] border-black'>
              <h1 className="ml-[12px] mt-1 font-bold text-3xl">Developers</h1>
              
             <div className='text-xs flex justify-start flex-col'>
              <img src="./src/assets/user4.png" alt="user2" className='w-[49px] h-[49px] ml-2 m-6'/>
           
           <div className='absolute top-[72px] ml-[90px]'>
            <p>Name</p>
            <p>Email</p>
            
           </div>
            
             </div>
              
            
              <div className='flex justify-center ml-4  w-[461px] border-t border-gray-900 flex-grow absolute top-[130px]'></div>
              <div className=' text-xs absolute top-[50px] left-[290px] m-6'>
                <p>Skills:</p>
                <p>Social Networks
                  <p></p>
                </p>
              </div>


              {/* Add more developer info */}
              <div className='text-xs flex justify-start flex-col'>
              <img src="./src/assets/user4.png" alt="user2" className='w-[49px] h-[49px] ml-2 m-6'/>
           
           <div className='absolute bottom-[132px] ml-[90px]'>
            <p>Name</p>
            <p>Email</p>
            
           </div>
            
             </div> 

             <div className='flex justify-start items-start absolute top-[220px]'>
             <img src="./src/assets/user4.png" alt="user2" className='w-[49px] h-[49px] ml-2 m-6'/>
             </div>

             <div className='text-xs absolute top-[250px] ml-[90px]'>
              <p>Name:</p>
                <p>Email</p>
             </div>
             
              <div className='flex absolute bottom-[80px] top-[220px] justify-center ml-4 m-1 w-[461px] border-t border-gray-900 flex-grow'></div>
              <div className='text-xs absolute top-[229.10px] left-[290px] m-6'>
                <p>Skills:</p>
                <p>Social Networks 
                </p>
              </div>


              <img src="./src/assets/user3.png" alt="user2" className='w-[49px] h-[49px] ml-2 absolute bottom-[125px]'/>
              <div className='text-xs absolute bottom-[-2px] right-[350px] m-6'>
               
              </div>
              <div className='flex absolute bottom-[30px] justify-center ml-4 m-[-5px] w-[461px] border-t border-gray-900 flex-grow'></div>
              <div className='text-xs absolute bottom-[100px] left-[290px] m-6'>
                <p>Skill</p>
                <p>Social Network 
                </p>
              </div>
            </div> 
          </div>
          <div className='absolute top-2 right-2'>
            <div className='relative'>
              <div>
                {/* <img src="./src/assets/user3.png" alt="user2" className='m-[74px] w-[89px] h-[89px] absolute top-[-30px] ml-[18px]'/>   */}
              </div>
            </div>
            <div className='w-[816px] h-[172px] rounded-[20px] border-[2px] border-black flex justify-end items-start'>
              <h1 className=' font-bold text-3xl absolute left-[109px]'>Owner</h1>
              <img src="./src/assets/logo_flag.png" alt="logo-flag" className='h-[169px] flex justify-start items-start mr-[718px] sticky'/>
 {/* Map and render product owners */}
 {roles.map(role => (
            role.name === 'Product Owner' && (
              <div key={role._id} className="text-xs absolute top-1/2 left-[500px] transform -translate-y-1/2">
                <p className='ml-12'>Skills: {roles[0].name.permission} </p>
                <p>Social Networks:</p>
                {/* Get users by role ID and map to render */}
                {/* {getUsersByRole(role._id).map(user => ( */}
                  <div className='flex flex-col absolute right-[439px] top-[4px] '> 
                    {/* <p>Name:{user.name} </p> */}
                    <p>Email:</p>
                  </div>
                {/* ))} */}
              </div>
            )
          ))}
        </div> 





              <img src="./src/assets/user3.png" alt="user2" className='m-[74px] w-[89px] h-[89px] absolute left-[-60px] top-[-30px]'/> 



              <div className="text-xs absolute top-1/2 left-[500px] transform -translate-y-1/2">
                <p>Skills:</p>
                <p>Social Networks:</p>
                <div className='flex flex-col absolute right-[439px] top-[4px] '> 
                  <p>Name: </p>
                  <p>Email:</p>
                </div>
              </div>
            </div> 
          </div> 
        </div>
      </div>
    // </div>
  );
}

export default TeamView;
