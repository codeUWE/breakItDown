import React from 'react';
import { Card, CardHeader, CardBody, Typography, Avatar } from '@material-tailwind/react';


export function TestimonialCard({ inputValue }) { // Receive inputValue as a prop
  return (
    <Card color="transparent" shadow={false} className=" max-w-[26rem]">
      <CardHeader
        color="transparent"
        floated={false}
        shadow={false}
        className="mx-0 flex items-center gap-4 pt-0 pb-8"
      >
        <Avatar
          size="lg"
          variant="circular"
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          alt="tania andrew"
        />
        <div className="flex w-full flex-col gap-0.5">
          <div className="flex justify-center items-center flex items-center justify-between">
            <Typography variant="h5" color="blue-gray">
             Random "dane" Joe
            </Typography>
           
          </div>
          <Typography color="blue-gray">Frontend Lead @ WBS</Typography>
        </div>
      </CardHeader>
      <CardBody className="mb-6 p-4 justify-center items-center">
        <Typography>
          {inputValue}
        </Typography>
      </CardBody>
    </Card>
  );
}
