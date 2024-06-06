import stepInto from '../assets/stepInto.png';
import { useEffect, useState } from 'react';
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
			: 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
	};

	const getUserEmail = (userId) => {
		const user = users.find((user) => user._id === userId);
		return user ? user.email : '';
	};

	return (
		<>
			<div className="xl:w-[98%] md:w-[98%] xl:h-[140px] lg:h-[160px] md:h-[115px] rounded-3xl flex bg-white">
				<div className="flex flex-col w-[60px] justify-center items-center bg-red-600 text-white rounded-s-[18px]">
					<h2 className="m-0 font-outfit font-[700] text-[16px] ">
						{formatDate(task.deadline).split(' ')[0]}
					</h2>
					<h2 className="m-0 font-outfit font-[700] text-[24px] leading-none tracking-tighter">
						{formatDate(task.deadline).split(' ')[1]}
					</h2>
				</div>
				<div className="w-full grid grid-rows-4 grid-cols-6 ps-3 pe-1 xl:pt-[4px] lg:pt-3 md:pt-2 pb-[5px] bg-[#EFF9FF] rounded-e-[24px]">
					<Tooltip
						content={task.title}
						className="bg-[#363636] text-[12px] font-outfit font-[600] p-1 px-2 rounded-3xl"
					>
						<h2 className="font-outfit font-[500] xl:text-[20px] md:row-start-1 md:col-start-1 md:col-span-5  truncate xl:row-start-1 xl:col-start-1 xl:col-span-7">
							{task.title}
						</h2>
					</Tooltip>

					<h3 className="font-outfit font-[300] xl:text-[14px] lg:text-[13px]  md:row-start-2 md:row-end-2 md:col-start-1 md:col-span-5 tracking-tight leading-tight mt-1 xl:row-start-2 xl:col-start-1 xl:col-span-5 ">
						{task.description}
					</h3>
					<h3 className="row-start-4 col-start-1 col-span-3 md:col-end-6 xl:col-end-4 lg:mt-2  font-outfit text-[15px]">
						<span className="font-outfit font-[600] text-[#E53935]">
							{task.unassignedSubtasksCount}
						</span>{' '}
						unassigned Subtasks
					</h3>
					<div className="xl:row-start-4 xl:col-start-3 xl:m-0 xl:col-span-4 md:row-start-3 md:col-start-3 md:row-span-2 md:col-span-4 md:mt-3">
						<div className="flex xl:justify-start relative xl:ms-14 md:ms-44 ">
							{task.collaborators.map((collaborator, index) => (
								<Tooltip
									key={collaborator._id}
									content={`Send mail to: ${collaborator.name}`}
									className="bg-[#363636] text-[12px] font-outfit font-[600] p-1 px-2 rounded-3xl"
								>
									<Avatar
										src={
											getUserAvatarUrl(collaborator._id) ||
											'https://cdn-icons-png.flaticon.com/512/149/149071.png'
										}
										alt="avatar"
										className={`w-[35px] h-[35px] absolute cursor-pointer`}
										style={{ left: `${index * 20}px`, zIndex: index }}
										onClick={() =>
											(window.location.href = `mailto:${getUserEmail(
												collaborator._id
											)}`)
										}
									/>
								</Tooltip>
							))}
						</div>
					</div>

					<img
						src={stepInto}
						alt="icon step into"
						width={35}
						height={35}
						className="row-start-2 row-end-4 col-start-6 md:m-auto p-1 hover:bg-yellow-500 hover:rounded-full cursor-pointer"
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
