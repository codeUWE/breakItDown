import React, { useState } from 'react';
import {
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
	Button,
} from '@material-tailwind/react';

function DeleteSubtaskDialog({ open, onClose, onDelete, subtask }) {
	return (
		<Dialog open={open} handler={onClose}>
			<DialogHeader>Delete Subtask "{subtask?.title}"</DialogHeader>
			<DialogBody>
				Are you sure you want to delete this subtask? This action cannot be
				undone.
			</DialogBody>
			<DialogFooter>
				<Button variant="text" color="red" onClick={onClose} className="mr-1">
					<span>Cancel</span>
				</Button>
				<Button
					variant="gradient"
					color="green"
					onClick={() => onDelete(subtask._id)}
				>
					<span>Confirm</span>
				</Button>
			</DialogFooter>
		</Dialog>
	);
}

export default DeleteSubtaskDialog;
