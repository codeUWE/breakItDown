import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { Dialog, Button, Input } from '@material-tailwind/react';
import { updateUsersById } from '../services/UserRequests';

function EditProfileDialog({ isOpen, onClose }) {
	const { user, setUser } = useContext(AuthContext);
	const [profilePicture, setProfilePicture] = useState(null);
	const [formData, setFormData] = useState({
		name: user.name,
		email: user.email,
		profilePicture: user.profilePicture,
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleInputChange = (e) => {
		if (e.target.name === 'profilePicture') {
			setProfilePicture(e.target.files[0]);
		}
	};

	const handleSaveChanges = async () => {
		const updatedData = new FormData();
		updatedData.append('name', formData.name);
		updatedData.append('email', formData.email);
		if (profilePicture) {
			updatedData.append('profilePicture', profilePicture);
		}

		try {
			const updatedUser = await updateUsersById(user._id, updatedData);
			setUser(updatedUser);
			onClose();
		} catch (error) {
			console.error('Error updating user profile:', error);
		}
	};

	return (
		<Dialog size="sm" open={isOpen} handler={onClose}>
			<Dialog.Header>Edit Profile</Dialog.Header>
			<Dialog.Body className={`flex flex-col gap-4`}>
				<Input
					type="text"
					name="name"
					label="Name"
					value={formData.name}
					onChange={handleChange}
				/>
				<Input
					type="email"
					name="email"
					label="Email"
					value={formData.email}
					onChange={handleChange}
				/>
				<input type="file" onChange={handleInputChange} name="profilePicture" />
			</Dialog.Body>
			<Dialog.Footer>
				<Button
					color="green"
					onClick={handleSaveChanges}
					className="me-4"
					ripple="light"
				>
					Save Changes
				</Button>
				<Button color="red" onClick={onClose} ripple="dark">
					Cancel
				</Button>
			</Dialog.Footer>
		</Dialog>
	);
}

export default EditProfileDialog;
