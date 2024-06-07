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
			<div className="w-[97%] h-full sm:mt-5 md:mt-10 xl:mt-10 mx-auto bg-[#D4ECFC] rounded-[30px] p-4 shadow-md sm:w-11/12 sm:h-[450px] md:h-[680px] lg:h-[450px] xl:h-[500px]  sm:overflow-auto sm:no-scrollbar">
				<div className="lg:w-full lg:h-full lg:flex lg:flex-row lg:justify-center lg:items-start md:gap-4 sm:w-full sm:flex-col sm:justify-center sm:items-center ">
					{/* CreateUserForm */}
					<div className="lg:w-[30%] h-full rounded-[20px] bg-[#EFF9FF] overflow-hidden sm:w-full xl:pt-10">
						<CreateUserForm setUsers={setUsers} />
					</div>
					{/* Team Table */}
					<div className="lg:w-[70%] lg:self-stretch lg:no-scrollbar rounded-[20px] bg-[#EFF9FF] overflow-auto sm:w-full md:mt-4 lg:mt-0">
						<table className="min-w-full bg-white rounded-[20px]">
							<thead>
								<tr>
									<th
										className="font-outfit font-[700] text-[28px] text-start py-4 px-4 border-b border-gray-400 cursor-pointer sm:text-[24px] sm:py-2"
										onClick={() => handleSort('name')}
									>
										Name {getSortIndicator('name')}
									</th>
									<th
										className="font-outfit font-[700] text-[28px] text-start py-4 px-4 border-b border-gray-400 cursor-pointer sm:text-[24px] sm:py-2"
										onClick={() => handleSort('email')}
									>
										Email {getSortIndicator('email')}
									</th>
									<th
										className="font-outfit font-[700] text-[28px] text-start py-4 px-4 border-b border-gray-400 cursor-pointer sm:text-[24px] sm:py-2"
										onClick={() => handleSort('role.name')}
									>
										Role {getSortIndicator('role.name')}
									</th>
									<th className="font-outfit font-[700] text-[28px] text-center pe-2 py-4  border-b border-gray-400 sm:text-[24px] sm:py-2 xl:text-left">
										Action
									</th>
								</tr>
							</thead>
							<tbody className="font-outfit font-[500] lg:text-[16px] sm:text-[14px] ">
								{users.map((user) => (
									<tr key={user._id} className="align-middle">
										<td className="py-2 px-4 border-b border-gray-200  ">
											{editingUserId === user._id ? (
												<input
													type="text"
													name="name"
													value={editUserData.name}
													onChange={handleEditChange}
													className=" p-2 sm:w-32 xl:w-48  border border-gray-300 rounded-lg sm:text-[11px] lg:text-[14px]"
												/>
											) : (
												<>
													<Avatar
														src={
															user.profilePicture ||
															'https://cdn-icons-png.flaticon.com/512/149/149071.png'
														}
														alt="avatar"
														className="lg:w-[40px] lg:h-[40px] sm:w-[24px] sm:h-[24px] me-2"
													/>
													{user.name}
												</>
											)}
										</td>
										<td className="py-2 px-4 border-b border-gray-200 ">
											{editingUserId === user._id ? (
												<input
													type="email"
													name="email"
													value={editUserData.email}
													onChange={handleEditChange}
													className="p-2 sm:-32 border border-gray-300 rounded-md sm:text-[11px] lg:text-[14px]"
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
													className=" border border-gray-300 rounded-md sm:w-32 xl:w-48 sm:text-[11px] lg:text-[14px]"
												/>
											) : (
												user.role?.name
											)}
										</td>
										<td className="py-2 px-2 border-b border-gray-200">
											{editingUserId === user._id ? (
												<div className="flex gap-2">
													<button
														onClick={handleUpdateUser}
														className=" items-center sm:w-6 sm:h-6 rounded-full border border-transparent text-sm font-medium shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
													></button>
													<button
														onClick={() => setEditingUserId(null)}
														className="items-center sm:w-6 sm:h-6 rounded-full border border-transparent text-sm font-medium shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
													></button>
												</div>
											) : (
												<div className="flex justify-start items-center gap-3">
													<button onClick={() => handleEditUser(user)}>
														<img
															src={edit}
															alt="edit"
															className="lg:w-[27px] lg:h-[27px] sm:w-[20px] sm:h-[20px]"
														/>
													</button>
													<button onClick={() => setDeleteUserId(user._id)}>
														<img
															src={deleteIcon}
															alt="delete"
															className="lg:w-[27px] lg:h-[27px] sm:w-[20px] sm:h-[20px]"
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
