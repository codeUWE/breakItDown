import React, { useState, useEffect, useContext } from 'react';
import {
	Card,
	Typography,
	CardHeader,
	Avatar,
	CardBody,
} from '@material-tailwind/react';
import { AuthContext } from '../context/AuthProvider';
import { getNews, deleteNews } from '../services/NewsRequests';
import { getAllUsers } from '../services/UserRequests';

export function TestimonialCard({ onDelete, onEdit }) {
	const { user } = useContext(AuthContext);
	const [news, setNews] = useState([]);
	const [users, setUsers] = useState([]);
	const [deletedNews, setDeletedNews] = useState([]);
	const [id, setId] = useState('');

	useEffect(() => {
		// Fetch news when the component mounts
		getNews()
			.then((data) => {
				// console.log('News:', data);
				setNews(data);
			})
			.catch((error) => {
				console.error('Error fetching news:', error);
			});

		// Fetch all users
		getAllUsers()
			.then((data) => {
				// console.log('Users:', data);
				setUsers(data);
			})
			.catch((error) => {
				console.error('Error fetching users:', error);
			});
	}, []);

	//  deleteNews(id)
	//       .then(data => {
	//         console.log('Deleted News:', data);
	//         setDeletedNews(data);
	//       })
	//       .catch(error => {
	//         console.error('Error deleting news:', error);
	//       });

	// Rest of your component logic

	// Function to get the profile picture of a user
	const getUserProfilePicture = (userName) => {
		const userWithProfile = users.find((user) => user.name === userName);
		return userWithProfile ? userWithProfile.profilePicture : ''; // Return the profile picture or an empty string if not found
	};

	// Filter out the user's own posts from the list of news items
	const otherUserPosts = news.filter((item) => item.name !== user.name);

	// Get the user's own posts
	const myPosts = news.filter((item) => item.name === user.name);

	// Function to handle post submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			// Get the current date and time
			const currentDate = new Date();
			const formattedDate = currentDate.toLocaleDateString('en-GB', {
				year: '2-digit',
				month: '2-digit',
				day: '2-digit',
			});
			const formattedTime = currentDate.toLocaleTimeString('en-US', {
				hour: 'numeric',
				minute: 'numeric',
				hour12: true,
			});

			// Combine date and time into the desired format
			const dateTime = `${formattedDate} ${formattedTime}`;

			// Here, you should have a function to post the news with the timestamp
			// For example:
			// await postNews({ name: user.name, body: newPost, timestamp: dateTime });

			// Clear the input field after successful submission
			setNewPost('');

			// Fetch news again to update the list with the new post
			const updatedNews = await getNews();
			setNews(updatedNews);
		} catch (error) {
			console.error('Error posting news:', error);
		}
	};

	return (
		<div>
			{/* Render the user's own posts */}
			{myPosts.map((item, index) => (
				<Card className="flex justify-center ml-2 bg-blue-gray-40" key={index}>
					<div></div>
					{item && (
						<Avatar
							size="l"
							variant="circular"
							src={getUserProfilePicture(item.name)}
							alt={item.name}
						/>
					)}
					<div className="m-2">
						<div>
							<Typography
								variant="paragraph"
								type
								color="green"
								className="text-1xl ml-12  absolute bottom-[35px]"
							>
								{item ? item.name : 'Unknown User'}
							</Typography>
						</div>
					</div>

					{/* <div > */}
					<div className="absolute top-[12px]">
						<Typography
							variant="caption"
							className="text-xs flex justify-start items-start absolute bottom-[40px] ml-[65px]"
						>
							{item.body}
						</Typography>
						<div className="flex flex-col justify-end items-end absolute top-[-4px] right-[70px]">
							<p className="text-xs font-semibold text-gray-600">
								{' '}
								{item.time}
							</p>
							<p className=" text-xs"> {item.date}</p>
						</div>

						<div className="mr-2">
							<div className=" w-[450px] m-10 border-[1px] border-gray-900 flex-grow"></div>
						</div>
					</div>

					{/* Render edit and delete buttons only for the user's own posts */}
					{item.name === user.name && (
						<div>
							{/* <button onClick={() => onEdit(item.id, item.body)} className="text-gray-400 mr-2">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="text-gray-400"> */}
							{/* Delete */}
							{/* </button>  */}
						</div>
					)}
				</Card>
			))}

			{/* Render posts from other users */}
			{otherUserPosts.map((item, index) => (
				<Card className="flex justify-center ml-1" key={index}>
					<div></div>
					{item && (
						<Avatar
							size="l"
							variant="circular"
							src={getUserProfilePicture(item.name)}
							alt={item.name}
							className="ml-2"
						/>
					)}
					<div className="m-1">
						<div>
							<Typography
								variant="paragraph"
								type
								color="purple"
								className="text-1xl ml-12  absolute bottom-[35px]"
							>
								{item ? item.name : 'Unknown User'}
							</Typography>
						</div>
					</div>

					{/* <div > */}
					<div className="absolute top-[12px]">
						<Typography
							variant="caption"
							className="text-xs flex justify-start items-start absolute bottom-[40px] ml-[65px]"
						>
							{item.body}
						</Typography>
						<div className="flex flex-col justify-end items-end absolute top-[-4px] right-[70px]">
							<p className="text-xs"> {item.time}</p>
							<p className=" text-xs"> {item.date}</p>
						</div>

						<div className=" w-[450px] m-10 border-[1px] border-gray-900 flex-grow">
							{/* <p> {item.time}</p> */}
						</div>

						{/* </div> */}
					</div>
				</Card>
			))}
		</div>
	);
}

