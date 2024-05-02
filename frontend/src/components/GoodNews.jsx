import React, { useState } from 'react';
import { Input, Button } from '@material-tailwind/react';
import { TestimonialCard } from './TestimonialCard';

function GoodNews() {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);

  const onChange = ({ target }) => setInputValue(target.value);
 
  const addItem = () => {
    if (inputValue.trim() !== "") {

    //  take out unwanted quotes from the input
      const newTestimonial = inputValue.trim().replace(/^"(.*)"$/, '$1');
      // Every new items goes in here
      setItems(prevItems => [...prevItems, newTestimonial]);
      setInputValue(""); // Clear the input field after adding the item
    }
  };


  const onDelete = (index) => {
    setItems(prevItems => prevItems.filter((_, i) => i !== index));
  };

  const onEdit = (index, newValue) => {
    setItems(prevItems => {
      const updatedItems = [...prevItems];
      updatedItems[index] = newValue;
      return updatedItems;
    });
  };


  return (
<div >
  <div className=" p-5 relative flex justify-center w-full max-w-[24rem]">
    <span className='font-bold'>
    <p>
     Recent <br />Collaborators
    </p>
    </span>

  <div className='mr-9 p-2 flex items-center w-[48px] h-[48px] '>
        <img className='-m-1' src="./src/assets/user2.png" alt="random-user1" />
        <img className='-m-1' src="./src/assets/user3.png" alt="random-user2" />
        <img className='-m-1' src="./src/assets/user1.png" alt="random-user3" />
    </div>


        
    <div className="relative flex-1 min-w-0">
  <input
    type="text"
    placeholder="Share some good news"
    value={inputValue}
    onChange={onChange}
    className="pl-10 pr-10 ml-10 w-[390.82px] h-[48.82px] border border-gray-900 rounded-lg outline-none placeholder-underline" // Use rounded-lg for thicker border radius
  />
</div>


      <div className='flex'>
      
     <img
    src='./src/assets/playicon.png' 
    alt='play' 
    className='absolute flex justify-between transform -translate-y-1/2 right- w-[25px] h-[25px] cursor-pointer ' // Add cursor pointer to indicate it's clickable
    onClick={addItem} // Attach onClick handler to call addItem function
      />

 
      </div> 



  </div>

      
<div className=' flex items-center justify-center h-screen'>
  <div className='ml-15 p-3 relative max-w-[362.11px] max-h-[222.31px] overflow-auto border border-gray-300 rounded'>
    {/* Render TestimonialCard component for each item in items */}
    {/* slice.reverse ensures that newly added content is displayed first*/} 

    {items.slice(0).reverse().map((item, index) => (
      <TestimonialCard key={index} onDelete={() => onDelete(index)}
      onEdit={(newValue) => onEdit(index, newValue)}
      
      inputValue={item} className="text-xs" />
    ))}
  </div>
</div>
</div>
  );
}

export default GoodNews;
