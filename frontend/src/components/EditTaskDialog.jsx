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
import { updateTask } from '../services/TasksRequests';

function EditTaskDialog({ task, open, onClose, onUpdate }) {
	const [formData, setFormData] = useState({
		title: task?.title,
		description: task?.description,
		startDate: task?.startDate ? task?.startDate.substring(0, 10) : '',
		deadline: task?.deadline ? task?.deadline.substring(0, 10) : '',
	});

	useEffect(() => {
		if (task && open) {
			setFormData({
				title: task.title,
				description: task.description,
				startDate: task.startDate ? task.startDate.substring(0, 10) : '',
				deadline: task.deadline ? task.deadline.substring(0, 10) : '',
			});
		}
	}, [task, open]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSave = async () => {
		try {
			const updatedTask = await updateTask(task._id, formData);
			onUpdate(updatedTask);
		} catch (error) {
			console.error('Failed to update task:', error);
		}
		onClose();
	};

	return (
		<Dialog open={open} handler={onClose}>
			<DialogHeader>Edit Task</DialogHeader>
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

export default EditTaskDialog;
