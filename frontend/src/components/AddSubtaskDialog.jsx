import React, { useState, useEffect } from 'react';
import {
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
	Button,
	Input,
} from '@material-tailwind/react';
import { createSubtask } from '../services/TasksRequests';
import { getAllUsers } from '../services/UserRequests';

function AddSubtaskDialog({ taskId, open, onClose, onUpdate }) {
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		detailedInformation: '',
		deadline: '',
		status: 'backlog',
		priority: 'low',
		assignee: '',
		task: taskId,
	});

	const [users, setUsers] = useState([]);

	useEffect(() => {
		const fetchUsers = async () => {
			const allUsers = await getAllUsers();
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
		try {
			const newSubtask = await createSubtask({ ...formData, task: taskId });
			if (newSubtask) {
				onUpdate(newSubtask);
			}
			onClose();
		} catch (error) {
			console.error('Failed to create subtask:', error);
		}
	};

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogHeader>Add Subtask</DialogHeader>
			<DialogBody className="flex flex-col gap-3">
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
					type="text"
					name="detailedInformation"
					value={formData.detailedInformation}
					onChange={handleChange}
					label="Detailed Information"
				/>
				<Input
					type="date"
					name="deadline"
					value={formData.deadline}
					onChange={handleChange}
					label="Deadline"
				/>
				<div className="flex flex-col justify-start gap-2">
					<label>
						<input
							type="radio"
							name="assignee"
							value="none"
							checked={formData.assignee === 'none'}
							onChange={handleChange}
						/>
						<span className="ms-3">No Assignee</span>
					</label>
					{users.map((user) => (
						<label key={user._id}>
							<input
								type="radio"
								name="assignee"
								value={user._id}
								checked={formData.assignee === user._id}
								onChange={handleChange}
							/>
							<span className="ms-3">{user.name}</span>
						</label>
					))}
				</div>
			</DialogBody>
			<DialogFooter>
				<Button onClick={onClose} color="red" className="mr-1">
					Cancel
				</Button>
				<Button onClick={handleSave} color="green">
					Save
				</Button>
			</DialogFooter>
		</Dialog>
	);
}

export default AddSubtaskDialog;
