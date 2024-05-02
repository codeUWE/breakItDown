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

  return (
    <div>
      <div className="m-5 p-5 relative flex w-full max-w-[24rem]">
        <span className='font-bold'>
          <p>
            Recent Collaborators
          </p>
        </span>
        <Input 
          type="text"
          placeholder='hdshhdhsdh'
          label="Share some good news"
          value={inputValue}
          onChange={onChange}
          className="pr-20 w-[30.82px] h-[48.82px] border border-gray-300 rounded-full outline-none" // Add border but remove outline
          containerProps={{
            className: "flex-1 min-w-0",
          }}
          
        />
        <img
            src='./src/assets/playicon.png' 
            alt='play' 
            className='w-[25px] h-[25px] cursor-pointer' // Add cursor pointer to indicate it's clickable
            onClick={addItem} // Attach onClick handler to call addItem function
        />
      </div>
         {/* <div className='p-10 m-4'>
        <h1 className='text-1xl font-bold'>Good News Display</h1>
        {items.map((item,index) => (
          <div className='item' key={index}>{item} </div>
        ))}
      </div> */}
<div className=' flex items-center justify-center h-screen'>
  <div className='ml-15 p-3 relative max-w-[362.11px] max-h-[222.31px] overflow-auto border border-gray-300 rounded'>
    {/* Render TestimonialCard component for each item in items */}
    {/* slice.reverse ensures that newly added content is displayed first*/} 

    {items.slice(0).reverse().map((item, index) => (
      <TestimonialCard key={index} inputValue={item} className="text-xs" />
    ))}
  </div>
</div>
    </div>
  );
}

export default GoodNews;
