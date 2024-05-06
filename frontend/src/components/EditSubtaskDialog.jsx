import React, { useState } from 'react';
import {
	Button,
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
	Select,
	Option,
	Input,
} from '@material-tailwind/react';
import { updateSubtask } from '../services/TasksRequests';

export default function EditSubtaskDialog({
	subtask,
	open,
	onClose,
	onUpdate,
}) {
	const {
		_id,
		title,
		description,
		status,
		priority,
		detailedInformation,
		deadline,
	} = subtask;

	const [formData, setFormData] = useState({
		title,
		description,
		detailedInformation,
		deadline: deadline ? deadline.substring(0, 10) : '',
		status,
		priority,
	});

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
		const updatedData = await updateSubtask(_id, formData);
		if (updatedData) {
			onUpdate(updatedData);
		}
		onClose();
	};

	return (
		<Dialog open={open} handler={onClose}>
			<DialogHeader>Edit Subtask</DialogHeader>
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
			</DialogBody>
			<DialogFooter>
				<Button variant="text" color="red" onClick={onClose} className="mr-1">
					Cancel
				</Button>
				<Button variant="gradient" color="green" onClick={handleSave}>
					Save
				</Button>
			</DialogFooter>
		</Dialog>
	);
}
