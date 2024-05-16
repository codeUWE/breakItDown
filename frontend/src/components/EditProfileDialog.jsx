import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';
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

	if (!isOpen) {
		return null;
	}

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
			<div className="bg-[#D4ECFC] rounded-3xl p-6 w-full max-w-md mx-auto">
				<div className="font-outfit text-[32px] font-[500] text-[#F55D3E] mb-4">
					Edit Profile
				</div>
				<div className="flex flex-col gap-4 bg-[#EFF9FF] p-4 py-6 rounded-2xl">
					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
						className="text-[18px] font-outfit font-[500] text-black bg-transparent border border-black rounded-2xl px-3 py-2"
						placeholder="Name"
					/>
					<input
						type="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						className="text-[18px] font-outfit font-[500] text-black bg-transparent border border-black rounded-2xl px-3 py-2"
						placeholder="Email"
					/>
					<input
						type="file"
						onChange={handleInputChange}
						name="profilePicture"
						className="text-[18px] font-outfit font-[500] text-black bg-transparent border border-black rounded-2xl px-3 py-2"
					/>
				</div>
				<div className="flex justify-end gap-4 mt-4">
					<button
						onClick={onClose}
						className="py-1 w-20 text-white rounded-2xl flex justify-center items-center mt-4 bg-[#FE4A49] font-outfit font-[500]"
					>
						Cancel
					</button>
					<button
						onClick={handleSaveChanges}
						className="me-4 py-1 w-32 text-white rounded-2xl flex justify-center items-center mt-4 bg-[#08A045] font-outfit font-[500]"
					>
						Save Changes
					</button>
				</div>
			</div>
		</div>
	);
}

export default EditProfileDialog;