// import React, { useState, useEffect, useContext } from 'react';
// import { Card, Typography, Avatar } from '@material-tailwind/react';
// import { AuthContext } from '../context/AuthProvider';
// import { getNews, deleteNews } from '../services/NewsRequests';
// import { getAllUsers } from '../services/UserRequests';

// export function TestimonialCard({ onDelete, onEdit }) {
//   const { user } = useContext(AuthContext);
//   const [news, setNews] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [deletedNews, setDeletedNews] = useState([]);
//   const [id, setId] = useState("");
//   const [newPost, setNewPost] = useState("");

//   useEffect(() => {
//     // Fetch news when the component mounts
//     async function fetchData() {
//       try {
//         const newsData = await getNews();
//         setNews(newsData);
//       } catch (error) {
//         console.error('Error fetching news:', error);
//       }

//       try {
//         const usersData = await getAllUsers();
//         setUsers(usersData);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       }
//     }

//     fetchData();

//     // Cleanup function
//     return () => {
//       // Cleanup tasks (if any)
//     };
//   }, []);

//   // Function to get the profile picture of a user
//   const getUserProfilePicture = (userName) => {
//     const userWithProfile = users.find(user => user.name === userName);
//     return userWithProfile ? userWithProfile.profilePicture : ''; // Return the profile picture or an empty string if not found
//   };

//   // Function to handle post submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Get the current date and time
//       const currentDate = new Date();
//       const formattedDate = currentDate.toLocaleDateString('en-GB', {
//         year: '2-digit',
//         month: '2-digit',
//         day: '2-digit',
//       });
//       const formattedTime = currentDate.toLocaleTimeString('en-US', {
//         hour: 'numeric',
//         minute: 'numeric',
//         hour12: true,
//       });

//       // Combine date and time into the desired format
//       const dateTime = `${formattedDate} ${formattedTime}`;

//       // Here, you should have a function to post the news with the timestamp
//       // For example:
//       // await postNews({ name: user.name, body: newPost, timestamp: dateTime });

//       // Clear the input field after successful submission
//       setNewPost("");

//       // Fetch news again to update the list with the new post
//       const updatedNews = await getNews();
//       setNews(updatedNews);
//     } catch (error) {
//       console.error('Error posting news:', error);
//     }
//   };

//   return (
//     <div>
//       {/* Input field for sharing good news */}
//       <form onSubmit={handleSubmit}>
//         <div className='relative'>
//           <input
//             type="text"
//             placeholder="Share some good news"
//             value={newPost}
//             onChange={(e) => setNewPost(e.target.value)}
//             className="rounded-[15px] w-[506.63px] h-[36.87px] border-[2px] mt-4 border-gray-900 outline-none placeholder-underline pl-4 pr-12"
//           />
//           <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2">
//             Post
//           </button>
//         </div>
//       </form>

//       {/* Render the user's own posts */}
//       {news.map((item, index) => (
//         <Card className='' key={index}>
//           {item && (
//             <Avatar size="l" variant="circular" src={getUserProfilePicture(item.name)} alt={item.name} />
//           )}
//           <div className="m-1">
//             <Typography variant="paragraph" type color="orange" className="text-xs ml-1">
//               {item ? item.name : 'Unknown User'}
//             </Typography>
//           </div>
//           <div className='absolute top-[12px]'>
//             <Typography variant='paragraph' className="text-xs flex justify-start items-start ml-[55px]">{item.body}</Typography>
//             <div className="w-[480px] m-3 border-t border-gray-900 flex-grow">
//               <p>Sent: {item.timestamp}</p>
//             </div>
//           </div>
//           {/* Render edit and delete buttons only for the user's own posts */}
//           {item.name === user.name && (
//             <div>
//               {/* <button onClick={() => onEdit(item.id, item.body)} className="text-gray-400 mr-2">
//                   Edit
//                 </button>
//                 <button onClick={() => onDelete(item.id)} className="text-gray-400">
//                   Delete
//                 </button> */}
//             </div>
//           )}
//         </Card>
//       ))}
//     </div>
//   );
// }
