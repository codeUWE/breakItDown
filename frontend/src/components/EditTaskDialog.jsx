import { useState, useEffect } from 'react';
import { updateTask } from '../services/TasksRequests';
import { getAllUsers, getRoles } from '../services/UserRequests';

function EditTaskDialog({ task, open, onClose, onUpdate }) {
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		startDate: '',
		deadline: '',
		leader: '',
		collaborators: [],
	});
	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);

	useEffect(() => {
		if (open) {
			getAllUsers('project=true')
				.then(setUsers)
				.catch((error) => console.error('Failed to fetch users:', error));
			getRoles('project=true')
				.then((data) => {
					setRoles(data.map((role) => role.name));
				})
				.catch((error) => console.error('Failed to fetch users:', error));
		}
	}, [open]);

	useEffect(() => {
		if (task && open) {
			setFormData({
				title: task.title || '',
				description: task.description || '',
				startDate: task.startDate ? task.startDate.substring(0, 10) : '',
				deadline: task.deadline ? task.deadline.substring(0, 10) : '',
				leader: task.leader ? task.leader._id : '', // Sicherstellen, dass leader korrekt gesetzt ist
				collaborators: task.collaborators.map((collab) => collab._id) || [],
			});
		}
	}, [task, open]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleLeaderChange = (e) => {
		const leaderId = e.target.value;
		setFormData((prev) => ({
			...prev,
			leader: leaderId,
		}));
	};

	const handleCollaboratorsChange = (e) => {
		const value = e.target.value;
		const checked = e.target.checked;

		setFormData((prev) => {
			const cleanedCollaborators = prev.collaborators.filter(
				(collab) => typeof collab === 'string'
			);

			const newCollaborators = checked
				? [...cleanedCollaborators, value]
				: cleanedCollaborators.filter((id) => id !== value);

			return { ...prev, collaborators: newCollaborators };
		});
	};

	const handleSave = async () => {
		console.log('Final form data:', formData);
		try {
			const updatedTask = await updateTask(task._id, formData);
			onUpdate(updatedTask);
		} catch (error) {
			console.error('Failed to update task:', error);
		}
		onClose();
	};

	if (!open) {
		return null;
	}

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
			<div className="bg-[#EFF9FF] rounded-3xl p-6 w-full max-w-lg mx-auto md:h-[700px] md:overflow-scroll">
				<div className="font-outfit text-[32px] font-[500] text-[#F55D3E] mb-4">
					Edit Task below
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
					<div className="flex items-center justify-evenly gap-5">
						<input
							type="date"
							name="startDate"
							value={formData.startDate}
							onChange={handleChange}
							className="text-[18px] font-outfit font-[500] text-black bg-transparent border border-black rounded-2xl px-3 py-2 w-1/2"
						/>
						<input
							type="date"
							name="deadline"
							value={formData.deadline}
							onChange={handleChange}
							className="text-[18px] font-outfit font-[500] text-black bg-transparent border border-black rounded-2xl px-3 py-2 w-1/2"
						/>
					</div>
					<div className="bg-[#C1E1F5] p-4 rounded-xl">
						<label className="text-[20px] font-outfit font-[500] text-black">
							Leader:
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
				</div>
				<div className="flex justify-end mt-4">
					<button
						onClick={onClose}
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

export default EditTaskDialog;
