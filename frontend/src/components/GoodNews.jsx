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
      <div className="relative flex w-full max-w-[24rem]">
        <Input
          type="text"
          label="Good News"
          value={inputValue}
          onChange={onChange}
          className="pr-20"
          containerProps={{
            className: "min-w-0",
          }}
        />

        <Button
          onClick={addItem}
          size="sm"
          color={inputValue ? "blue" : "blue-gray"}
          disabled={!inputValue}
          className="!absolute right-1 top-1 rounded"
        >
          Post
        </Button>
      </div>

         <div className='p-10 m-4'>
        <h1 className='text-1xl font-bold'>Good News Display</h1>
        {items.map((item,index) => (
          <div className='item' key={index}>{item} </div>
        ))}
      </div>

      {/* Render TestimonialCard component for each item in items */}
      {items.map((item, index) => (
        <TestimonialCard key={index} inputValue={item} />
      ))}
    </div>
  );
}

export default GoodNews;
