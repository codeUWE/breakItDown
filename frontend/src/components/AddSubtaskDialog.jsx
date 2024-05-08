import React, { useState, useEffect } from 'react';
import {
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
	Button,
	Input,
	Select,
	Option,
} from '@material-tailwind/react';
import { createSubtask } from '../services/TasksRequests';

function AddSubtaskDialog({ taskId, open, onClose, onUpdate }) {
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		detailedInformation: '',
		deadline: '',
		status: 'backlog',
		priority: 'low',
		task: '',
	});

	useEffect(() => {
		setFormData((prev) => ({ ...prev, task: taskId }));
	}, [taskId]);

	const handleChange = (e) => {
		const name = e.target ? e.target.name : e.name;
		const value = e.target ? e.target.value : e.value;

		console.log(`Updating ${name} to ${value}`);

		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSave = async () => {
		console.log('Saving data:', formData);
		try {
			const newSubtask = await createSubtask(formData);
			if (newSubtask) {
				onUpdate(newSubtask);
			}
			onClose();
		} catch (error) {
			console.error('Failed to create subtask:', error);
		}
	};

	return (
		<Dialog open={open} handler={onClose}>
			<DialogHeader>Add Subtask</DialogHeader>
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
					onChange={(e) =>
						handleChange({ target: { name: 'priority', value: e } })
					}
					label="Priority"
				>
					<Option value="low">Low</Option>
					<Option value="medium">Medium</Option>
					<Option value="high">High</Option>
				</Select>
				<Select
					name="status"
					value={formData.status}
					onChange={(e) =>
						handleChange({ target: { name: 'status', value: e } })
					}
					label="Status"
				>
					<Option value="backlog">To Do</Option>
					<Option value="inProgress">In Progress</Option>
					<Option value="done">Done</Option>
				</Select>
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

export default AddSubtaskDialog;
