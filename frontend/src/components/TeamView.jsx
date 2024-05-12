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
  const [loggedInUser, setLoggedInUser] = useState(null);

  const productOwnerRole = roles.find(role => role.name === "Product Owner");
  const productLeaderRole = roles.find(role => role.name === "Team Leader");
  const productDeveloperRole = roles.find(role => role.name === "Developer");
  const productDeveloperName = users.find(users => users.name === "Bill Dev")
  const productOwnerName = users.find(users => users.name === "John Doe");
  const productLeaderUserName = users.find(users => users.name === "Jane Doe" )
  // const productOwnerName = users.find(users => users.name === "Jane Doe");
  // const productOwnerEmail = users.find(users => users.email === "john@admin.com");
  






  
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
.then(users => {
  console.log('Users:', users); // Log the roles data
  setUsers(users);

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
// // Simulate logged-in user (replace with actual logic to get logged-in user)
// const users = JSON.parse(localStorage.getItem('users'));
// if (users) {
//   setLoggedInUser(users);
// }


  }, []);

  // const filterUsersByRole = (roleId) => {
  //   return users.filter(user => user.roleId === roleId);
  // };
  
  // // Usage example
  // const developerRoleId = "662bc0e4e2f80bbd2cb97d91"; // Example role ID for developers
  // const developerUsers = filterUsersByRole(developerRoleId);
  // console.log("Developer Users:", developerUsers);


  // Filter users by role
  // const getProductOwners = () => {
  //   const productOwnerRoleId = roles.find(role => role.name === "Product Owner")?.id;
  //   if (!productOwnerRoleId) return [];
  //   return users.filter(user => user.roleId === productOwnerRoleId);
  // };


  const handleEditClick = () => {
    setIsEditing(true);
    setEditedSocialNetworks(socialNetworks);
  };

  const handleSaveClick = () => {
    setSocialNetworks(editedSocialNetworks);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedSocialNetworks(''); // Reset the edited value
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
                {loggedInUser && loggedInUser.profilePicture && (
                   <img 
                   src={loggedInUser.profilePicture} alt="user2" className='w-[90px] h-[90px] absolute top-[-30px] ml-[40px] rounded-full'/>
                )}
               
              </div>
              <div className='text-xs ml-[100px] relative top-[14px]'>
                <div className='absolute bottom-[-145px]'>
                  <div className='flex justify-start font-bold text-3xl'>
                    <h1>{loggedInUser && loggedInUser.name} </h1>
                  </div>
                  <p>{loggedInUser && loggedInUser.email}</p>
                
                  {/* <p>Role:{loggedInUser && loggedInUser.role} </p> */}
                  {/* <p>Skills: </p> */}
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
            <div className="fixed top-[240px] left-[100px] w-full h-full flex justify-start items-start">
              <div className="bg-gray-300 p-4 rounded">
                <h2 className="text-xl font-bold mb-4">Edit Social Networks</h2>
                <input
                  type="text"
                  value={editedSocialNetworks}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-2 py-1 mb-2"
                  autoFocus
                />
                <div className="flex justify-center">
                  <button onClick={handleSaveClick} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                    Save
                  </button>
                  <button onClick={handleCancelClick} className="bg-gray-300 text-gray-700 px-4 py-2 rounded">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
          
           {/* End of pop-up modal */}
           <div className='absolute bottom-1'>
            <div className='ml-[322px] w-[308px] h-[328px] rounded-[20px] border-[2px] border-black flex justify-start' style={{ marginBottom: '5px' }}>
              <div className="relative">
              <h1 className="font-bold text-3xl ml-[109px] absolute top-[6px] whitespace-nowrap">
  {productLeaderRole && (
    <p key={productLeaderRole.id}>{productLeaderRole.name}</p>
  )}
</h1>
              </div>
              <img src="./src/assets/logo_flag.png" alt="logo-flag" className='ml-[27px] w-[68px] h-[325px]  flex justify-start items-start mr-[740px]'/>
              {/* First developer */}
              <div className="absolute top-[50px] left-[340px] flex flex-col items-start ">
                <img src= {productLeaderUserName?.profilePicture} alt="user2" className='w-[100px] h-[100px] rounded-full'/>

                <div className='flex'>
                  <div className='absolute top-2 left-[100px]'>
                    {productLeaderUserName && (
                      <p key={productLeaderUserName.id}> {productLeaderUserName.name}  </p>
                    )}
                  {/* <p key={productLeaderRole.id}>{productLeaderRole.name}</p> */}
                    <p className="text-xs"> {productLeaderUserName?.email}  </p>
                    {/* <p className="text-xs">Skills</p> */}
                    <p className="text-xs"> {productLeaderUserName?.socialConnections}  </p>
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
              <h1 className="ml-[12px] mt-2 font-bold text-3xl"> {productDeveloperRole && ( 
               <p key={productDeveloperRole.id}>{productDeveloperRole.name}</p> 
               
               )}</h1>
              
             <div className='text-xs flex justify-start flex-col'>
              {/* <img src="./src/assets/user4.png" alt="user2" className='w-[49px] h-[49px] ml-2 m-6'/> */}
           
           <div className='absolute top-[72px] ml-[90px]'>
           {productDeveloperName && ( 
               <p key={productDeveloperName.id}>{productDeveloperName.name} </p> 
               
               
               )}
           
            <p> </p>
            
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
              <h1 className=' font-bold text-3xl absolute left-[109px]'>
{productOwnerRole && (
      <p key={productOwnerRole.id}>{productOwnerRole.name}</p>
    )}</h1>
              <img src="./src/assets/logo_flag.png" alt="logo-flag" className='h-[169px] flex justify-start items-start mr-[718px] sticky'/>
 

              <img src="https://images.unsplash.com/photo-1521119989659-a83eee488004?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBvcnRyYWl0fGVufDB8fDB8fHww" alt="user2" className='m-[74px] w-[89px] h-[89px] absolute left-[-60px] top-[-30px]'/> 



              <div className="text-xs absolute top-1/2 left-[500px] transform -translate-y-1/2">
              {/* {roles.map(roles => <p key={roles.id}>{roles.name}

</p>)} */}
{/* 
{productOwnerRole && (
      <p key={productOwnerRole.id}>{productOwnerRole.name}</p>
    )} */}


{productOwnerName && ( 
               <p key={productOwnerName.id}>{productOwnerName.socialConnections}</p> 
               
               )}
                <p>Social Networks:</p>
                <div className='flex flex-col absolute right-[320px] top-[4px] ' style={{ width: '150px' }}> {/* Adjust width as needed */}
               {productOwnerName && ( 
               <p key={productOwnerName.id}>{productOwnerName.name}</p> 
               
               )}
                
                 {/* {users.map(users => <p key={users.id}>{users.email}

</p>)} */}
                 {productOwnerName && ( 
               <p key={productOwnerName.id}>{productOwnerName.email}</p> 
               
               )}
                </div>
              </div>
            </div> 
          </div> 
        </div>
      </div>
    </div>
  );
}

export default TeamView;