import React, { useState, useEffect } from 'react';
import { createTask } from '../services/TasksRequests';
import { getAllUsers, getRoles } from '../services/UserRequests';
import axiosClient from '../axiosClient';

function AddTaskDialog({ open, onClose, onUpdate }) {
	const initialFormData = {
		title: '',
		description: '',
		startDate: '',
		deadline: '',
		status: 'backlog',
		priority: 'low',
		leader: '',
		collaborators: [],
	};

	const [formData, setFormData] = useState(initialFormData);
	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [error, setError] = useState('');

	useEffect(() => {
		if (open) {
			getAllUsers('project=true')
				.then((data) => {
					setUsers(data);
				})
				.catch((error) => console.error('Failed to fetch users:', error));
			getRoles('project=true')
				.then((data) => {
					setRoles(data.map((role) => role.name));
				})
				.catch((error) => console.error('Failed to fetch users:', error));
		}
	}, [open]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleLeaderChange = (e) => {
		setFormData((prev) => ({ ...prev, leader: e.target.value }));
	};

	const handleCollaboratorsChange = (e) => {
		const value = e.target.value;
		const checked = e.target.checked;
		setFormData((prev) => ({
			...prev,
			collaborators: checked
				? [...prev.collaborators, value]
				: prev.collaborators.filter((c) => c !== value),
		}));
	};

	const handleSave = async () => {
		if (!formData.leader) {
			setError('A leader must be selected.');
			return;
		}
		try {
			const newTask = await createTask(formData);
			if (newTask) {
				onUpdate(newTask);
			}
			resetForm();
			onClose();
		} catch (error) {
			console.error('Failed to create task:', error);
		}
	};

	const resetForm = () => {
		setFormData(initialFormData);
		setError('');
	};

	if (!open) {
		return null;
	}

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
			<div className="bg-[#EFF9FF] rounded-3xl p-6 w-full max-w-lg mx-auto md:h-[700px] md:overflow-scroll">
				<div className="font-outfit text-[32px] font-[500] text-[#F55D3E] mb-4">
					Add Task
				</div>
				<div className="w-full flex flex-col gap-5">
					<input
						type="text"
						name="title"
						value={formData.title}
						onChange={handleChange}
						className="text-[18px] font-outfit font-[500] text-black bg-transparent border border-black rounded-2xl px-3 py-2 "
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
					<div className="w-full flex items-center justify-center gap-5">
						<div className="w-1/2 flex flex-col items-start">
							<h2 className="text-[18px] font-outfit font-[500]">Start Date</h2>
							<input
								type="date"
								name="startDate"
								value={formData.startDate}
								onChange={handleChange}
								className="text-[18px] font-outfit font-[500] text-black bg-transparent border border-black rounded-2xl px-3 py-2 w-full"
							/>
						</div>
						<div className="w-1/2 flex flex-col items-start">
							<h2 className="text-[18px] font-outfit font-[500]">Deadline</h2>
							<input
								type="date"
								name="deadline"
								value={formData.deadline}
								onChange={handleChange}
								className="text-[18px] font-outfit font-[500] text-black bg-transparent border border-black rounded-2xl px-3 py-2 w-full"
							/>
						</div>
					</div>
					<div className="bg-[#C1E1F5] p-4 rounded-xl">
						<label className="text-[20px] font-outfit font-[500] text-black">
							Leader:{' '}
							<span className="ms-6">
								(
								<span className="text-[20px] font-outfit font-[500] text-[#681FDE]">
									required
								</span>
								)
							</span>
						</label>
						<div className="overflow-scroll h-48">
							{users
								.filter((user) => ['Admin', ...roles].includes(user.role.name))
								.map((user) => (
									<div key={user._id}>
										<input
											type="radio"
											id={user._id}
											name="leader"
											value={user._id}
											checked={formData.leader === user._id}
											onChange={handleLeaderChange}
										/>
										<label
											htmlFor={user._id}
											className="ms-3 text-[20px] font-outfit font-[300] text-black"
										>
											{user.name
												? `${user.name} (${user.role.name})`
												: 'No Name Provided'}
										</label>
									</div>
								))}
						</div>
					</div>
					<div className="bg-[#C1E1F5] p-4 rounded-xl">
						<label className="text-[20px] font-outfit font-[500] text-black">
							Collaborators:
						</label>
						<div className="h-48 overflow-scroll">
							{users.map((user) => (
								<div key={user._id}>
									<input
										type="checkbox"
										id={`collab-${user._id}`}
										name="collaborators"
										value={user._id}
										checked={formData.collaborators.includes(user._id)}
										onChange={handleCollaboratorsChange}
									/>
									<label
										htmlFor={`collab-${user._id}`}
										className="ms-3 text-[20px] font-outfit font-[300] text-black"
									>
										{user.name
											? `${user.name} (${user.role.name})`
											: 'No Name Provided'}
									</label>
								</div>
							))}
						</div>
					</div>
					{error && (
						<div className="text-red-500 text-[18px] font-outfit font-[500]">
							{error}
						</div>
					)}
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

export default AddTaskDialog;
