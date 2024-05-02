import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, Typography, Avatar } from '@material-tailwind/react';

export function TestimonialCard({ inputValue }) {
  const [timestamp, setTimestamp] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().toLocaleString();
      setTimestamp(currentTime);
    }, 6000); // Update timestamp every minute

    return () => clearInterval(interval); // Cleanup function
  }, []); // Run effect only once on component mount

  return (
    <div className="ml-25"> {/* Add margin-left s0 it can move the TestimonialCard to the right */}
      <Card color="transparent" shadow={false} className="max-w-[26rem]">
        <CardHeader
          color="transparent"
          floated={false}
          shadow={false}
          className="mx-0 flex items-center gap-4 pt-0 pb-8"
        >
          <Avatar
            size="xs"
            variant="circular"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            alt="tania andrew"
          />
          <div className="flex w-[362.11px] max-h-[222.31px] flex-col">
            <div className=" justify-between">
              <Typography variant="h5" color="blue-gray" className="text-xs">
                Random "dane" Joe
              </Typography>
            </div>
            <Typography color="blue-gray" className="text-xs">
              Frontend Lead @ WBS
            </Typography>
          </div>
        </CardHeader>
        <CardBody className="mb-8 p-1 justify-center items-center">
          <Typography className="text-xs">
            {inputValue}
          </Typography>
          <Typography className="text-xs text-gray-500 mt-1">
            {timestamp}
          </Typography>
        </CardBody>
      </Card>
    </div>
  );
}
