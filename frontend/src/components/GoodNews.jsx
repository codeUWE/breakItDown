import React, { useState } from 'react';
import { TestimonialCard } from './TestimonialCard';

function GoodNews() {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);
  const [posts, setPosts] = useState ([]);
  const [user, setUser] = useState({
    name: "Random 'dane' Joe",
    position: 'Frontend Lead @ WBS',
    avatarSrc: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80'
  });

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
      // const timestamp = new Date().getTime();
      // console.log ("timestamp:", timestamp);
      setPosts(prevPosts => [...prevPosts, { message: inputValue, user,timestamp:new Date ().getTime()}]);
      
      // setEditedValue('');
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
      <div className="p-5 relative flex justify-center w-full max-w-[24rem]">
        <span className='w-[117px] h-[48px] font-bold'>
          <p >Recent Collaborators</p>
        </span>
        <div className='mr-9 p-2 flex items-center w-[48px] h-[48px] '>
          <img className='-m-1' src="./src/assets/user2.png" alt="random-user1" />
          <img className='-m-1' src="./src/assets/user3.png" alt="random-user2" />
          <img className='-m-1' src="./src/assets/user1.png" alt="random-user3" />
        </div>
      
      </div>

      <div className='flex justify-end '>
        <div className='bg-blue-gray-150 mr-20 ml-14 rounded-lg border border-gray-900 outline-none placeholder-underline w- [522.85px] p-3 relative h-[200px] overflow-auto'>

<div className='flex justify-end'>
  
  <div className='w-[18px] h-[18px]'>
    <span>
      <img src="./src/assets/yellowdot.png" alt="yellow_icon" />
    </span>
  </div>

</div>
<div className='rounded-[20px]'>
    <h2 className='justify-start w-[220px] h-[40px] font-bold ml-5 text-blue-400'>Good News</h2>
   
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

          <div className='flex items-center rounded-[20px] border-gray-300 rounded'>
            
          <input
            type="text"
            placeholder="Share some good news"
            value={inputValue}
            onChange={onChange}
            className="rounded-[20px]  ml-2 w-[506.63px] h-[36.87px] border border-gray-900 outline-none placeholder-underline"
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
  );
}

export default GoodNews;