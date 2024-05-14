import React, { useState, useEffect } from 'react';
import { TestimonialCard } from './TestimonialCard';
import { getAllUsers } from '../services/UserRequests';
import { getNews, createNews, deleteNews } from '../services/NewsRequests';
import axios from 'axios';

function GoodNews() {
  const [inputValue, setInputValue] = useState("");
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const userIds = ['663f6b82d9e3220cf84763f9', '663f6bb0d9e3220cf84763fd', '663f6b43d9e3220cf84763ef'];
        const newsDataPromises = userIds.map(userId => getNews(userId));
        const allNewsData = await Promise.all(newsDataPromises);
        const combinedNewsData = allNewsData.flat(); // Combine news items from all users into a single array
        setNews(combinedNewsData);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();

    // Fetching users if needed
    const fetchUsers = async () => {
      try {
        const usersData = await getAllUsers();
        setUsers(usersData);
        
        // Set the logged-in user if available
        if (usersData.length > 0) {
          const randomIndex = Math.floor(Math.random() * usersData.length);
          setLoggedInUser(usersData[randomIndex]);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSend = async () => {
    if (inputValue.trim() !== '') {
      try {
        const currentTime = new Date().toLocaleString();
        const newPost = {
          name: loggedInUser ? loggedInUser.name : 'Anonymous', // Using loggedInUser's name if available
          body: inputValue,
          timestamp: currentTime
        };
  
        // Call createNews function with the newPost data
        await createNews(newPost);
  
        // Refresh news list after creating the news item
        const updatedNews = await getNews();
        setNews(updatedNews);
  
        setInputValue('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };
  
  const onDelete = async (postId) => {
    try {
      await deleteNews(postId);
      setNews(news.filter(post => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div>
      <div className='flex justify-end mt-6'>
        <div className='mr-20 ml-14 rounded-[20px] border-[2px] border-gray-900 outline-none placeholder-underline w-[522.85px] relative h-[200px] overflow-auto'>
          <div className='ml-2 font-semibold flex justify-between items-center'>
            <h2 className="text-blue-600 mr-auto">Good News</h2>
            <div className="flex justify-end items-center">
              <img src="./src/assets/yellowdot.png" alt="" className="mr-8 m-4 w-[18px] h-[18px]" />
            </div>
          </div>
          {news.map(post => (
            <TestimonialCard
              key={post.id}
              post={post}
              user={loggedInUser} // Pass loggedInUser as a prop
              onDelete={() => onDelete(post.id)}
            />
          ))}
          <div className='input-field flex justify-center items-center border-gray-300 rounded'>
            <input
              type="text"
              placeholder="Share some good news"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              className="rounded-[15px] ml-2 w-[506.63px] h-[36.87px] border-[2px] absolute left-[-5px] border-gray-900 outline-none placeholder-underline"
            />
            <img
              src='./src/assets/sent.png'
              alt='send'
              className='w-[25px] h-[25px] cursor-pointer absolute right-[12px]'
              onClick={handleSend}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GoodNews;
