import React, { useState } from 'react';
import { TestimonialCard } from './TestimonialCard';
import Schedule from './Schedule';
// import App from "./App.css";
import OpenSubTasks from './OpenSubTasks';
import { Avatar } from '@material-tailwind/react';

function GoodNews() {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);
  const [posts, setPosts] = useState ([]);
  const [user, setUser] = useState({
    name: "Random 'dane' Joe",
    position: 'Frontend Lead @ WBS',
    avatarSrc: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80'
  });

  // const [message, setMessage] = useState ("");

  const onChange = ({ target }) => setInputValue(target.value);
 
  // const addItem = () => {
  //   if (inputValue.trim() !== "") {
  //     const newTestimonial = inputValue.trim().replace(/^"(.*)"$/, '$1');
  //     setItems(prevItems => [...prevItems, newTestimonial]);
  //     setInputValue(""); // Clear the input field after adding the item
  //   }
  // };

  const onDelete = (index) => {
    setItems(prevItems => prevItems.filter((_, i) => i !== index));
  };

  
  const handleSend = () => {
    
    if (inputValue.trim() !== '') {
      const currentTime = new Date().toLocaleString(); // Convert timestamp to a readable string format
      // const timestamp = new Date().getTime();
      // console.log ("timestamp:", timestamp);
     
      setPosts(prevPosts => [...prevPosts, { message: inputValue, user, timestamp:currentTime}]);
      
      setInputValue('');
    }
  };
  
  const onEdit = (index, newValue) => {
    setItems(prevItems => {
      const updatedItems = [...prevItems];
      updatedItems[index] = newValue;
      return updatedItems;
    });
  };

  return (
    <div>
      {/* Good News component */}
      <div>
        <div className="p-3 relative flex justify-center w-full max-w-[24rem]">
          <span className='w-[117px] h-[48px] font-bold'>
            <p >Recent Collaborators</p>
          </span>
          <div className='mr-9 p-2 flex items-center w-[48px] h-[48px] '>
            <img className='-m-1' src="./src/assets/user2.png" alt="random-user1" />
            <img className='-m-1' src="./src/assets/user3.png" alt="random-user2" />
            <img className='-m-1' src="./src/assets/user1.png" alt="random-user3" />
          </div>

           </div>
        

           <div className='link-plus flex items-center justify-center'>
  <h3 className='font-semibold'>Links+</h3>
  
     <img src="./src/assets/googledrive.png" alt="goole-drive" className='w-[35px] h-[35px]'/>
     <img src="./src/assets/github.png" alt="GitHub" className='w-[35px] h-[35px]' />
     <img src="./src/assets/instagram.png" alt="Instagram" className='w-[35px] h-[35px]'/>
     <img src="./src/assets/office.png" alt="Ms_Office" className='w-[35px] h-[35px]'/>
     <img src="./src/assets/npm.png" alt="NPM" className='w-[35px] h-[35px]' />
</div>
       

        <div className='flex justify-end '>
          <div className='w-[522px] h-[230px] bg-blue-gray-150 mr-20 ml-14 rounded-[20px] border border-gray-900 outline-none placeholder-underline w-[522.85px] relative h-[200px] overflow-auto'>

            <div className='ml-2 font-semibold flex justify-between items-center'>
            <h2 className="text-blue-600 mr-auto">Good News</h2>
            <div className="flex justify-end items-center">
            <img src="./src/assets/yellowdot.png" alt="" className="mr-8 m-4 w-[18px] h-[18px]" />
          </div>
        </div>
            

            {posts.reverse().map((item, index) => (
              <TestimonialCard
                // timestamp = {item.timestamp}
                setPosts={setPosts}
                post={item}
                key={index}
                onDelete={() => onDelete(index)}
                onEdit={(newValue) => onEdit(index, newValue)}
                className=" rounded-[20px] flex justify-end"
              />
            ))}

            <div className='input-field flex items-center border-gray-300 rounded'>
              <input
                type="text"
                placeholder="Share some good news"
                value={inputValue}
                onChange={onChange}
                className="rounded-[15px] ml-2 w-[506.63px] h-[36.87px] border border-gray-900 outline-none placeholder-underline"
              />
              <img
                src='./src/assets/playicon.png' 
                alt='play' 
                className='w-[25px] h-[25px] cursor-pointer'
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
