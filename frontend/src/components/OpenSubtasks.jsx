import { useEffect, useState, useRef } from 'react';
import { assignSubtask, getUnassignedTasks } from '../services/TasksRequests';
import assign from '../assets/assign.png';
import show from '../assets/show.png';
import { Tooltip } from '@material-tailwind/react';

const SubtaskWidget = () => {
	const [unassignedSubtasks, setUnassignedSubtasks] = useState([]);
	const [assignedSubtaskId, setAssignedSubtaskId] = useState(null);
	const [showDetails, setShowDetails] = useState({}); // Use an object to track which subtask's details are shown

	useEffect(() => {
		getUnassignedTasks('project=true')
			.then((data) => setUnassignedSubtasks(data))
			.catch((err) => console.log(err));
	}, []);

	const handleSubtaskUpdate = (updatedSubtask) => {
		setUnassignedSubtasks((prevSubtasks) =>
			prevSubtasks.filter((subtask) => subtask._id !== updatedSubtask._id)
		);
	};

	const handleAssign = async (subtaskId) => {
		try {
			const assignedSubtask = await assignSubtask(subtaskId);
			if (assignedSubtask) {
				setAssignedSubtaskId(subtaskId);
			}
		} catch (error) {
			console.error('Error assigning subtask:', error);
		}
	};

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

	const toggleDetails = (subtaskId) => {
		setShowDetails((prevShowDetails) => ({
			...prevShowDetails,
			[subtaskId]: !prevShowDetails[subtaskId],
		}));
	};

	return (
		<>
			<div className="w-[100%] xl:h-[500px] lg:h-[450px] md:h-[700px] overflow-scroll no-scrollbar p-4 bg-[#D4ECFC] xl:mt-10 md:mt-6 flex flex-col justify-center rounded-[30px] shadow-md">
				<h2 className="lg:text-[30px] md:text-[20px] font-outfit font-[600] px-3">
					Unassigned Subtasks
				</h2>
				<div className="bg-[#fffcf3] rounded-xl mt-4 py-2 px-6 w-full flex justify-center gap-6 items-start font-outfit lg:text-[18px] font-[800] text-[#4B4A67]">
					<h3 className="w-[30%]">Subtask Title (in Task)</h3>
					<h3 className="w-[50%]">Subtask Description</h3>
					<h3 className="w-[15%] ms-4">Actions</h3>
				</div>
				<div className="overflow-scroll no-scrollbar h-full flex flex-col mt-4 justify-start items-center rounded-[20px]">
					{unassignedSubtasks.map((subtask) => (
						<div
							key={subtask._id}
							className={`py-4 px-2 w-full max-h-sreen flex justify-center items-start relative  ${
								assignedSubtaskId === subtask._id
									? 'bg-[#d3d3e346] text-white flex-col justify-center items-center'
									: 'bg-[#EFF9FF]'
							}`}
						>
							{assignedSubtaskId === subtask._id ? (
								<div className="flex flex-col items-center">
									<h3 className="text-[24px] text-[#3c915e] font-outfit font-[900] mb-2">
										Assigned Successfully!
									</h3>
									<div className="flex gap-2">
										<a
											href={`/tasks/${subtask.task._id}`}
											target="_blank"
											rel="noopener noreferrer"
											className="bg-blue-500 text-white font-[700] font-outfit px-4 py-2 rounded-full text-center"
										>
											Go to Task
										</a>
										<button
											onClick={() => handleSubtaskUpdate(subtask)}
											className="bg-[#E53935] px-4 py-2 font-outfit font-[700] rounded-full"
										>
											Close
										</button>
									</div>
								</div>
							) : (
								<>
									<div className="flex flex-col w-[30%] items-start">
										<h3 className="self-start lg:text-[18px] font-outfit font-[600]">
											{subtask.title}
										</h3>
										<div className="relative">
											<div className="absolute left-1 top-2 h-4 border border-black"></div>
											<div className="absolute left-1 top-6 w-4 border border-black"></div>
										</div>
										<h3 className="self-end lg:pe-3 lg:text-[16px] md:text-[14px] font-outfit font-[400] mt-2 lg:w-52 md:w-44 md:mt-3 truncate">
											{subtask.task.title}
										</h3>
										<div className="flex w-[150px] h-[30px] justify-center items-center mt-2 bg-red-600 text-white rounded-xl">
											<h2 className="text-[12px] font-outfit font-[700] me-1">
												Until:
											</h2>
											<h2 className="m-0 font-outfit font-[700] text-[16px]">
												{formatDate(subtask.deadline).split(' ')[0]}
											</h2>
											<h2 className="m-0 font-outfit font-[700] text-[24px] leading-none tracking-tighter">
												{formatDate(subtask.deadline).split(' ')[1]}
											</h2>
										</div>
									</div>
									<div className="w-[50%] flex flex-col">
										<h3 className="text-[16px] font-outfit font-[300] ps-2">
											{subtask.description}
										</h3>
										<div
											className={`overflow-hidden transition-height duration-1000 ease-in-out ${
												showDetails[subtask._id] ? 'max-h-[500px] ' : 'max-h-0'
											}`}
										>
											<div className="p-2 mt-2">
												<h5 className="font-outfit text-[18px] font-[500] text-[#5a5a5a] mb-2">
													Detailed Information:
												</h5>
												<p className="font-outfit text-[15px] font-[300] text-[#5a5a5a]">
													{subtask.detailedInformation}
												</p>
											</div>
										</div>
										<button
											onClick={() => toggleDetails(subtask._id)}
											className="font-outfit font-[400] w-40 text-[16px] px-3 py-1 mt-3 me-2 text-[#3c3c3c] bg-[#C1E1F5] rounded-[20px] self-end"
										>
											{showDetails[subtask._id] ? 'See less' : 'See more'}
										</button>
									</div>
									<div className="w-[15%] ms-4 flex self-center justify-end items-center gap-3">
										<div className="mt-5">
											<Tooltip
												content={`Mail to: ${subtask.task.leader?.name}`}
												className="tooltip-class font-outfit"
											>
												<a href={`mailto:${subtask.task.leader?.email}`}>
													<img
														className="lg:w-[45px] lg:h-[45px] md:w-[35px] md:h-[35px] rounded-full cursor-pointer"
														src={
															subtask.task.leader?.profilePicture ||
															'https://cdn-icons-png.flaticon.com/512/149/149071.png'
														}
														alt="Leader Profile"
													/>
												</a>
											</Tooltip>
											<h3 className="font-outfit text-[14px] font-[600] text-center">
												Lead
											</h3>
										</div>
										<Tooltip
											content="Assign to Subtask"
											className="tooltip-class font-outfit"
										>
											<button onClick={() => handleAssign(subtask._id)}>
												<img src={assign} alt="assign icon" width={27} />
											</button>
										</Tooltip>
										<Tooltip
											content="Show Task"
											className="tooltip-class font-outfit"
										>
											<a
												href={`/tasks/${subtask.task._id}`}
												target="_blank"
												rel="noopener noreferrer"
												className="mt-2"
											>
												<button>
													<img src={show} alt="show more icon" width={25} />
												</button>
											</a>
										</Tooltip>
									</div>
								</>
							)}
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default SubtaskWidget;
