/* eslint-disable react/prop-types */
import React from 'react';
import {
	Button,
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
} from '@material-tailwind/react';

function DeleteTaskDialog({ open, onClose, onDelete, task }) {
	return (
		<Dialog open={open} handler={onClose}>
			<DialogHeader>Delete Task &quot;{task?.title}&quot;</DialogHeader>
			<DialogBody>
				Are you sure you want to delete this task? This action cannot be undone.
			</DialogBody>
			<DialogFooter>
				<Button variant="text" color="red" onClick={onClose} className="mr-1">
					<span>Cancel</span>
				</Button>
				<Button variant="gradient" color="green" onClick={onDelete}>
					<span>Confirm</span>
				</Button>
			</DialogFooter>
		</Dialog>
	);
}

export default DeleteTaskDialog;
