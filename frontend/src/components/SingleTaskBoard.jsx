import { useParams, useNavigate } from 'react-router-dom';
import {
	getTaskById,
	updateTask,
	deleteTask,
	toggleTaskClosed,
} from '../services/TasksRequests';
import { useEffect, useState, useRef, useContext } from 'react';
import SingleTaskSubtask from './SingleTaskSubtask';
import SingleTaskProgress from './SingleTaskProgress';
import AddSubtaskDialog from './AddSubtaskDialog';
import EditTaskDialog from './EditTaskDialog';
import DeleteTaskDialog from './DeleteTaskDialog';

import { AuthContext } from '../context/AuthProvider';
import { hasPermission } from '../services/utils';

import SpeechBubble from '../assets/speechBubble.png';
import plus from '../assets/plus.png';
import edit from '../assets/edit.png';
import deleteIcon from '../assets/deleteIcon.png';
import closedTicket from '../assets/closedTicket.png';
import back from '../assets/back.png';
import userIcon from '../assets/user.png';
import collaborators from '../assets/collaborators.png';
import deadline from '../assets/deadline.png';
import startDate from '../assets/startDate.png';
import status from '../assets/status.png';
import more from '../assets/more.png';

import { Avatar, Tooltip } from '@material-tailwind/react';
import Comments from './Comments';

