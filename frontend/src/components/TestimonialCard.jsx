import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, Typography, Avatar } from '@material-tailwind/react';
  

export function TestimonialCard({ onDelete, onEdit, post, setPosts }) {
  const [timestamp, setTimestamp] = useState('');
  // const [posts, setPosts] = useState([]);
  const [editedValue, setEditedValue] = useState('');
  // const [user, setUser] = useState({
  //   name: "Random 'dane' Joe",
  //   position: 'Frontend Lead @ WBS',
  //   avatarSrc: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80'
  // });


  // const handleEdit = (index, newValue) => {
  //   setPosts(prevPosts => {
  //     const updatedPosts = [...prevPosts];
  //     updatedPosts[index] = { ...updatedPosts[index], message: newValue };
  //     return updatedPosts;
  //   });
  // };

  // const handleInputChange = (e) => {
  //   setEditedValue(e.target.value);
  // };

  // const handleSend = () => {
  //   if (editedValue.trim() !== '') {
  //     setPosts(prevPosts => [...prevPosts, { message: editedValue, user,timestamp:new Date ().getTime()}]);
  //     setEditedValue('');
  //   }
  // };

  // const handleDelete = (index) => {
  //   setPosts(prevPosts => prevPosts.filter((_, i) => i !== index));
  // };

  return (
    <div className=" ml-35">
      
      <Card color="transparent" shadow={false} className="w-[522.85px] ">
        <CardHeader
          color="transparent"
          floated={false}
          shadow={false}
          className="mx-0 flex items-center pt-0"
        >
          <Avatar
            size="xs"
            variant="circular"
            src={post.user.avatarSrc}
            alt={post.user.name}
          />  
         
          <div className="flex flex-col">
          
            <div>
              <Typography variant="h5" color="blue-gray" className="text-xs ">
                {post.user.name}
              </Typography>
            </div>
            <Typography color="blue-gray" className="text-xs">
              {/* {post.user.position} */}
            </Typography>
          </div> 
           
        </CardHeader> 
      
        <CardBody className="p-2 justify-center overflow-auto ">
       

            <div>
              {/* <div className="flex items-center">
                <Avatar
                  size="xs"
                  variant="circular"
                  src={post.user.avatarSrc}
                  alt={post.user.name}
                />
                <Typography className=" text-xs ml-2">{post.user.name}</Typography>
              </div> */}
              <Typography className="text-xs">{post.message}</Typography>
               {/* partitioning */}
        <div className='mr-12 w-[483] m-2 border-t border-gray-600 flex-grow'>

         
        
</div>
{/*               
              {/* <div className="flex justify-end mt-3 text-xs">
                <button onClick={() => handleEdit( editedValue)} className="text-gray-400 mr-2">Edit</button>
                <button onClick={() => handleDelete()} className="text-gray-400">Delete</button>
              </div> */} 
             <Typography className="text-xs text-gray-500 mt-1">
  <div>
    <p>Sent at:</p>
    <p>{post.timestamp}</p>
  </div>
</Typography>
            </div>
          
        </CardBody>  
       
      </Card>

     
    </div>
    
    
  );
}
