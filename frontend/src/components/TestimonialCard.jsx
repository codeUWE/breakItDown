import React, { useState, useEffect, useContext } from 'react';
import { Card, Typography, CardHeader, Avatar, CardBody } from '@material-tailwind/react';
import { AuthContext } from '../context/AuthProvider';
import { getNews, deleteNews } from '../services/NewsRequests';
import { getAllUsers } from '../services/UserRequests';

export function TestimonialCard({ onDelete, onEdit }) {
  const { user } = useContext(AuthContext);
  const [news, setNews] = useState([]);
  const [users, setUsers] = useState([]);
  const [deletedNews, setDeletedNews] = useState([]);

  useEffect(() => {
    // Fetch news when the component mounts
    getNews()
      .then(data => {
        console.log('News:', data);
        setNews(data);
      })
      .catch(error => {
        console.error('Error fetching news:', error);
      });

    // Fetch all users
    getAllUsers()
      .then(data => {
        console.log('Users:', data);
        setUsers(data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });

    // Delete news
    deleteNews()
      .then(data => {
        console.log('Deleted News:', data);
        setDeletedNews(data);
      })
      .catch(error => {
        console.error('Error deleting news:', error);
      });
  }, []);

  // Rest of your component logic




  // Function to get the profile picture of a user
  const getUserProfilePicture = (userName) => {
    const userWithProfile = users.find(user => user.name === userName);
    return userWithProfile ? userWithProfile.profilePicture : ''; // Return the profile picture or an empty string if not found
  };

  // Filter out the user's own posts from the list of news items
  const otherUserPosts = news.filter(item => item.name !== user.name);

  // Get the user's own posts
  const myPosts = news.filter(item => item.name === user.name);

  return (
    <div className="ml-35 w-700">
      {/* Render the user's own posts */}
      {myPosts.map((item, index) => (
        <Card key={index} color="transparent" shadow={false} className="w-[950.85px] mb-4">
          <CardHeader color="transparent" floated={false} shadow={false} className="flex items-center pt-12 ml-12">
            {item && (
              <Avatar size="xl" variant="circular" src={getUserProfilePicture(item.name)} alt={item.name} />
            )}
            <div className="flex flex-col">
              <div>
                <Typography variant="h5" color="blue-gray" className="text-l">
                  {item ? item.name : 'Unknown User'}
                </Typography>
              </div>
            </div>
          </CardHeader>
          <CardBody className="justify-center overflow-auto ml-10 pb-2">
            <div>
              <Typography className="text-l">{item.body}</Typography>
              <div className="mr-12 w-[483] border-t border-gray-600 flex-grow">
                <div className="text-xs flex justify-start">
                  <p>Sent: {item.timestamp}</p>
                </div>
              </div>
              {/* Render edit and delete buttons only for the user's own posts */}
              {item.name === user.name && (
                <div className="flex justify-end mt-3 text-l">
                  <button onClick={() => onEdit(item.id, item.body)} className="text-gray-400 mr-2">
                    Edit
                  </button>
                  <button onClick={() => onDelete(item.id)} className="text-gray-400">
                    Delete
                  </button>
                </div>
              )}
            </div>
          </CardBody>
        </Card>
      ))}
      
      {/* Render posts from other users */}
      {otherUserPosts.map((item, index) => (
        <Card key={index} color="transparent" shadow={false} className="w-[950.85px] mb-4 ">
          <CardHeader color="transparent" floated={false} shadow={false} className="flex items-center pt-12 ml-12">
            {item && (
              <Avatar size="xl" variant="circular" src={getUserProfilePicture(item.name)} alt={item.name} />
            )}
            <div>
              <div className='absolute top-[-4px]'>
                <Typography variant="h5" color="blue-gray" className="text-l">
                  {item ? item.name : 'Unknown User'}
                </Typography>
              </div>
            </div>
          </CardHeader>
          <CardBody className="justify-center overflow-auto ml-10 pb-2">
            <div>
              <Typography className="text-xs">{item.body}</Typography>
              <div className="mr-12 w-[483] m-2 border-t border-gray-600 flex-grow">
                <div className="text-l flex justify-start">
                  <p>Sent: {item.timestamp}</p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
  
}
