import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, Typography, Avatar } from '@material-tailwind/react';

export function TestimonialCard({ inputValue, onDelete, onEdit }) {
  const [timestamp, setTimestamp] = useState('');
  const [showButtons, setShowButtons] = useState(false);
  const [editedValue, setEditedValue] = useState(inputValue);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().toLocaleString();
      setTimestamp(currentTime);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleToggleButtons = () => {
    setShowButtons(!showButtons);
  };

  const handleEdit = () => {
    onEdit(editedValue); // Pass only the editedValue to onEdit
    setShowButtons(false);
  };

  const handleInputChange = (e) => {
    setEditedValue(e.target.value);
  };

  return (
    <div className="ml-25">
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
        <CardBody className="mb-8 p-2 justify-center">
          {inputValue && ( // Check if inputValue is not empty
            <Typography className="text-xs">
              {showButtons ? (
                <input
                  type="text"
                  value={editedValue}
                  onChange={handleInputChange}
                  className="w-full border-b border-gray-400 py-1 focus:outline-none"
                />
              ) : (
                inputValue
              )}
            </Typography>
          )}
          {showButtons && (
            <div className="flex justify-end mt-3 text-xs">
              <button onClick={handleEdit} className="text-gray-400 mr-2">Save</button>
              <button onClick={onDelete} className="text-gray-400">Delete</button>
            </div>
          )}
          <Typography className="text-xs text-gray-500 mt-1">
            {timestamp}
          </Typography>
        </CardBody>
        <div className="flex justify-center mt-3">
          <button onClick={handleToggleButtons} className="text-black-800 text-xs flex justify-between">
            {showButtons ? 'Cancel' : 'Update'}
          </button>
        </div>
      </Card>
    </div>
  );
}