function SingleTaskBoard() {
	const { isLoading, user } = useContext(AuthContext);
	const { id } = useParams();
	const navigate = useNavigate();

	// State variables
	const [task, setTask] = useState(null);
	const [activeTab, setActiveTab] = useState('subtasks');
	const [sortMode, setSortMode] = useState('deadline');
	const [addOpen, setAddOpen] = useState(false);
	const [editOpen, setEditOpen] = useState(false);
	const [deleteOpen, setDeleteOpen] = useState(false);
	const [showMoreDetails, setShowMoreDetails] = useState(false);
	const moreDetailsRef = useRef(null);
	const previousStatusRef = useRef(null); // Ref to store previous status

	// Fetch task data by ID
	const fetchTask = async () => {
		try {
			const data = await getTaskById(id);
			const sortedSubtasks = sortSubtasks(data.subtasks, sortMode);
			setTask({ ...data, subtasks: sortedSubtasks });
		} catch (error) {
			console.error(error);
		}
	};

	// Sort subtasks based on the selected mode
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

	// Handlers for various actions
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

	const handleSubtaskAdded = (newSubtask) => {
		setTask((prevTask) => ({
			...prevTask,
			subtasks: [...prevTask.subtasks, newSubtask],
		}));
		fetchTask();
	};

	const handleTabChange = (tab) => setActiveTab(tab);

	const handleAddOpen = () => setAddOpen(true);
	const handleAddClose = () => setAddOpen(false);
	const handleEditOpen = () => setEditOpen(true);
	const handleEditClose = () => setEditOpen(false);
	const handleDeleteOpen = () => setDeleteOpen(true);
	const handleDeleteClose = () => setDeleteOpen(false);

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

	const handleToggleTaskClosed = async () => {
		try {
			// Store the previous status before toggling the closed state
			if (!task.isClosed) {
				previousStatusRef.current = task.status;
			}

			const updatedTask = await toggleTaskClosed(task._id);

			// If the task is closed, set the status to 'done'
			if (updatedTask.isClosed) {
				await updateTask(task._id, { status: 'done' });
				setTask({ ...updatedTask, status: 'done' });
			} else {
				// If the task is reopened, restore the previous status
				const previousStatus = previousStatusRef.current || 'backlog';
				await updateTask(task._id, { status: previousStatus });
				setTask({ ...updatedTask, status: previousStatus });
			}
		} catch (error) {
			console.error('Error toggling task closed state:', error);
		}
	};

	// Utility functions
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

	function getStatusLabel(status) {
		switch (status) {
			case 'backlog':
				return {
					label: 'To Do',
					className: 'bg-[#575761] text-white',
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

	// Permissions
	const isLeader = task?.leader?._id === user._id;

	const canEditTicket =
		hasPermission(user.role.permissions, ['editTicket']) ||
		(isLeader && hasPermission(user.role.permissions, ['leaderEditTicket']));
	const canDeleteTicket =
		hasPermission(user.role.permissions, ['deleteTicket']) ||
		(isLeader && hasPermission(user.role.permissions, ['leaderDeleteTicket']));
	const canAddSubtask =
		hasPermission(user.role.permissions, ['addSubtask']) ||
		(isLeader && hasPermission(user.role.permissions, ['leaderAddSubtask']));
	const canCloseTicket =
		hasPermission(user.role.permissions, ['closeTicket']) ||
		(isLeader && hasPermission(user.role.permissions, ['leaderCloseTicket']));

	useEffect(() => {
		fetchTask();
	}, [id, sortMode]);

	return (
		<div className="xl:w-[97%] md:w-[95%]  h-full mx-auto flex-col justify-center items-center mt-5 mb-5 ">
			<h2 className="font-outfit font-[700] tracking-tighter xl:text-[45px] md:text-[35px] text-start mb-2">
				Task <span className="text-[#681FDE]">View</span>
			</h2>
			<div className="w-full xl:h-[670px] lg:h-[540px] md:h-[800px] mx-auto rounded-[30px] bg-[#eff9ff] p-5 relative ">
				{/* edit and delete buttons */}
				<button
					onClick={() => navigate(-1)}
					className="absolute top-4 lg:right-6 md:right-10"
				>
					<img src={back} alt="edit icon" width={22} />
				</button>
				{!task?.isClosed && canEditTicket && (
					<button
						onClick={() => task && handleEditOpen()}
						className="absolute lg:top-6 lg:left-[410px] xl:left-[535px] md:top-12 md:right-9 w-7"
					>
						<img src={edit} alt="edit icon" className="w-[23px]" />
					</button>
				)}
				{!task?.isClosed && canDeleteTicket && (
					<button
						onClick={() => task && handleDeleteOpen()}
						className="absolute lg:top-14 lg:left-[410px] xl:left-[535px] md:top-[75px] md:right-9 w-7"
					>
						<img src={deleteIcon} alt="delete icon" className="w-[23px]" />
					</button>
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
				{/* task information and comments */}
				<div className="xl:p-0 md:p-1 flex md:flex-col md:gap-6 lg:gap-2 md:items-start md:justify-start lg:flex-row lg:justify-center lg:items-center w-full h-full rounded-3xl md:overflow-scroll md:no-scrollbar">
					<div className="xl:w-[38%] lg:w-[43%] lg:h-full md:h-[600px]  flex flex-col justify-start items-center">
						<h2 className="self-start font-outfit font-[700] md:text-[40px] lg:text-[30px] xl:text-[40px] text-[#363636] tracking-tight leading-tight lg:mb-2 md:mb-8 ">
							{task?.title}
						</h2>
						<div className="taskInformation w-full flex flex-wrap justify-center items-center">
							<div className="w-1/2 h-[40px] flex items-center justify-start gap-3">
								<img src={userIcon} alt="lead icon" width={23} />
								{task && task.leader && (
									<div>
										<div className="flex items-center gap-2">
											<Tooltip
												key={task.leader.name}
												content={`Send mail to: ${task.leader.name}`}
												className="bg-[#363636] text-[12px] font-outfit font-[600] p-1 px-2 rounded-3xl"
											>
												<Avatar
													src={
														task.leader.profilePicture ||
														'https://cdn-icons-png.flaticon.com/512/149/149071.png'
													}
													alt={`${task.leader.name}'s Avatar`}
													className="w-[35px] h-[35px] cursor-pointer"
													onClick={() =>
														(window.location.href = `mailto:${task.leader.email}`)
													}
												/>
											</Tooltip>
										</div>
									</div>
								)}
							</div>
							<div className="w-1/2 h-[40px] flex items-center lg:justify-between md:justify-start">
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
									<img
										src={more}
										alt="see more icon"
										width={30}
										className="md:ms-32 lg:ms-0"
									/>
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
										<div className="flex justify-end relative">
											{task &&
												task.collaborators.map((collaborator) => {
													const avatarUrl =
														collaborator.profilePicture ||
														'https://cdn-icons-png.flaticon.com/512/149/149071.png';
													return (
														<Tooltip
															key={collaborator.name}
															content={`Send mail to: ${collaborator.name}`}
															className="bg-[#363636] text-[12px] font-outfit font-[600] p-1 px-2 rounded-3xl"
														>
															<Avatar
																src={
																	avatarUrl ||
																	'https://cdn-icons-png.flaticon.com/512/149/149071.png'
																}
																alt={`${collaborator.name}'s Avatar`}
																className="xl:w-[25px] xl:h-[25px] md:w-[35px] md:h-[35px] lg:w-[22px] lg:h-[22px] cursor-pointer"
																onClick={() =>
																	(window.location.href = `mailto:${collaborator.email}`)
																}
															/>
														</Tooltip>
													);
												})}
										</div>
									</div>
									<div className="w-1/2 h-[40px] flex items-center lg:justify-between md:justify-start gap-3 pe-6">
										<div className="flex items-center gap-2">
											<img
												src={startDate}
												alt="lead icon"
												width={18}
												className="ms-[0px]"
											/>
											<h5>
												<span className="font-outfit text-[16px] font-[400] text-[#5a5a5a]">
													{startDateFormatted}
												</span>
											</h5>
										</div>
										<div className="flex items-center xl:gap-2 lg:gap-1">
											<img
												src={deadline}
												alt="lead icon"
												width={18}
												className="ms-[4px]"
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
						<div className="w-full mt-2 border-[.5px] border-[#0000003a] "></div>
						<div className="w-full flex justify-start items-center gap-2">
							<h2 className="font-outfit font-[700] text-[28px] text-[#363636] tracking-tight">
								Comments
							</h2>
							<img
								src={SpeechBubble}
								alt="Comments Button"
								width={25}
								height={25}
							/>
						</div>
						<div className="w-full h-full overflow-auto no-scrollbar rounded-[20px] ">
							<Comments />
						</div>
					</div>
					<div className="xl:w-[62%] lg:w-[57%] md:w-full lg:h-full flex flex-col justify-start items-center xl:ps-6 pt-1">
						<div className="w-full flex justify-around items-center font-outfit xl:text-[48px] md:text-[35px] font-[700] text-[#363636] tracking-tight mb-4">
							<button
								className={`h2 ${
									activeTab === 'subtasks' ? 'text-[#681FDE]' : 'text-[#575761]'
								}`}
								onClick={() => handleTabChange('subtasks')}
							>
								Subtasks
							</button>
							<button
								className={`h2 ${
									activeTab === 'progress' ? 'text-[#681FDE]' : 'text-[#575761]'
								}`}
								onClick={() => handleTabChange('progress')}
							>
								Task Board
							</button>
						</div>
						<div className="w-full h-full flex flex-col">
							{activeTab === 'subtasks' && task?.subtasks ? (
								<>
									<div className="w-full lg:ps-6 mb-4 flex justify-between items-center bg-transparent">
										<div className="flex lg:gap-3 md:gap-1">
											<p className="font-outfit font-[600] text-[18px] text-[#438CDB] w-16">
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
										<div className="flex gap-2 ps-6 justify-center items-center xl:hidden">
											{!task?.isClosed && canAddSubtask && (
												<button
													onClick={handleAddOpen}
													className="py-1 self-end px-4 bg-[#575761] md:w-40 lg:w-36 text-white rounded-2xl flex justify-center items-center gap-2"
												>
													<img src={plus} alt="Add Subtask" width={13} />
													<h5 className="font-outfit font-[300] text-[14px]">
														Add Subtask
													</h5>
												</button>
											)}
											{canCloseTicket && (
												<button
													onClick={handleToggleTaskClosed}
													className={`py-1 self-end px-4 md:w-40 text-white rounded-2xl flex justify-center items-center gap-2 ${
														task.isClosed
															? 'bg-[#575761] lg:w-40'
															: 'bg-[#08A045] lg:w-36'
													}`}
												>
													<h4 className="font-outfit font-[500] text-[14px]">
														{task.isClosed ? 'Reopen Ticket' : 'Close Ticket'}
													</h4>
													<img
														src={closedTicket}
														alt={
															task.isClosed ? 'Reopen Ticket' : 'Close Ticket'
														}
														width={20}
													/>
												</button>
											)}
										</div>
									</div>
									<div className="xl:h-[420px] md:h-[440px] lg:h-[370px] w-full overflow-scroll md:no-scrollbar flex flex-col gap-2">
										{task?.subtasks.map((subtask) => (
											<SingleTaskSubtask
												isClosed={task.isClosed}
												key={subtask._id}
												subtask={subtask}
												taskLeaderId={task?.leader?._id}
												onUpdate={handleSubtaskUpdate}
												onDelete={handleSubtaskDelete}
											/>
										))}
									</div>
									{/* <div className="w-full flex ps-6 justify-end items-center">
										{!task?.isClosed && canAddSubtask && (
											<button
												onClick={handleAddOpen}
												className="py-1 self-end px-4 bg-[#575761] w-40 text-white rounded-2xl flex justify-center items-center gap-2 mt-4 me-8"
											>
												<img src={plus} alt="Add Subtask" width={13} />
												<h5 className="font-outfit font-[300] text-[14px]">
													Add Subtask
												</h5>
											</button>
										)}
										{canCloseTicket && (
											<button
												onClick={handleToggleTaskClosed}
												className={`py-1 self-end px-4 w-40 text-white rounded-2xl flex justify-center items-center gap-2 mt-4 me-8 ${
													task.isClosed ? 'bg-[#575761]' : 'bg-[#08A045]'
												}`}
											>
												<h4 className="font-outfit font-[500] text-[14px]">
													{task.isClosed ? 'Reopen Ticket' : 'Close Ticket'}
												</h4>
												<img
													src={closedTicket}
													alt={task.isClosed ? 'Reopen Ticket' : 'Close Ticket'}
													width={20}
												/>
											</button>
										)}
									</div>
									<AddSubtaskDialog
										open={addOpen}
										onClose={handleAddClose}
										onUpdate={handleSubtaskAdded}
										taskId={task._id}
									/> */}
								</>
							) : (
								<div className="lg:ps-4 h-full w-full">
									<SingleTaskProgress />
								</div>
							)}
						</div>
						<div className="w-full ps-6 justify-end items-center hidden xl:flex">
							{!task?.isClosed && canAddSubtask && (
								<button
									onClick={handleAddOpen}
									className="py-1 self-end px-4 bg-[#575761] w-40 text-white rounded-2xl flex justify-center items-center gap-2 mt-4 me-8"
								>
									<img src={plus} alt="Add Subtask" width={13} />
									<h5 className="font-outfit font-[300] text-[14px]">
										Add Subtask
									</h5>
								</button>
							)}
							{canCloseTicket && (
								<button
									onClick={handleToggleTaskClosed}
									className={`py-1 self-end px-4 w-40 text-white rounded-2xl flex justify-center items-center gap-2 mt-4 me-8 ${
										task?.isClosed ? 'bg-[#575761]' : 'bg-[#08A045]'
									}`}
								>
									<h4 className="font-outfit font-[500] text-[14px]">
										{task?.isClosed ? 'Reopen Ticket' : 'Close Ticket'}
									</h4>
									<img
										src={closedTicket}
										alt={task?.isClosed ? 'Reopen Ticket' : 'Close Ticket'}
										width={20}
									/>
								</button>
							)}
						</div>
						<AddSubtaskDialog
							open={addOpen}
							onClose={handleAddClose}
							onUpdate={handleSubtaskAdded}
							taskId={task?._id}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SingleTaskBoard;
