/* eslint-disable react/prop-types */
import React from 'react';
import {
	Button,
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
} from '@material-tailwind/react';

function DeleteUserDialog({ open, onClose, onDelete, user }) {
	return (
		<Dialog open={open} handler={onClose}>
			<DialogHeader>Delete User &quot;{user?.name}&quot;</DialogHeader>
			<DialogBody>
				Are you sure you want to delete this user? This action cannot be undone.
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

export default DeleteUserDialog;
