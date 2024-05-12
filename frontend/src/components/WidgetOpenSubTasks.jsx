import React, { useState, useEffect } from 'react';
import getUnassignedTasks from '../services/TasksRequests';
import { Avatar, Card, Typography } from '@material-tailwind/react';

function WidgetOpenSubTasks() {
  const [unassignedTasks, setUnassignedTasks] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    getUnassignedTasks()
    console.log(setUnassignedTasks)
      .then(data => setUnassignedTasks(data))
     
      .catch(error => console.log(error));
  }, []);

  const nextTasks = () => {
    setStartIndex(prevIndex => prevIndex + 1);
  };

  const previousTasks = () => {
    setStartIndex(prevIndex => Math.max(0, prevIndex - 1));
  };

  const currentTasks = unassignedTasks.slice(startIndex, startIndex + 1);

  return (

  

    <div className='flex justify-end items-end p-12 mr-8'>
      {/* <div className='flex justify-center items-center p-12 mr-8'> */}
        <div className='flex justify-center items-center border border-gray-900 rounded-[30px] w-[865px] h-[260px] overflow-auto'>
          <Card className='flex justify-center items-between py-40 ml-6' color="transparent" shadow={true}>
            <div className="mb-1 font-semibold flex justify-between items-center">
              <h2 className='flex justify-start'>Open SubTasks</h2>   
                <img src="./src/assets/yellowdot.png" alt="" className="w-[18px] h-[18px] mr-6" />
              </div>
  
            {currentTasks.map((task, index) => (
              
              <div className='' key={task._id}>
                <h3 className='mb-4 text-xs font-semibold'>{task.title}</h3>
                {/* </div> */}
                
                <span className='flex items-end justify-end mr-12'>
                  <p className='font-bold'>
                    Lead
                    <div className='flex justify-center items-center'>
                       <img src="./src/assets/user1.png" alt="" className='w-[31px] h-[31px]' />
                       <img src="./src/assets/done.png" alt="" className='w-[53px] h-[32px]' />
                       <img src="./src/assets/caution.png" alt="" className='w-[46px] h-[29px]' />
                    </div>
                    
                   
                    
                  </p>
                </span>
                <img src="./src/assets/wireanchor2.png" alt="" className='ml-4 w-[21px] h-[13px]' />
                <p className='text-xs text-blue-600 ml-10 '>Task: {task.task.description}</p>
                
                <p className='flex justify-center items-center mr-40 ml-12 p-3 text-xs'>{task.detailedInformation}</p>
                
                {index !== currentTasks.length - 1 && (
                  <div className='flex justify-center ml-4 m-1 w-[790.01px] border-t border-gray-900 flex-grow'></div>
                )}
              </div>

              
            ))}
            <div>
              <button onClick={previousTasks} disabled={startIndex === 0}>Previous</button>
              <button onClick={nextTasks} disabled={startIndex + 3 >= unassignedTasks.length}>Next</button>
            </div>
          </Card>
        </div>
      {/* </div> */}
    </div>
     
  );
}

export default WidgetOpenSubTasks;
