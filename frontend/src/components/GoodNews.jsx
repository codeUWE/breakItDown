import React, { useState, useEffect, useContext } from 'react'; // Add useContext
import { TestimonialCard } from './TestimonialCard';
import { getAllUsers } from '../services/UserRequests';
import { getNews, createNews, deleteNews, updateNews } from '../services/NewsRequests';
import { AuthContext } from '../context/AuthProvider'; // Assuming AuthContext is correctly implemented

function GoodNews() {
  const [inputValue, setInputValue] = useState("");
  const { user } = useContext(AuthContext); // Get the authenticated user from context
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [news, setNews] = useState([]);
  const [visibleNews, setVisibleNews] = useState([]);

  useEffect(() => {
    // Fetch news and users when the component mounts
    const fetchData = async () => {
      try {
        // Fetch news for all users
        const allNewsData = await getNews();
        
        // Filter news based on authentication status
        const filteredNewsData = allNewsData.filter(post => {
          // If user is authenticated, show their own posts and posts from other users
          // If user is not authenticated, show only posts from other users
          return user ? post.userId === user.id : true;
        });
  
        
        setNews(filteredNewsData);
        setVisibleNews(filteredNewsData.slice(0, 10)); // 
  
        // Fetch all users
        const usersData = await getAllUsers();
        setUsers(usersData);
  
        
        if (usersData.length > 0) {
          const randomIndex = Math.floor(Math.random() * usersData.length);
          setLoggedInUser(usersData[randomIndex]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [user]); // Triggering a data fetching here
  
  
  const handleDelete = async (id) => {

    try {
      await deleteNews(id);
      setNews(prevNews => prevNews.filter(item => item.id !==id));

    } catch (error) {
      console.error('Error deleting news:', error);
    }
    
  }

    const handleEdit = async (id, updatedData) => {
      try {
        const updatedNews = await updateNews(id, updatedData);
        setNews(prevNews => prevNews.map(item => (item.id === id ? updatedNews : item)));
      } catch (error) {
        console.error('Error updating news:', error);
      }
    }
  
  
  
  
  
  const handleSend = async () => {
    if (inputValue.trim() !== '') {
      try {
        const currentTime = new Date().toLocaleString();
        const formattedDateTime = formatDate(currentTime); // Format current time
        console.log("Message sent at:", formattedDateTime);
  
        const newPost = {
          name: user ? user.name : 'Anonymous', // 
          body: inputValue,
          timestamp: currentTime,
          userId: user ? user.id : null // 
        };
  
        // Update UI immediately
        setNews([newPost, ...news]);
        setVisibleNews([newPost, ...visibleNews]);
  
        await createNews(newPost);
  
        const updatedNews = await getNews();
        setNews(updatedNews);
        setVisibleNews(updatedNews.slice(0, 6)); // 
  
        setInputValue('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const amOrPm = hours >= 12 ? 'pm' : 'am';
  
    hours = hours % 12 || 12;
  
    return `${day}.${month}.${year} ${hours}:${minutes}${amOrPm}`;
  };
  
  const onDelete = async (postId) => {
    try {
      await deleteNews(postId);
      setNews(news.filter(post => post.id !== postId));
      setVisibleNews(news.filter(post => post.id !== postId)); // 
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };
  
  return (
    <div className='bg-[#EFF9FF] rounded-[30px] w-[1400px] ml-9'>
      <div className='relative'>
        <div className='flex justify-end items-center'>
          <div className='rounded-[20px] border-[2px] border-gray-900 outline-none placeholder-underline w-[522.85px] h-[430.58px] m-12 relative overflow-auto'>
            <div className='ml-2 font-semibold flex justify-between items-center '>
              <h2 className="text-blue-900 mr-auto text-1xl ">What's on your mind?</h2>
              <div className="flex justify-end items-center">
                <img src="./src/assets/yellowdot.png" alt="" className="mr-8 m-4 w-[18px] h-[18px]" />
              </div>
            </div>
            {visibleNews.map(post => (
              <TestimonialCard
                key={post.id}
                post={post}
                user={loggedInUser}
                onDelete={() => onDelete(handleDelete)}
                onEdit={handleDelete}
              />
            ))}
            <div className='relative'>
              <input
                type="text"
                placeholder="Share some good news"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="rounded-[15px] w-[506.63px] h-[36.87px] border-[2px] mt-4 border-gray-900 outline-none  pr-12 placeholder-underline"
              />
              <img
                src='./src/assets/sent.png'
                alt='send'
                className='w-[25px] h-[25px] cursor-pointer absolute right-[11px] top-[22px]'
                onClick={handleSend}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GoodNews;


































// import React, { useState, useEffect, useContext } from 'react'; // Add useContext
// import { TestimonialCard } from './TestimonialCard';
// import { getAllUsers } from '../services/UserRequests';
// import { getNews, createNews, deleteNews } from '../services/NewsRequests';
// import { AuthContext } from '../context/AuthProvider'; // Assuming AuthContext is correctly implemented
// import axios from 'axios';

// function GoodNews() {
//   const [inputValue, setInputValue] = useState("");
//   const { user } = useContext(AuthContext); // Get the authenticated user from context
//   const [users, setUsers] = useState([]);
//   const [loggedInUser, setLoggedInUser] = useState(null);
//   const [news, setNews] = useState([]);
//   const [visibleNews, setVisibleNews] = useState([]);
//   // Inside your functional component
// // const [newPostsCount, setNewPostsCount] = useState(0);

//   // useEffect(() => {
//   //   // Fetch news and users when the component mounts
//   //   const fetchData = async () => {
//   //     try {
//   //       const userIds = ['663f6b82d9e3220cf84763f9', '663f6bb0d9e3220cf84763fd', '663f6b43d9e3220cf84763ef'];
//   //       const newsDataPromises = userIds.map(userId => getNews(userId));
//   //       const allNewsData = await Promise.all(newsDataPromises);
//   //       const combinedNewsData = allNewsData.flat(); // Combine news items from all users into a single array
//   //       setNews(combinedNewsData);
//   //       setVisibleNews(combinedNewsData.slice(0, 10)); // Initially show only the first 10 news items

//   //       const usersData = await getAllUsers();
//   //       setUsers(usersData);
        
//   //       // Set the logged-in user if available
//   //       if (usersData.length > 0) {
//   //         const randomIndex = Math.floor(Math.random() * usersData.length);
//   //         setLoggedInUser(usersData[randomIndex]);
//   //       }
//   //     } catch (error) {
//   //       console.error('Error fetching data:', error);
//   //     }
//   //   };

//   //   fetchData();
//   // }, []);

//   useEffect(() => {
//     // Fetch news and users when the component mounts
//     const fetchData = async () => {
//       try {
//         // Fetch news for all users
//         const allNewsData = await getNews();
        
//         // Filter news based on authentication status
//         const filteredNewsData = allNewsData.filter(post => {
//           // If user is authenticated, show their own posts and posts from other users
//           // If user is not authenticated, show only posts from other users
//           return user ? post.userId === user.id : true;
//         });
  
//         // Set news data
//         setNews(filteredNewsData);
//         setVisibleNews(filteredNewsData.slice(0, 10)); // Initially show only the first 10 news items
  
//         // Fetch all users
//         const usersData = await getAllUsers();
//         setUsers(usersData);
  
//         // Set the logged-in user if available
//         if (usersData.length > 0) {
//           const randomIndex = Math.floor(Math.random() * usersData.length);
//           setLoggedInUser(usersData[randomIndex]);
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
  
//     fetchData();
//   }, [user]); // Trigger fetchData when user changes
  
//   const handleSend = async () => {
//     if (inputValue.trim() !== '') {
//       try {
//         const currentTime = new Date().toLocaleString();
//         const newPost = {
//           name: user ? user.name : 'Anonymous', // Use authenticated user's name or default to 'Anonymous'
//           body: inputValue,
//           timestamp: currentTime,
//           userId: user ? user.id : null // Associate the post with the authenticated user's ID
//         };
  
//         // Update UI immediately
//         setNews([newPost, ...news]);
//         setVisibleNews([newPost, ...visibleNews]);
  
//         await createNews(newPost);
  
//         const updatedNews = await getNews();
//         setNews(updatedNews);
//         setVisibleNews(updatedNews.slice(0, 6)); // Update visible news after adding a new post
  
//         setInputValue('');
//       } catch (error) {
//         console.error('Error sending message:', error);
//       }
//     }
//   };
  

//   const onDelete = async (postId) => {
//     try {
//       await deleteNews(postId);
//       setNews(news.filter(post => post.id !== postId));
//       setVisibleNews(news.filter(post => post.id !== postId)); // Update visible news after deleting a post
//     } catch (error) {
//       console.error('Error deleting post:', error);
//     }
//   };

  

//   return (
//     <div className='bg-[#EFF9FF] rounded-[30px] w-[1400px] ml-6'>
// <div className='relative'>
//       <div className='flex justify-center m-[150px]'>
//         <div className='rounded-[20px] border-[1px] border-gray-900 outline-none placeholder-underline w-[522.85px] h-[430.58px] m-12 relative overflow-auto'>
//           <div className='ml-2 font-semibold flex justify-between items-center'>
//             <h2 className="text-blue-900 mr-auto text-3xl">What's on your mind?</h2>
//             <div className="flex justify-end items-center">
//               <img src="./src/assets/yellowdot.png" alt="" className="mr-8 m-4 w-[18px] h-[18px]" />
//             </div>
//           </div>
       
//           {visibleNews.map(post => (
//             <TestimonialCard
//               key={post.id}
//               post={post}
//               user={loggedInUser}
//               onDelete={() => onDelete(post.id)}
              
//             />
//           ))}
//   <div className='relative'>
//   <input
//     type="text"
//     placeholder="Share some good news"
//     value={inputValue}
//     onChange={(e) => setInputValue(e.target.value)}
//     className="rounded-[15px]  w-[506.63px] h-[36.87px] border-[2px] mt-4 border-gray-900 outline-none placeholder-underline"
//   />
//   <img
//     src='./src/assets/sent.png'
//     alt='send'
//     className='w-[25px] h-[25px] cursor-pointer absolute right-[35px] top-[22px]'
//     onClick={handleSend}
//   />
// </div>
//         </div>
//       </div>
//     </div>

//     </div>
    
//   );
// }

// export default GoodNews;