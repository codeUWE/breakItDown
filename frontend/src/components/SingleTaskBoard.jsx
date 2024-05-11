import { useParams, useNavigate } from 'react-router-dom';
import { getTaskById, updateTask, deleteTask } from '../services/TasksRequests';
import { useEffect, useState, useRef } from 'react';
import SingleTaskSubtask from './SingleTaskSubtask';
import SingleTaskProgress from './SingleTaskProgress';
import AddSubtaskDialog from './AddSubtaskDialog';
import EditTaskDialog from './EditTaskDialog';
import DeleteTaskDialog from './DeleteTaskDialog';

//userIntegration
import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { hasPermission } from '../services/utils';

import SpeechBubble from '../assets/speechBubble.png';
import plus from '../assets/plus.png';
import edit from '../assets/edit.png';
import deleteIcon from '../assets/deleteIcon.png';
import back from '../assets/back.png';
import userIcon from '../assets/user.png';
import collaborators from '../assets/collaborators.png';
import deadline from '../assets/deadline.png';
import startDate from '../assets/startDate.png';
import status from '../assets/status.png';
import more from '../assets/more.png';

import { Avatar } from '@material-tailwind/react';
import Comments from './Comments';

function SingleTaskBoard() {
	//user
	const { isLoading, user } = useContext(AuthContext);

	const { id } = useParams();
	const navigate = useNavigate();

	const [task, setTask] = useState(null);
	const [activeTab, setActiveTab] = useState('subtasks');
	const [sortMode, setSortMode] = useState('deadline');
	const [addOpen, setAddOpen] = useState(false);
	const [editOpen, setEditOpen] = useState(false);
	const [deleteOpen, setDeleteOpen] = useState(false);
	const [showMoreDetails, setShowMoreDetails] = useState(false);
	const moreDetailsRef = useRef(null);

	// Task Date formatter
	function formatDate(dateString) {
		if (!dateString) return 'No Date';
		const date = new Date(dateString);
		if (isNaN(date.getTime())) return 'Invalid Date';
		return new Intl.DateTimeFormat('de-DE', {
			day: '2-digit',
			month: '2-digit',
			year: '2-digit',
		})
			.format(date)
			.split('.')
			.join('/');
	}
	const deadlineFormatted = task ? formatDate(task.deadline) : 'No Date';
	const startDateFormatted = task ? formatDate(task.startDate) : 'No Date';

	// Status Label
	function getStatusLabel(status) {
		switch (status) {
			case 'backlog':
				return {
					label: 'To Do',
					className: 'bg-[#5a5a5a] text-white',
				};
			case 'inProgress':
				return {
					label: 'In Progress',
					className: 'bg-[#c07a19] text-white',
				};
			case 'done':
				return {
					label: 'Done',
					className: 'bg-[#08A045] text-white',
				};
			default:
				return {
					label: 'Unknown',
					className: 'bg-[#d3d3d3] text-black',
				};
		}
	}

	const fetchTask = async () => {
		try {
			const data = await getTaskById(id);
			const sortedSubtasks = sortSubtasks(data.subtasks, sortMode);
			setTask({ ...data, subtasks: sortedSubtasks });
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchTask();
	}, [id, sortMode]);

	const sortSubtasks = (subtasks, mode) => {
		switch (mode) {
			case 'priority':
				return [...subtasks].sort((a, b) => {
					const priorities = { high: 3, medium: 2, low: 1 };
					return priorities[b.priority] - priorities[a.priority];
				});
			case 'status':
				return [...subtasks].sort((a, b) => {
					const statuses = { done: 3, inProgress: 2, backlog: 1 };
					return statuses[b.status] - statuses[a.status];
				});
			default:
				return [...subtasks].sort(
					(a, b) => new Date(a.deadline) - new Date(b.deadline)
				);
		}
	};

	const handleTabChange = (tab) => {
		setActiveTab(tab);
	};

	const handleSubtaskUpdate = (updatedSubtask) => {
		setTask((prevTask) => {
			const updatedSubtasks = prevTask.subtasks.map((subtask) =>
				subtask._id === updatedSubtask._id ? updatedSubtask : subtask
			);
			return { ...prevTask, subtasks: sortSubtasks(updatedSubtasks, sortMode) };
		});

		fetchTask();
	};

	const handleSubtaskDelete = (subtaskId) => {
		setTask((prevTask) => {
			const filteredSubtasks = prevTask.subtasks.filter(
				(subtask) => subtask._id !== subtaskId
			);
			return { ...prevTask, subtasks: filteredSubtasks };
		});

		fetchTask();
	};

	const handleAddOpen = () => {
		setAddOpen(true);
	};

	const handleAddClose = () => {
		setAddOpen(false);
	};

	const handleSubtaskAdded = (newSubtask) => {
		setTask((prevTask) => ({
			...prevTask,
			subtasks: [...prevTask.subtasks, newSubtask],
		}));
		fetchTask();
	};

	const handleEditOpen = () => {
		setEditOpen(true);
	};

	const handleEditClose = () => {
		setEditOpen(false);
	};

	const handleDeleteOpen = () => {
		setDeleteOpen(true);
	};

	const handleDeleteClose = () => {
		setDeleteOpen(false);
	};

	const handleDeleteTask = async () => {
		try {
			await deleteTask(task._id);
			navigate(-1);
		} catch (error) {
			console.error(`Error deleting task:`, error);
		}
	};

	const handleTaskUpdate = async (updatedTask) => {
		try {
			const updated = await updateTask(task._id, updatedTask);
			if (updated) {
				setTask({ ...task, ...updatedTask });
			}
		} catch (error) {
			console.error('Error updating task:', error);
		}
	};

	const toggleMoreDetails = () => {
		const moreDetails = moreDetailsRef.current;
		if (!showMoreDetails) {
			const height = moreDetails.scrollHeight;
			moreDetails.style.height = `${height}px`;
		} else {
			moreDetails.style.height = '0';
		}
		setShowMoreDetails(!showMoreDetails);
	};

	return (
		<div className="p-10 w-full h-full flex justify-center items-center">
			<div className="w-[1200px] h-[550px] rounded-[30px] border-[5px] border-[#363636] bg-[#daf0fd] shadow-2xl p-1 relative">
				{/* Delete, Edit and Back Buttons and Dialogs */}
				<button onClick={() => navigate(-1)} className="absolute top-4 right-6">
					<img src={back} alt="edit icon" width={22} />
				</button>
				{hasPermission(user.role.permissions, ['editTicket']) ? (
					<button
						onClick={() => task && handleEditOpen()}
						className="absolute top-12 left-[455px]"
					>
						<img src={edit} alt="edit icon" width={20} />
					</button>
				) : (
					''
				)}
				{hasPermission(user.role.permissions, ['deleteTicket']) ? (
					<button
						onClick={() => task && handleDeleteOpen()}
						className="absolute top-20 left-[455px]"
					>
						<img src={deleteIcon} alt="edit icon" width={20} />
					</button>
				) : (
					''
				)}

				<EditTaskDialog
					task={task}
					open={editOpen}
					onClose={handleEditClose}
					onUpdate={handleTaskUpdate}
				/>
				<DeleteTaskDialog
					open={deleteOpen}
					onClose={handleDeleteClose}
					onDelete={handleDeleteTask}
					task={task}
				/>
				{/* Task Information left side */}
				<div className="p-3 flex justify-center items-center w-full h-full rounded-3xl">
					<div className="w-[38%] h-full flex flex-col justify-start items-center">
						<h2 className="self-start font-outfit font-[700] text-[40px] text-[#363636] tracking-tight leading-tight mb-2">
							{task?.title}
						</h2>
						<div className="taskInformation w-full flex flex-wrap justify-center items-center">
							<div className="w-1/2 h-[40px] flex items-center justify-start gap-3">
								<img src={userIcon} alt="lead icon" width={23} />
								<Avatar
									src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWgel"
									alt="avatar"
									className="w-[33px] h-[33px]"
								/>
							</div>
							<div className="w-1/2 h-[40px] flex items-center justify-between">
								<div className="flex items-center justify-start gap-3">
									<img src={status} alt="status icon" width={23} />
									{task && (
										<span
											className={`font-outfit font-[200] text-[13px] w-[90px] h-[21px] rounded-[20px] flex justify-center items-center gap-1 ${
												getStatusLabel(task.status).className
											}`}
										>
											<div className="w-[4px] h-[4px] rounded-full bg-white "></div>
											<h4>{getStatusLabel(task.status).label}</h4>
										</span>
									)}
								</div>
								<button onClick={toggleMoreDetails}>
									<img src={more} alt="see more icon" width={30} />
								</button>
							</div>
							<div
								ref={moreDetailsRef}
								className="w-full overflow-hidden transition-height duration-500 ease-in-out"
								style={{ height: 0 }}
							>
								<div className="w-full flex">
									<div className="w-1/2 h-[40px] flex items-center justify-start gap-3">
										<img src={collaborators} alt="lead icon" width={23} />
										<div className="w-[60px] w-max-[67px] h-[30px] h-max-[30px] flex justify-end relative">
											<Avatar
												src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWgel"
												alt="avatar"
												className="w-[29px] h-[29px] absolute top-0 left-0 z-10"
											/>
											<Avatar
												src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWgel"
												alt="avatar"
												className="w-[29px] h-[29px] absolute  top-0 left-[15px] z-20"
											/>
											<Avatar
												src="https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=1923&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWgel"
												alt="avatar"
												className="w-[29px] h-[29px] absolute z-30 top-0 left-[30px]"
											/>
										</div>
									</div>
									<div className="w-1/2 h-[40px] flex items-center justify-between gap-3 pe-5">
										<div className="flex items-center gap-2">
											<img
												src={startDate}
												alt="lead icon"
												width={18}
												className="ms-[2px]"
											/>
											<h5>
												<span className="font-outfit text-[16px] font-[400] text-[#5a5a5a]">
													{startDateFormatted}
												</span>
											</h5>
										</div>
										<div className="flex items-center gap-2">
											<img
												src={deadline}
												alt="lead icon"
												width={18}
												className="ms-[2px]"
											/>
											<h5>
												<span className="font-outfit text-[16px] font-[400] text-[#5a5a5a]">
													{deadlineFormatted}
												</span>
											</h5>
										</div>
									</div>
								</div>
								<h2 className="self-start font-outfit font-[300] text-[15px] text-[#363636] tracking-tight">
									{task?.description}
								</h2>
							</div>
						</div>
						<div className="w-full mt-2 border-[.5px] border-black "></div>
						{/* Comments */}
						<div className="w-full flex justify-start items-center gap-2">
							<h2 className="font-outfit font-[700] text-[24px] text-[#363636] tracking-tighter">
								Comments
							</h2>
							<img
								src={SpeechBubble}
								alt="Comments Button"
								width={25}
								height={25}
							/>
						</div>
						<div className="w-full h-full overflow-auto no-scrollbar">
							<Comments />
						</div>
					</div>
					{/* Right side of the div - Subtasks and Progress */}
					<div className="w-[62%] h-full flex flex-col justify-start items-center ps-6 pt-1">
						<div className="w-full flex justify-around items-center font-outfit text-[48px] font-[700] text-[#363636] tracking-tight mb-4">
							<button
								className={`h2 ${
									activeTab === 'subtasks' ? 'text-[#681FDE]' : 'text-[#363636]'
								}`}
								onClick={() => handleTabChange('subtasks')}
							>
								Subtasks
							</button>
							<button
								className={`h2 ${
									activeTab === 'progress' ? 'text-[#681FDE]' : 'text-[#363636]'
								}`}
								onClick={() => handleTabChange('progress')}
							>
								Progress
							</button>
						</div>
						<div className="w-full h-full flex flex-col">
							{activeTab === 'subtasks' && task?.subtasks ? (
								<>
									<div className="w-full ps-6 mb-4 flex justify-between items-center bg-[#daf0fd]">
										<div className="flex gap-3">
											<p className="font-outfit font-[600] text-[18px] text-[#438CDB]">
												sort by
											</p>
											<select
												onChange={(e) => setSortMode(e.target.value)}
												value={sortMode}
												className="w-26 py-1 px-2 rounded-3xl font-outfit font-[400] text-[14px] bg-transparent border-[1px] border-[#363636]"
											>
												<option value="deadline">Deadline</option>
												<option value="priority">Priority</option>
												<option value="status">Status</option>
											</select>
										</div>
										{hasPermission(user.role.permissions, ['addSubtask']) ? (
											<button
												onClick={handleAddOpen}
												className="py-1 px-4 bg-[#363636] text-white rounded-2xl flex items-center gap-2"
											>
												<img src={plus} alt="Add Subtask" width={12} />
												<h5 className="font-outfit font-[300] text-[12px] ">
													Add Subtask
												</h5>
											</button>
										) : (
											''
										)}

										<AddSubtaskDialog
											open={addOpen}
											onClose={handleAddClose}
											onUpdate={handleSubtaskAdded}
											taskId={task._id}
										/>
									</div>
									<div className="h-[380px] w-full overflow-scroll flex flex-col gap-2">
										{task?.subtasks.map((subtask) => (
											<SingleTaskSubtask
												key={subtask._id}
												subtask={subtask}
												onUpdate={handleSubtaskUpdate}
												onDelete={handleSubtaskDelete}
											/>
										))}
									</div>
								</>
							) : (
								<div className="px-4 h-full w-full">
									<SingleTaskProgress />
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SingleTaskBoard;
