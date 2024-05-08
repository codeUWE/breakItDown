
import React, { useState, useEffect } from 'react';
import { update } from '../services/TasksRequests'; // Assuming this import is correct
import { Avatar } from '@material-tailwind/react'; // Assuming this import is correct

function Schedule() {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    // Function to update the date string
    const updateDate = () => {
      const now = new Date();
      const day = String(now.getDate()).padStart(2, '0');
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const year = now.getFullYear();

      const dateString = `${day} / ${month} / ${year}`;
      setCurrentDate(dateString);
    };

    // Call updateDate immediately to display the date when the component mounts
    updateDate();

    // Calculate the time until the next midnight (in milliseconds)
    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const timeUntilMidnight = midnight - now;

    // Update the date every 24 hours (starting from midnight) to ensure accurate date display
    const interval = setTimeout(() => {
      updateDate();
      setInterval(updateDate, 86400000); // Update every 24 hours
    }, timeUntilMidnight);

    // Clear the timeout on component unmount
    return () => clearTimeout(interval);
  }, []);

  return (
    <div className='border border-gray-900 rounded-[20px] w-[460.7px] h-[504.74px]'>
      
      <div className='ml-4 p-4 flex justify-start font-semibold'>
        <p className='text-4xl'>Schedule</p>
      </div>

      <div className='flex justify-start ml-4 p-2'>
        <p className='font-bold ml-4 flex w-[98px] h-[20px]'>{currentDate}</p>
      </div>


      <div className='flex flex-col items-center justify-center h-screen mt-2'>
        <img src="./src/assets/expand.png" alt="" className='w-[13px]' />
      </div>


    </div>
  );
}

export default Schedule;
