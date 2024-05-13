/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import {
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
	Button,
	Input,
} from '@material-tailwind/react';
import { createTask } from '../services/TasksRequests';
import { getAllUsers } from '../services/UserRequests';

function AddTaskDialog({ open, onClose, onUpdate }) {
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		startDate: '',
		deadline: '',
		status: 'backlog',
		priority: 'low',
		leader: '',
		collaborators: [],
	});

	const [users, setUsers] = useState([]);

	useEffect(() => {
		if (open) {
			getAllUsers()
				.then((data) => {
					setUsers(data);
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
		try {
			const newTask = await createTask(formData);
			if (newTask) {
				onUpdate(newTask);
			}
			onClose();
		} catch (error) {
			console.error('Failed to create task:', error);
		}
	};

	return (
		<Dialog open={open} handler={onClose}>
			<DialogHeader>Add Task</DialogHeader>
			<DialogBody className="flex flex-col gap-5">
				<Input
					type="text"
					name="title"
					value={formData.title}
					onChange={handleChange}
					label="Title"
				/>
				<Input
					type="text"
					name="description"
					value={formData.description}
					onChange={handleChange}
					label="Description"
				/>
				<Input
					type="date"
					name="startDate"
					value={formData.startDate}
					onChange={handleChange}
					label="Start Date"
				/>
				<Input
					type="date"
					name="deadline"
					value={formData.deadline}
					onChange={handleChange}
					label="Deadline"
				/>

				<div>
					<label>Leader:</label>
					{users
						.filter((user) =>
							['Admin', 'Team Leader', 'Product Owner'].includes(user.role.name)
						)
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
								<label htmlFor={user._id}>
									{user.name
										? `${user.name} (${user.role.name})`
										: 'No Name Provided'}
								</label>
							</div>
						))}
				</div>

				<div>
					<label>Collaborators:</label>
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
							<label htmlFor={`collab-${user._id}`}>
								{user.name
									? `${user.name} (${user.role.name})`
									: 'No Name Provided'}
							</label>
						</div>
					))}
				</div>
			</DialogBody>
			<DialogFooter>
				<Button variant="text" color="red" onClick={onClose}>
					Cancel
				</Button>
				<Button variant="gradient" color="green" onClick={handleSave}>
					Save
				</Button>
			</DialogFooter>
		</Dialog>
	);
}

export default AddTaskDialog;
