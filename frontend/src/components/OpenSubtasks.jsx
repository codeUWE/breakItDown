import { useEffect, useState } from 'react';
import { assignSubtask, getUnassignedTasks } from '../services/TasksRequests';
import assign from '../assets/assign.png';
import show from '../assets/show.png';
import { Tooltip } from '@material-tailwind/react';

const SubtaskWidget = () => {
	const [unassignedSubtasks, setUnassignedSubtasks] = useState([]);
	const [assignedSubtaskId, setAssignedSubtaskId] = useState(null);

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

	return (
		<>
			<div className="w-[900px] h-[420px] overflow-scroll no-scrollbar p-4 bg-[#D4ECFC] mt-10 ms-auto flex flex-col justify-center rounded-[30px]">
				<h2 className="text-[30px] font-outfit font-[600] px-3">
					Unassigned Subtasks
				</h2>
				<div className="bg-[#fffcf3] rounded-xl mt-4 py-2 px-6 w-full flex justify-center gap-6 items-start font-outfit text-[18px] font-[800] text-[#4B4A67]">
					<h3 className="w-[30%]">Subtask Title (in Task)</h3>
					<h3 className="w-[50%]">Subtask Description</h3>
					<h3 className="w-[15%]">Actions</h3>
				</div>
				<div className="overflow-scroll no-scrollbar h-full flex flex-col mt-4 justify-start items-center rounded-[20px]">
					{unassignedSubtasks.map((subtask) => (
						<div
							key={subtask._id}
							className={`py-4 px-2 w-full flex justify-center items-start relative  ${
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
										<h3 className="self-start text-[18px] font-outfit font-[600]">
											{subtask.title}
										</h3>
										<div className="relative">
											<div className="absolute left-1 top-2 h-4 border border-black"></div>
											<div className="absolute left-1 top-6 w-4 border border-black"></div>
										</div>
										<h3 className="self-end pe-3 text-[16px] font-outfit font-[400] mt-2 w-52 truncate">
											{subtask.task?.title}
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
									<div className="w-[50%] flex self-center justify-start">
										<h3 className="text-[16px] font-outfit font-[300] ps-2">
											{subtask.detailedInformation}
										</h3>
									</div>
									<div className="w-[15%] flex self-center justify-end items-center gap-3">
										<div className="mt-5">
											<Tooltip
												content={`Mail to: ${subtask.task.leader?.name}`}
												className="tooltip-class font-outfit"
											>
												<a href={`mailto:${subtask.task.leader?.email}`}>
													<img
														className="w-[45px] h-[45px] rounded-full cursor-pointer"
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
