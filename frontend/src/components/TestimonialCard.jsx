import React, { useState, useEffect } from 'react';
import { Card, Typography, CardHeader, Avatar, CardBody } from '@material-tailwind/react';

export function TestimonialCard({ onDelete, onEdit, post, user }) {
  const [editedMessage, setEditedMessage] = useState(post.message);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(post.id, editedMessage);
    setIsEditing(false);
  };

  return (
    <div className="ml-35">
      <Card color="transparent" shadow={false} className="w-[522.85px] ">
        <CardHeader color="transparent" floated={false} shadow={false} className="mx-0 flex items-center pt-0">
          {user && (
            <Avatar size="xs" variant="circular" src={post.user.profilePicture} alt={user.name} />
          )}
          <div className="flex flex-col">
            <div>
              <Typography variant="h5" color="blue-gray" className="text-xs">
                {user ? user.name : 'Unknown User'}
              </Typography>
            </div>
             {/* <Typography color="blue-gray" className="text-xs">
              {user ? user.roles :'unknown'}
            </Typography>  */}
          </div>
        </CardHeader>
        <CardBody className="p-2 justify-center overflow-auto">
          <div>
            {isEditing ? (
              <textarea
                value={editedMessage}
                onChange={(e) => setEditedMessage(e.target.value)}
                className="border border-gray-300 p-1 mb-2"
              />
            ) : (
              <Typography className="text-xs">{post.message}</Typography>
            )}
            <div className="mr-12 w-[483] m-2 border-t border-gray-600 flex-grow">
              <div className="text-xs flex justify-end">
                <p>Sent: {post.timestamp}</p>
              </div>
            </div>
            <div className="flex justify-end mt-3 text-xs">
              {!isEditing && (
                <>
                  <button onClick={handleEdit} className="text-gray-400 mr-2">
                    Edit
                  </button>
                  <button onClick={() => onDelete(post.id)} className="text-gray-400">
                    Delete
                  </button>
                </>
              )}
              {isEditing && (
                <>
                  <button onClick={handleSave} className="text-gray-400 mr-2">
                    Save
                  </button>
                  <button onClick={() => setIsEditing(false)} className="text-gray-400">
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
