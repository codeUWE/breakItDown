/* eslint-disable react/prop-types */
import stepInto from '../assets/stepInto.png';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Tooltip } from '@material-tailwind/react';
import { getAllUsers } from '../services/UserRequests';

function TaskLayout({ task }) {
	const [users, setUsers] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchUsers = async () => {
			const allUsers = await getAllUsers();
			setUsers(allUsers);
			console.log(allUsers); // Überprüfen der User-Daten
		};

		fetchUsers();
	}, []);

	const formatDate = (dateString) => {
		if (!dateString) return 'Invalid Date';
		try {
			const date = new Date(dateString);
			const monthShortNames = [
				'Jan',
				'Feb',
				'Mar',
				'Apr',
				'May',
				'Jun',
				'Jul',
				'Aug',
				'Sep',
				'Oct',
				'Nov',
				'Dec',
			];
			let day = date.getDate().toString().padStart(2, '0');
			const month = monthShortNames[date.getMonth()];
			return `${month} ${day}`;
		} catch (error) {
			console.error('Error while formatting the date:', error);
			return 'Invalid Date';
		}
	};

	const getUserAvatarUrl = (userId) => {
		const user = users.find((user) => user._id === userId);
		return user
			? user.profilePicture
			: 'https://cdn-icons-png.flaticon.com/128/552/552848.png';
	};

	return (
		<>
			<div className="w-[390px] h-[140px] rounded-[20px]    flex bg-white">
				<div className="flex flex-col w-[60px] justify-center items-center   bg-red-600 text-white rounded-s-[18px]  ">
					<h2 className="m-0 font-outfit font-[700] text-[16px]">
						{formatDate(task.deadline).split(' ')[0]}
					</h2>
					<h2 className="m-0 font-outfit font-[700] text-[24px] leading-none tracking-tighter">
						{formatDate(task.deadline).split(' ')[1]}
					</h2>
				</div>
				<div className="w-full grid grid-rows-4 grid-col-6 ps-3 pe-1 pt-[4px] pb-[10px] bg-[#EFF9FF] rounded-e-[20px]">
					<Tooltip
						content={task.title}
						className="bg-[#363636] text-[12px] font-outfit font-[600] p-1 px-2 rounded-3xl"
					>
						<h2 className="font-outfit font-[500] text-[20px] row-start-1 col-start-1 col-span-5 truncate ">
							{task.title}
						</h2>
					</Tooltip>

					<h3 className="font-outfit font-[300] text-[14px] row-start-2 row-end-2 col-start-1 col-span-4 tracking-tight leading-tight mt-1  ">
						{task.description}
					</h3>
					<h3 className="row-start-4 col-start-1 col-span-2 font-outfit text-[16px]">
						<span className="font-outfit font-[600] text-[#E53935] ">
							{task.unassignedSubtasksCount}
						</span>{' '}
						unassigned Subtasks
					</h3>
					<div className=" row-start-4 col-start-3 col-span-2">
						<div className=" flex justify-start relative">
							{task.collaborators.map((collaborator, index) => {
								console.log('Key:', collaborator._id); // Überprüfung der Key-Werte
								return (
									<Avatar
										key={collaborator._id}
										src={getUserAvatarUrl(collaborator._id)}
										alt="avatar"
										className={` w-[35px] h-[35px] absolute top-0 left-[${
											15 * index
										}px] z-${0 + index * 10}`}
									/>
								);
							})}
						</div>
					</div>

					<img
						src={stepInto}
						alt="icon step into"
						width={35}
						height={35}
						className="row-start-2 row-end-4 col-start-6 ms-1 mt-5 p-1 hover:bg-yellow-500 hover:rounded-full"
						onClick={() => navigate(`/tasks/${task._id}`)}
					/>
					<h4 className="font-outfit font-[400] text-[13px] pt-[6px] row-start-1 col-start-6 mx-auto">
						{task.progress}
					</h4>
				</div>
			</div>
		</>
	);
}

export default TaskLayout;
