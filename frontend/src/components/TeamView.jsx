import React, { useState } from 'react';

function TeamView() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [socialNetworks, setSocialNetworks] = useState('');
  const [role, setRole] = useState('');
  const [skills, setSkills] = useState('');

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
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
                className='w-[36px] h-[36px] flex justify-end items-end ml-[225px] absolute top-[20px]'
                onClick={handleEditClick}
              />
              <img
                src="./src/assets/logo_flag.png"
                alt="logo-flag"
                className='h-[169px] ml-[110px] flex justify-center items-center mr-[718px]'
              />
              <div className='flex justify-center mr-[590px] relative z-[12px]'>
                <img src="./src/assets/user2.png" alt="user2" className='w-[89px] h-[89px] absolute top-[-30px] ml-[49px]'/>
              </div>
              
              {isEditing ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => handleInputChange(e, setName)}
                  className='font-bold text-3xl ml-[103px] m-14'
                />
              ) : (
                <h1 className='font-bold text-3xl ml-[103px] m-14'>{name}</h1>
              )}

              <div className=' text-xs ml-[100px] relative top-[-35px]'>
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => handleInputChange(e, setEmail)}
                    />
                    <input
                      type="text"
                      value={socialNetworks}
                      onChange={(e) => handleInputChange(e, setSocialNetworks)}
                    />
                    <input
                      type="text"
                      value={role}
                      onChange={(e) => handleInputChange(e, setRole)}
                    />
                    <input
                      type="text"
                      value={skills}
                      onChange={(e) => handleInputChange(e, setSkills)}
                    />
                  </>
                ) : (
                  <div className='absolute bottom-[-122px]'>
                    <p>Email: {email}</p>
                    <p>Social Networks: {socialNetworks}</p>
                    <p>Role: {role}</p>
                    <p>Skills: {skills}</p>
                  </div>
                )}
              </div>
              {isEditing && (
                <button onClick={handleSaveClick}>Save</button>
              )}
            </div>
            {/* left bar */}
          </div>
          
          <div className='absolute bottom-1'>
            <div className='ml-[322px] w-[308px] h-[328px] rounded-[20px] border-[2px] border-black flex justify-start' style={{ marginBottom: '5px' }}>
              <div className="relative">
                <h1 className="font-bold text-3xl ml-[109px] absolute top-[6px]">Leaders</h1>
              </div>
              <img src="./src/assets/logo_flag.png" alt="logo-flag" className='ml-[27px] w-[68px] h-[325px] flex justify-start items-start mr-[740px]'/>
              {/* First developer */}
              {/* <div className="absolute top-0 left-0 flex flex-col items-start">
                <img src="./src/assets/user2.png" alt="user2" className='w-[89px] h-[89px]'/>
                <p className="text-xs">Name</p>
                <p className="text-xs">Email</p>
                <p className="text-xs">Skills</p>
                <p className="text-xs">Connections</p>
              </div> */}
              {/* Second developer */}
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
            <div className='mb-15 ml-10 w-[499px] h-[328px] rounded-[20px] border-[2px] border-black'>
              <h1 className="ml-[12px] mt-1 font-bold text-3xl">Developers</h1>
               <img src="./src/assets/user4.png" alt="user2" className='w-[49px] h-[49px] ml-2 m-6'/>

               <div className='text-xs absolute top-[50px] right-[350px] m-6'>
                <p>Name:</p>
                <p>Email:</p>
               </div>
               <div className='flex justify-center ml-4 m-1 w-[461px] border-t border-gray-900 flex-grow'></div>

               <div className='text-xs absolute top-[50px] left-[300px] m-6'>
                <p>Skills:</p>
                <p>Social Networks:</p>
               </div>

            </div> 
      
           
          </div>
          


          <div className='absolute top-2 right-2'>
            <div className='relative'>
              <div>
                <img src="./src/assets/user3.png" alt="user2" className='m-[74px] w-[89px] h-[89px] absolute top-[-30px] ml-[18px]'/>  
              </div>
            </div>
          
            <div className='w-[816px] h-[172px] rounded-[20px] border-[2px] border-black flex justify-end items-start'>
              {/* <h1>top</h1> */}
              
              <h1 className=' font-bold text-3xl absolute left-[109px]'>Owner</h1>
          
              <img src="./src/assets/logo_flag.png" alt="logo-flag" className='h-[169px] flex justify-start items-start mr-[718px]'/>
              
              {/* Add the <p> tags for Skills and Social Connections */}
              <div className="text-xs absolute top-1/2 left-[500px] transform -translate-y-1/2">
                <p>Skills:</p>
                <p>Social Networks:</p>

                <div className='flex flex-col absolute right-[439px] top-[4px] '> 
                  <p>Name:</p>
                  <p>Email:</p>
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
