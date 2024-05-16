import { useState, useRef, useContext } from 'react';
import {
	assignSubtask,
	deleteSubtask,
	updateSubtask,
} from '../services/TasksRequests';
import DeleteSubtaskDialog from './DeleteSubtaskDialog';

//assets
import backlog from '../assets/backlog.png';
import assign from '../assets/assign.png';
import start from '../assets/start.png';
import inProgress from '../assets/inProgress.png';
import done from '../assets/done.png';
import letVerify from '../assets/letVerify.png';
import deleteIcon from '../assets/deleteIcon.png';
import edit from '../assets/edit.png';

import { Avatar, Tooltip } from '@material-tailwind/react';
import EditSubtaskDialog from './EditSubtaskDialog';

//userIntegration
import { AuthContext } from '../context/AuthProvider';
import { hasPermission } from '../services/utils';

function SingleTaskSubtask({
	subtask,
	taskLeaderId,
	onUpdate,
	onDelete,
	isClosed,
}) {
	const [deleteOpen, setDeleteOpen] = useState(false);
	const [showDetails, setShowDetails] = useState(false);
	const [editOpen, setEditOpen] = useState(false);
	const detailsRef = useRef(null);

	//extracting subtasks details
	const {
		_id,
		title,
		assignee,
		description,
		status,
		priority,
		detailedInformation,
		deadline,
	} = subtask;

	//permissions
	const { isLoading, user } = useContext(AuthContext);
	const isAssignee = assignee ? assignee._id === user._id : false;
	function canEditSubtask() {
		const isLeader =
			user.role.name === 'Team Leader' && taskLeaderId === user._id;
		const canEdit =
			hasPermission(user.role.permissions, ['editSubtask']) ||
			(isLeader && hasPermission(user.role.permissions, ['leaderEditSubtask']));
		return canEdit;
	}
	function canDeleteSubtask() {
		const isLeader =
			user.role.name === 'Team Leader' && taskLeaderId === user._id;
		const canDelete =
			hasPermission(user.role.permissions, ['deleteSubtask']) ||
			(isLeader &&
				hasPermission(user.role.permissions, ['leaderDeleteSubtask']));
		return canDelete;
	}

	//handler functions
	const handleDeleteOpen = () => setDeleteOpen(true);
	const handleDeleteClose = () => setDeleteOpen(false);
	const handleEditOpen = () => setEditOpen(true);
	const handleEditClose = () => setEditOpen(false);

	const handleDeleteConfirmed = (subtaskId) => {
		deleteSubtask(subtaskId).then(() => {
			onDelete(subtaskId);
			setDeleteOpen(false);
		});
	};

	//handler for detailed information
	const toggleDetails = () => {
		const details = detailsRef.current;
		if (!showDetails) {
			const height = details.scrollHeight;
			details.style.height = `${height}px`;
		} else {
			details.style.height = '0';
		}
		setShowDetails(!showDetails);
	};

	//date formatter
	function formatDate(dateString) {
		if (!dateString) return ['No ', ' Date'];
		try {
			const date = new Date(dateString);
			if (isNaN(date)) return ['Invalid', 'Date'];
			const formattedDate = new Intl.DateTimeFormat('de-DE', {
				day: '2-digit',
				month: '2-digit',
				year: '2-digit',
			}).format(date);
			return formattedDate.replace(/\./g, '/').split('/');
		} catch (error) {
			console.error('Error while formatting the date:', error);
			return ['Faulty', 'Date'];
		}
	}
	const dateParts = formatDate(deadline); // ["15", "04", "24"]

	//subtask details updater functions
	const handleUpdate = async (updates) => {
		const updatedSubtask = await updateSubtask(subtask._id, updates);
		if (updatedSubtask) {
			onUpdate(updatedSubtask);
		}
	};

	const handleStatusChange = (newStatus) => {
		handleUpdate({ status: newStatus });
	};

	const handleAssign = async () => {
		const assignedSubtask = await assignSubtask(subtask._id);
		if (assignedSubtask) {
			onUpdate(assignedSubtask);
		}
	};

	const getPriorityLabel = (priority) => {
		switch (priority) {
			case 'low':
				return {
					label: 'Low',
					className: 'bg-[#438CDB] text-white',
				};
			case 'medium':
				return {
					label: 'Medium',
					className: 'bg-[#681FDE] text-white',
				};
			case 'high':
				return {
					label: 'High',
					className: 'bg-[#FF3D00] text-white',
				};
			default:
				return {
					label: 'Unknown',
					className: 'bg-[#d3d3d3] text-black',
				};
		}
	};

	return (
		<>
			<div className="w-full flex flex-col px-6 gap-3">
				<div className="w-full flex justify-between items-center">
					<div className="w-[500px] h-max-[40px] ">
						<h2 className="font-outfit text-[24px] font-[500] text-[#2c2c2c] ">
							{title}
						</h2>
						<p className=" font-outfit text-[16px] font-[300] text-[#5a5a5a] text-ellipsis">
							{description}
						</p>
					</div>
					<div className="h-full pt-2 flex flex-col justify-start items-center gap-2 ">
						{assignee ? (
							<Avatar
								src={
									assignee.profilePicture ||
									'https://cdn-icons-png.flaticon.com/512/149/149071.png'
								}
								className="w-8 h-8"
							/>
						) : (
							<span className="font-outfit font-[700]">No Assignee</span>
						)}
					</div>
				</div>
				<div className="w-full flex justify-between items-center">
					<div className="flex justify-center items-center gap-3">
						<h3 className="font-outfit text-[16px] font-[500] text-[#575761]">
							Deadline:
						</h3>
						<p>
							{dateParts.map((part, index) => (
								<span
									key={index}
									className="font-outfit text-[16px] font-[400] text-[#575761]"
								>
									{part}
									{index !== dateParts.length - 1 && (
										<span className="text-[#FE4A49] font-[600] mx-[2px]">
											/
										</span>
									)}
								</span>
							))}
						</p>
						<span
							className={`font-outfit font-[400] text-[13px] text-white w-[90px] h-[21px] rounded-[20px] flex justify-center items-center gap-1 ${
								getPriorityLabel(priority).className
							}`}
						>
							<h4>{getPriorityLabel(priority).label}</h4>
						</span>
						{status === 'backlog' && (
							<span className="font-outfit font-[200] text-[13px] text-white w-[90px] h-[21px] bg-[#575761] rounded-[20px] flex justify-center items-center gap-1 ">
								<div className="w-[4px] h-[4px] rounded-full bg-white "></div>
								<h4>To Do</h4>
							</span>
						)}
						{status === 'inProgress' && (
							<span className="font-outfit font-[200] text-[13px] text-white w-[90px] h-[21px] bg-[#c07a19] rounded-[20px] flex justify-center items-center gap-1 ">
								<div className="w-[4px] h-[4px] rounded-full bg-white "></div>
								<h4>In Progress</h4>
							</span>
						)}
						{status === 'done' && (
							<span className="font-outfit font-[200] text-[13px] text-white w-[90px] h-[21px] bg-[#08A045] rounded-[20px] flex justify-center items-center gap-1 ">
								<div className="w-[4px] h-[4px] rounded-full bg-white "></div>
								<h4>Done</h4>
							</span>
						)}
					</div>
					{!isClosed && (
						<div className="ms-[20%] flex justify-center items-center gap-2">
							{isAssignee && (
								<>
									{status === 'backlog' && (
										<>
											<Tooltip
												content="Start Subtask"
												className="bg-[#575761] text-[12px] font-outfit font-[600] p-1 px-2 rounded-3xl "
											>
												<button
													onClick={() => handleStatusChange('inProgress')}
												>
													<img src={start} alt="" width={27} height={27} />
												</button>
											</Tooltip>
										</>
									)}
									{status === 'inProgress' && (
										<>
											<Tooltip
												content="Move back to Backlog"
												className="bg-[#575761] text-[12px] font-outfit font-[600] p-1 px-2 rounded-3xl"
											>
												<button onClick={() => handleStatusChange('backlog')}>
													<img src={backlog} alt="" width={27} height={27} />
												</button>
											</Tooltip>
											<Tooltip
												content="Subtask finished"
												className="bg-[#575761] text-[12px] font-outfit font-[600] p-1 px-2 rounded-3xl"
											>
												<button onClick={() => handleStatusChange('done')}>
													<img src={done} alt="" width={27} height={27} />
												</button>
											</Tooltip>
										</>
									)}
									{status === 'done' && (
										<>
											<Tooltip
												content="Subtask back in Progress"
												className="bg-[#575761] text-[12px] font-outfit font-[600] p-1 px-2 rounded-3xl"
											>
												<button
													onClick={() => handleStatusChange('inProgress')}
												>
													<img src={inProgress} alt="" width={27} height={27} />
												</button>
											</Tooltip>
											<Tooltip
												content="Let Subtask verify"
												className="bg-[#575761] text-[12px] font-outfit font-[600] p-1 px-2 rounded-3xl"
											>
												<button>
													<img src={letVerify} alt="" width={27} height={27} />
												</button>
											</Tooltip>
										</>
									)}
								</>
							)}
							{!assignee ? (
								<Tooltip
									content="Assign to Subtask"
									className="bg-[#575761] text-[12px] font-outfit font-[600] p-1 px-2 rounded-3xl"
								>
									<button onClick={handleAssign}>
										<img src={assign} alt="" width={27} height={27} />
									</button>
								</Tooltip>
							) : (
								''
							)}
							{canEditSubtask() ? (
								<Tooltip
									content="Edit Subtask"
									className="tooltip-class"
									className="bg-[#363636] text-[12px] font-outfit font-[600] p-1 px-2 rounded-3xl"
								>
									<button onClick={handleEditOpen}>
										<img src={edit} alt="Edit Subtask" width={27} />
									</button>
								</Tooltip>
							) : null}
							{canDeleteSubtask() ? (
								<Tooltip
									content="Delete Subtask"
									className="tooltip-class"
									className="bg-[#363636] text-[12px] font-outfit font-[600] p-1 px-2 rounded-3xl"
								>
									<button onClick={handleDeleteOpen}>
										<img src={deleteIcon} alt="Delete Subtask" width={27} />
									</button>
								</Tooltip>
							) : null}
							<DeleteSubtaskDialog
								open={deleteOpen}
								onClose={handleDeleteClose}
								onDelete={handleDeleteConfirmed}
								subtask={subtask}
							/>

							<EditSubtaskDialog
								subtask={subtask}
								open={editOpen}
								onClose={handleEditClose}
								onUpdate={onUpdate}
							/>
						</div>
					)}
					<button
						onClick={toggleDetails}
						className="font-outfit font-[400] text-[16px] px-3 py-1 text-[#3c3c3c]   bg-[#C1E1F5] rounded-[20px] "
					>
						see more
					</button>
				</div>
				<div
					ref={detailsRef}
					className="overflow-hidden transition-height duration-500 ease-in-out"
					style={{ height: 0 }}
				>
					<div className="p-2 mt-2">
						<h5 className="font-outfit text-[18px] font-[500] text-[#5a5a5a] mb-2">
							Detailed Information:
						</h5>
						<p className="font-outfit text-[15px] font-[300] text-[#5a5a5a]">
							{detailedInformation}
						</p>
					</div>
				</div>

				<div className="w-full border-[.5px] border-[#575761]"></div>
			</div>
		</>
	);
}

export default SingleTaskSubtask;
