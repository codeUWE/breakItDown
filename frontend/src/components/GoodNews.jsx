import React, { useState, useEffect } from 'react';
import { TestimonialCard } from './TestimonialCard';
import { Avatar } from '@material-tailwind/react';
import axios from 'axios';

function GoodNews() {
  const [inputValue, setInputValue] = useState("");
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getAllUsers();
        // setUsers(usersData);
        console.log(usersData)
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSend = async () => {
    if (inputValue.trim() !== '') {
      try {
        const usersData = await getAllUsers();
        const user = usersData[0]; // Assuming the first user is the current user
        const currentTime = new Date().toLocaleString();
        const newPost = { id: Date.now(), message: inputValue, user, timestamp: currentTime };
        setPosts(prevPosts => [newPost, ...prevPosts]); // Insert the new post at the beginning of the array
        setInputValue('');
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
  };
  

  const onDelete = (postId) => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
  };

  const onEdit = (postId, newMessage) => {
    setPosts(prevPosts => prevPosts.map(post => {
      if (post.id === postId) {
        return { ...post, message: newMessage };
      }
      return post;
    }));
  };

  return (
    <div>
      <div className='flex justify-end mt-6'>
        <div className='mr-20 ml-14 rounded-[20px] border border-gray-900 outline-none placeholder-underline w-[522.85px] relative h-[200px] overflow-auto'>
          <div className='ml-2 font-semibold flex justify-between items-center'>
            <h2 className="text-blue-600 mr-auto">Good News</h2>
            <div className="flex justify-end items-center">
              <img src="./src/assets/yellowdot.png" alt="" className="mr-8 m-4 w-[18px] h-[18px]" />
            </div>
          </div>
          {posts.map(post => (
            <TestimonialCard
              key={post.id}
              post={post}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
          <div className='input-field flex justify-center items-center border-gray-300 rounded'>
            <input
              type="text"
              placeholder="Share some good news"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              className="rounded-[15px] ml-2 w-[506.63px] h-[36.87px] border border-gray-900 outline-none placeholder-underline"
            />
            <img
              src='./src/assets/sent.png'
              alt='send'
              className='w-[25px] h-[25px] cursor-pointer'
              onClick={handleSend}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GoodNews;

// Get all users from the backend
export const getAllUsers = async () => {
  try {
    const response = await axios.get('http://localhost:3001/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
