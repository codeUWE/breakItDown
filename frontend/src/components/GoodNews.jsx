import React, { useState, useEffect, useContext } from 'react'; // Add useContext
import { TestimonialCard } from './TestimonialCard';
import { getAllUsers } from '../services/UserRequests';
import { getNews, createNews, deleteNews } from '../services/NewsRequests';
import { AuthContext } from '../context/AuthProvider'; // Assuming AuthContext is correctly implemented
import axios from 'axios';

function GoodNews() {
  const [inputValue, setInputValue] = useState("");
  const { user } = useContext(AuthContext); // Get the authenticated user from context
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [news, setNews] = useState([]);
  const [visibleNews, setVisibleNews] = useState([]);
  // Inside your functional component
// const [newPostsCount, setNewPostsCount] = useState(0);

  useEffect(() => {
    // Fetch news and users when the component mounts
    const fetchData = async () => {
      try {
        const userIds = ['663f6b82d9e3220cf84763f9', '663f6bb0d9e3220cf84763fd', '663f6b43d9e3220cf84763ef'];
        const newsDataPromises = userIds.map(userId => getNews(userId));
        const allNewsData = await Promise.all(newsDataPromises);
        const combinedNewsData = allNewsData.flat(); // Combine news items from all users into a single array
        setNews(combinedNewsData);
        setVisibleNews(combinedNewsData.slice(0, 10)); // Initially show only the first 10 news items

        const usersData = await getAllUsers();
        setUsers(usersData);
        
        // Set the logged-in user if available
        if (usersData.length > 0) {
          const randomIndex = Math.floor(Math.random() * usersData.length);
          setLoggedInUser(usersData[randomIndex]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSend = async () => {
    if (inputValue.trim() !== '') {
      try {
        const currentTime = new Date().toLocaleString();
        const newPost = {
          name: loggedInUser ? loggedInUser.name : 'Anonymous',
          body: inputValue,
          timestamp: currentTime
        };

        // Update UI immediately
      setNews([newPost, ...news]);
      setVisibleNews([newPost, ...visibleNews]);

        await createNews(newPost);

        const updatedNews = await getNews();
        setNews(updatedNews);
        setVisibleNews(updatedNews.slice(0, 10)); // Update visible news after adding a new post

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
      setVisibleNews(news.filter(post => post.id !== postId)); // Update visible news after deleting a post
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  

  return (
    <div className='bg-[#EFF9FF] rounded-[30px] w-[1400px] ml-6'>
<div className='relative'>
      <div className='flex justify-center m-[150px]'>
        <div className=' mr-20 ml-14 rounded-[20px] border-[1px] border-gray-900 outline-none placeholder-underline w-[1000.85px] m-12 relative h-[500px] overflow-auto'>
          <div className='ml-2 font-semibold flex justify-between items-center'>
            <h2 className="text-blue-900 mr-auto text-3xl">What's on your mind?</h2>
            <div className="flex justify-end items-center">
              <img src="./src/assets/yellowdot.png" alt="" className="mr-8 m-4 w-[18px] h-[18px]" />
            </div>
          </div>
          <div className='relative'>
  <input
    type="text"
    placeholder="Share some good news"
    value={inputValue}
    onChange={(e) => setInputValue(e.target.value)}
    className="rounded-[15px] ml-24 w-[506.63px] h-[36.87px] border-[2px] mt-4 border-gray-900 outline-none placeholder-underline"
  />
  <img
    src='./src/assets/sent.png'
    alt='send'
    className='w-[25px] h-[25px] cursor-pointer absolute right-[250px] mr-[110px] top-[25px]'
    onClick={handleSend}
  />
</div>
          {visibleNews.map(post => (
            <TestimonialCard
              key={post.id}
              post={post}
              user={loggedInUser}
              onDelete={() => onDelete(post.id)}
              
            />
          ))}
          
        </div>
      </div>
    </div>

    </div>
    
  );
}

export default GoodNews;
