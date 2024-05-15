import React, { useState, useEffect } from 'react';
import {
	Input,
	Button,
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
	Select,
	Option,
} from '@material-tailwind/react';
import { updateSubtask } from '../services/TasksRequests';
import { getAllUsers } from '../services/UserRequests';

export default function EditSubtaskDialog({
	subtask,
	open,
	onClose,
	onUpdate,
}) {
	const [formData, setFormData] = useState({
		title: subtask.title,
		description: subtask.description,
		detailedInformation: subtask.detailedInformation,
		deadline: subtask.deadline ? subtask.deadline.substring(0, 10) : '',
		status: subtask.status,
		priority: subtask.priority,
		assignee: subtask.assignee ? subtask.assignee._id : '',
	});

	const [users, setUsers] = useState([]);

	useEffect(() => {
		const fetchUsers = async () => {
			const allUsers = await getAllUsers('project=true');
			setUsers(allUsers);
		};
		fetchUsers();
	}, []);

	const handleChange = (eventOrValue) => {
		let name, value;

		// Überprüfen, ob das Argument ein Ereignisobjekt oder direkt ein Wert ist
		if (eventOrValue.target) {
			// Standard-HTML-Element (z.B. Input)
			name = eventOrValue.target.name;
			value = eventOrValue.target.value;
		} else {
			// Direkt übergebener Wert von der Select-Komponente
			name = eventOrValue.name;
			value = eventOrValue.value;
		}

		// Besondere Behandlung für 'assignee', wenn 'none' ausgewählt wird
		if (name === 'assignee' && value === 'none') {
			value = null; // Setze null, wenn keine Zuweisung gewünscht ist
		}

		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSave = async () => {
		const updatedData = await updateSubtask(subtask._id, formData);
		if (updatedData) {
			onUpdate(updatedData);
		}
		onClose();
	};

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogHeader>Edit Subtask</DialogHeader>
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
				<Select
					name="priority"
					value={formData.priority}
					onChange={(value) => handleChange({ name: 'priority', value })}
					label="Priority"
				>
					<Option value="low">Low</Option>
					<Option value="medium">Medium</Option>
					<Option value="high">High</Option>
				</Select>
				<Select
					name="status"
					value={formData.status}
					onChange={(value) => handleChange({ name: 'status', value })}
					label="Status"
				>
					<Option value="backlog">To Do</Option>
					<Option value="inProgress">In Progress</Option>
					<Option value="done">Done</Option>
				</Select>
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
