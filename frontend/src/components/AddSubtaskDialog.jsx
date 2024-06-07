import React, { useState, useEffect } from 'react';
import { createSubtask } from '../services/TasksRequests';
import { getAllUsers } from '../services/UserRequests';

function AddSubtaskDialog({ taskId, open, onClose, onUpdate }) {
	const initialFormData = {
		title: '',
		description: '',
		detailedInformation: '',
		deadline: '',
		status: 'backlog',
		priority: 'low',
		assignee: null, // Standardwert auf null setzen
		task: taskId,
	};

	const [formData, setFormData] = useState(initialFormData);
	const [users, setUsers] = useState([]);
	const [errors, setErrors] = useState({});

	useEffect(() => {
		const fetchUsers = async () => {
			const allUsers = await getAllUsers('project=true');
			setUsers(allUsers);
		};
		fetchUsers();
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		const newValue = name === 'assignee' && value === 'none' ? null : value;
		setFormData((prev) => ({ ...prev, [name]: newValue }));
	};

	const handleSave = async () => {
		const newErrors = {};
		if (!formData.title) newErrors.title = 'Title is required.';
		if (!formData.description)
			newErrors.description = 'Description is required.';
		if (!formData.detailedInformation)
			newErrors.detailedInformation = 'Detailed Information is required.';

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		try {
			const newSubtask = await createSubtask({ ...formData, task: taskId });
			if (newSubtask) {
				onUpdate(newSubtask);
			}
			resetForm();
			onClose();
		} catch (error) {
			console.error('Failed to create subtask:', error);
		}
	};

	const resetForm = () => {
		setFormData(initialFormData);
		setErrors({});
	};

	if (!open) {
		return null;
	}

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
			<div className="bg-[#EFF9FF] rounded-3xl p-6 w-full max-w-lg mx-auto md:h-[700px] md:overflow-scroll">
				<div className="font-outfit text-[32px] font-[500] text-[#F55D3E] mb-4">
					Add Subtask
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
					{errors.title && (
						<div className="text-red-500 text-[14px] font-outfit font-[500]">
							{errors.title}
						</div>
					)}
					<input
						type="text"
						name="description"
						value={formData.description}
						onChange={handleChange}
						className="text-[18px] font-outfit font-[500] text-black bg-transparent border border-black rounded-2xl px-3 py-2"
						placeholder="Description"
					/>
					{errors.description && (
						<div className="text-red-500 text-[14px] font-outfit font-[500]">
							{errors.description}
						</div>
					)}
					<input
						type="text"
						name="detailedInformation"
						value={formData.detailedInformation}
						onChange={handleChange}
						className="text-[18px] font-outfit font-[500] text-black bg-transparent border border-black rounded-2xl px-3 py-2"
						placeholder="Detailed Information"
					/>
					{errors.detailedInformation && (
						<div className="text-red-500 text-[14px] font-outfit font-[500]">
							{errors.detailedInformation}
						</div>
					)}
					<div className="w-full">
						<h2 className="text-[20px] font-outfit font-[500] text-black">
							Deadline
						</h2>
						<input
							type="date"
							name="deadline"
							value={formData.deadline}
							onChange={handleChange}
							className="text-[18px] font-outfit font-[500] text-black bg-transparent border border-black rounded-2xl px-3 w-full py-2"
						/>
					</div>
					<div className="w-full">
						<h2 className="text-[20px] font-outfit font-[500] text-black">
							Priority
						</h2>
						<select
							name="priority"
							value={formData.priority}
							onChange={handleChange}
							className="text-[18px] font-outfit font-[500] text-black bg-transparent border border-black rounded-2xl px-3 w-full py-2"
						>
							<option value="low">Low</option>
							<option value="medium">Medium</option>
							<option value="high">High</option>
						</select>
					</div>
					<div className="bg-[#C1E1F5] p-4 rounded-xl">
						<label className="text-[20px] font-outfit font-[500] text-black">
							Assignee:
						</label>
						<div className="overflow-scroll h-48">
							<label className="flex items-center">
								<input
									type="radio"
									name="assignee"
									value="none"
									checked={!formData.assignee}
									onChange={handleChange}
									className="mr-2"
								/>
								<span className="ms-1 text-[20px] font-outfit font-[800] text-[#681FDE]">
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
										className="mr-2"
									/>
									<span className="text-[20px] font-outfit font-[300] text-black">
										{user.name ? user.name : 'No Name Provided'}
									</span>
								</label>
							))}
						</div>
					</div>
				</div>
				<div className="flex justify-end mt-4">
					<button
						onClick={() => {
							resetForm();
							onClose();
						}}
						className="me-4 py-1 w-40 text-white rounded-2xl flex justify-center items-center gap-2 mt-4 bg-[#FE4A49] font-outfit font-[500]"
					>
						Cancel
					</button>
					<button
						className="py-1 w-40 text-white rounded-2xl flex justify-center items-center gap-2 mt-4 me-8 bg-[#08A045] font-outfit font-[500]"
						onClick={handleSave}
					>
						Save
					</button>
				</div>
			</div>
		</div>
	);
}

export default AddSubtaskDialog;
