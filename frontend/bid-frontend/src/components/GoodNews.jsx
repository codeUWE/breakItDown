import React from 'react'
import { useState } from 'react';

function GoodNews() {

    const [inputValue, setInputValue] = useState ("");
    const [items, setItems] = useState ([]);

    const addItem = () => {

        if (inputValue.trim() !== "") {
            setItems (prevItems => [ ...prevItems, inputValue]);
            setInputValue("");

        }

    };

  return (
    <div className='container'>

      <div>
         <input className='flex justify-center w-64 p-4 text-sm text-gray-1000 border border-gray-700 rounded-lg bg-green-50' type="text" 
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder='Share some good news...'
        />
        <div className='p-2'>
           <button className=' flex justify-center bg-gray-200 p-2' onClick={addItem}>Post</button>
        </div>
     
      </div>

      <div className='p-10 m-4'>
        <h1 className='text-1xl font-bold'>Good News Display</h1>
        {items.map((item,index) => (
          <div className='item' key={index}>{item} </div>

        ))}

      </div>
    </div>
  )
}

export default GoodNews;
