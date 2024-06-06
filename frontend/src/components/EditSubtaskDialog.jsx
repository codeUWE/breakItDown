import React, { useState, useEffect } from 'react';
import { updateSubtask } from '../services/TasksRequests';
import { getAllUsers } from '../services/UserRequests';

export default function EditSubtaskDialog({
	subtask,
	open,
	onClose,
	onUpdate,
}) {
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		detailedInformation: '',
		deadline: '',
		status: '',
		priority: '',
		assignee: '',
	});

	const [users, setUsers] = useState([]);

	useEffect(() => {
		const fetchUsers = async () => {
			const allUsers = await getAllUsers('project=true');
			setUsers(allUsers);
		};
		fetchUsers();
	}, []);

	useEffect(() => {
		if (subtask && open) {
			setFormData({
				title: subtask.title || '',
				description: subtask.description || '',
				detailedInformation: subtask.detailedInformation || '',
				deadline: subtask.deadline ? subtask.deadline.substring(0, 10) : '',
				status: subtask.status || '',
				priority: subtask.priority || '',
				assignee: subtask.assignee ? subtask.assignee._id : '',
			});
		}
	}, [subtask, open]);

	const handleChange = (event) => {
		const { name, value } = event.target;

		if (name === 'assignee' && value === 'none') {
			setFormData((prev) => ({ ...prev, [name]: null }));
		} else {
			setFormData((prev) => ({ ...prev, [name]: value }));
		}
	};

	const handleSave = async () => {
		const updatedData = await updateSubtask(subtask._id, formData);
		if (updatedData) {
			onUpdate(updatedData);
		}
		onClose();
	};

	if (!open) {
		return null;
	}

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
			<div className="bg-[#EFF9FF] rounded-3xl p-6 w-full max-w-lg mx-auto md:h-[700px] md:overflow-scroll">
				<div className="font-outfit text-[32px] text-[#F55D3E] font-[500] mb-4">
					Edit Subtask below
				</div>
				<div className="flex flex-col gap-5">
					<input
						type="text"
						name="title"
						value={formData.title}
						onChange={handleChange}
						className="text-[18px] font-outfit font-[500] text-black bg-transparent border border-black rounded-2xl px-3 py-2"
						placeholder="Title"
					/>
					<input
						type="text"
						name="description"
						value={formData.description}
						onChange={handleChange}
						className="text-[18px] font-outfit font-[500] text-black bg-transparent border border-black rounded-2xl px-3 py-2"
						placeholder="Description"
					/>
					<input
						type="text"
						name="detailedInformation"
						value={formData.detailedInformation}
						onChange={handleChange}
						className="text-[18px] font-outfit font-[500] text-black bg-transparent border border-black rounded-2xl px-3 py-2"
						placeholder="Detailed Information"
					/>
					<input
						type="date"
						name="deadline"
						value={formData.deadline}
						onChange={handleChange}
						className="text-[18px] font-outfit font-[500] text-black bg-transparent border border-black rounded-2xl px-3 py-2"
						placeholder="Deadline"
					/>
					<select
						name="priority"
						value={formData.priority}
						onChange={handleChange}
						className="text-[18px] font-outfit font-[500] text-black bg-transparent border border-black rounded-2xl px-3 py-2"
					>
						<option value="low">Low</option>
						<option value="medium">Medium</option>
						<option value="high">High</option>
					</select>
					<select
						name="status"
						value={formData.status}
						onChange={handleChange}
						className="text-[18px] font-outfit font-[500] text-black bg-transparent border border-black rounded-2xl px-3 py-2"
					>
						<option value="backlog">To Do</option>
						<option value="inProgress">In Progress</option>
						<option value="done">Done</option>
					</select>
					<div className="bg-[#C1E1F5] p-4 rounded-xl">
						<div className="h-60 overflow-scroll flex flex-col gap-2">
							<h2 className="text-[20px] font-outfit font-[500] text-black">
								Select or Remove Assignee
							</h2>
							<label className="flex items-center">
								<input
									type="radio"
									name="assignee"
									value="none"
									checked={formData.assignee === null}
									onChange={handleChange}
								/>
								<span className="ms-3 text-[20px] font-outfit font-[800] text-[#681FDE]">
									No Assignee
								</span>
							</label>
							{users.map((user) => (
								<label key={user._id} className="flex items-center">
									<input
										type="radio"
										name="assignee"
										value={user._id}
										checked={formData.assignee === user._id}
										onChange={handleChange}
									/>
									<span className="ms-3 text-[20px] font-outfit font-[300] text-black">
										{user.name}
									</span>
								</label>
							))}
						</div>
					</div>
				</div>
				<div className="flex justify-end mt-4">
					<button
						onClick={onClose}
						className="me-4 py-1 w-40 text-white rounded-2xl  mt-4  bg-[#FE4A49] font-outfit font-[500] self=en"
					>
						Cancel
					</button>
					<button
						onClick={handleSave}
						className="py-1 w-40 text-white rounded-2xl  mt-4 me-8 bg-[#08A045] font-outfit font-[500]"
					>
						Save
					</button>
				</div>
			</div>
		</div>
	);
}
