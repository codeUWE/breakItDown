import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import {
	getProjectByOwner,
	deleteUser,
	updateUser,
} from '../services/UserRequests';
import CreateUserForm from './CreateUserForm';
import DeleteUserDialog from './DeleteUserDialog';
import { Avatar } from '@material-tailwind/react';
import Select from 'react-select';
import edit from '../assets/edit.png';
import deleteIcon from '../assets/deleteIcon.png';

const ManageUsers = () => {
	const { user } = useContext(AuthContext);

	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [editingUserId, setEditingUserId] = useState(null);
	const [editUserData, setEditUserData] = useState({
		name: '',
		email: '',
		role: '',
	});
	const [deleteUserId, setDeleteUserId] = useState(null);
	const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

	useEffect(() => {
		getProjectByOwner(user._id).then((data) => {
			setUsers(data.users);
			setRoles(data.roles);
		});
	}, [user._id]);

	const handleEditUser = (user) => {
		setEditingUserId(user._id);
		setEditUserData({
			name: user.name,
			email: user.email,
			role: user.role._id,
		});
	};

	const handleEditChange = (e) => {
		const { name, value } = e.target;
		setEditUserData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleRoleChange = (selectedOption) => {
		setEditUserData((prevData) => ({
			...prevData,
			role: selectedOption.value,
		}));
	};

	const handleUpdateUser = async () => {
		try {
			await updateUser(editingUserId, editUserData);
			const updatedUsers = users.map((user) =>
				user._id === editingUserId
					? {
							...user,
							...editUserData,
							role: roles.find((role) => role._id === editUserData.role),
					  }
					: user
			);
			setUsers(updatedUsers);
			setEditingUserId(null);
		} catch (error) {
			console.log('Error updating user:', error);
		}
	};

	const handleDeleteUser = async () => {
		try {
			await deleteUser(deleteUserId);
			setUsers((prev) => prev.filter((user) => user._id !== deleteUserId));
			setDeleteUserId(null);
		} catch (error) {
			console.log('Error deleting user:', error);
		}
	};

	const handleSort = (key) => {
		let direction = 'asc';
		if (sortConfig.key === key && sortConfig.direction === 'asc') {
			direction = 'desc';
		}
		setSortConfig({ key, direction });

		const sortedUsers = [...users].sort((a, b) => {
			const aValue = key === 'role.name' ? a.role.name : a[key];
			const bValue = key === 'role.name' ? b.role.name : b[key];

			if (aValue < bValue) {
				return direction === 'asc' ? -1 : 1;
			}
			if (aValue > bValue) {
				return direction === 'asc' ? 1 : -1;
			}
			return 0;
		});
		setUsers(sortedUsers);
	};

	const getSortIndicator = (key) => {
		if (sortConfig.key === key) {
			return sortConfig.direction === 'asc' ? '↑' : '↓';
		}
		return '';
	};

	const roleOptions = roles.map((role) => ({
		value: role._id,
		label: role.name,
	}));

	return (
		<>
			<div className="w-[1400px] h-[670px] mt-10 mx-auto bg-[#D4ECFC] rounded-[30px] p-4">
				<div className="w-full h-full flex justify-center items-center gap-4 overflow-hidden">
					{/* CreateUserForm */}
					<div className="w-[30%] h-full rounded-[20px] bg-[#EFF9FF] p-4 overflow-auto">
						<CreateUserForm setUsers={setUsers} />
					</div>
					{/* Team Table */}
					<div className="w-[70%] h-full rounded-[20px] bg-[#EFF9FF] overflow-auto">
						<table className="min-w-full bg-white rounded-[20px]">
							<thead>
								<tr>
									<th
										className="font-outfit font-[700] text-[28px] text-start py-4 px-4 border-b border-gray-400 cursor-pointer"
										onClick={() => handleSort('name')}
									>
										Name {getSortIndicator('name')}
									</th>
									<th
										className="font-outfit font-[700] text-[28px] text-start py-4 px-4 border-b border-gray-400 cursor-pointer"
										onClick={() => handleSort('email')}
									>
										Email {getSortIndicator('email')}
									</th>
									<th
										className="font-outfit font-[700] text-[28px] text-start py-4 px-4 border-b border-gray-400 cursor-pointer"
										onClick={() => handleSort('role.name')}
									>
										Role {getSortIndicator('role.name')}
									</th>
									<th className="font-outfit font-[700] text-[28px] text-start py-4 px-4 border-b border-gray-400">
										Action
									</th>
								</tr>
							</thead>
							<tbody className="font-outfit font-[500] text-[16px] ">
								{users.map((user) => (
									<tr key={user._id} className="align-middle">
										<td className="py-2 px-4 border-b border-gray-200 ">
											<Avatar
												src={
													user.profilePicture ||
													'https://cdn-icons-png.flaticon.com/512/149/149071.png'
												}
												alt="avatar"
												className="w-[40px] h-[40px] me-2"
											/>
											{editingUserId === user._id ? (
												<input
													type="text"
													name="name"
													value={editUserData.name}
													onChange={handleEditChange}
													className="p-2 w-40 border border-gray-300 rounded-lg"
												/>
											) : (
												user.name
											)}
										</td>
										<td className="py-2 px-4 border-b border-gray-200 ">
											{editingUserId === user._id ? (
												<input
													type="email"
													name="email"
													value={editUserData.email}
													onChange={handleEditChange}
													className="p-1 w-60 border border-gray-300 rounded-md"
												/>
											) : (
												user.email
											)}
										</td>
										<td className="py-2 px-4 border-b border-gray-200">
											{editingUserId === user._id ? (
												<Select
													value={roleOptions.find(
														(option) => option.value === editUserData.role
													)}
													onChange={handleRoleChange}
													options={roleOptions}
													className=" border border-gray-300 rounded-md"
												/>
											) : (
												user.role?.name
											)}
										</td>
										<td className="py-2 px-4 border-b border-gray-200">
											{editingUserId === user._id ? (
												<div className="flex">
													<button
														onClick={handleUpdateUser}
														className="m-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
													>
														Update
													</button>
													<button
														onClick={() => setEditingUserId(null)}
														className="m-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
													>
														Cancel
													</button>
												</div>
											) : (
												<div className="flex justify-center">
													<button
														className="m-3"
														onClick={() => handleEditUser(user)}
													>
														<img src={edit} alt="edit" width={27} height={27} />
													</button>
													<button
														className="m-3"
														onClick={() => setDeleteUserId(user._id)}
													>
														<img
															src={deleteIcon}
															alt="delete"
															width={27}
															height={27}
														/>
													</button>
												</div>
											)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
			{/* Delete User Dialog */}
			<DeleteUserDialog
				open={Boolean(deleteUserId)}
				onClose={() => setDeleteUserId(null)}
				onDelete={handleDeleteUser}
				user={users.find((user) => user._id === deleteUserId)}
			/>
		</>
	);
};

export default ManageUsers;
