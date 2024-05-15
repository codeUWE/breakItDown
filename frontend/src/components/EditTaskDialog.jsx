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
				leader: task.leader || '',
				collaborators: task.collaborators.map((collab) => collab._id) || [], // Stellen Sie sicher, dass hier die IDs extrahiert werden
			});
		}
	}, [task, open]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleLeaderChange = (e) => {
		const leaderId = e.target.value; // Stellen Sie sicher, dass dies die korrekte ID ist
		setFormData((prev) => ({
			...prev,
			leader: leaderId,
		}));
	};

	const handleCollaboratorsChange = (e) => {
		const value = e.target.value;
		const checked = e.target.checked;

		setFormData((prev) => {
			// Filter, um sicherzustellen, dass nur valide IDs im Array sind und keine Objekte
			const cleanedCollaborators = prev.collaborators.filter(
				(collab) => typeof collab === 'string'
			);

			const newCollaborators = checked
				? [...cleanedCollaborators, value] // Hinzufügen der ID
				: cleanedCollaborators.filter((id) => id !== value); // Entfernen der ID

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
				<div>
					<label>Leader:</label>
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

export default EditTaskDialog;
