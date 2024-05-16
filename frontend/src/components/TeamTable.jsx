import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { getAllUsers } from '../services/UserRequests';

import EditProfileDialog from './EditProfileDialog';

//assets
import { Avatar } from '@material-tailwind/react';
import edit from '../assets/edit.png';
import mail from '../assets/mail.png';
import userIcon from '../assets/user.png';

function TeamTable() {
	const { user } = useContext(AuthContext);

	//profile Dialog setters
	const [isEditOpen, setIsEditOpen] = useState(false); // State für die Öffnung des Dialogs
	const handleEditOpen = () => {
		setIsEditOpen(true);
	};
	const handleEditClose = () => {
		setIsEditOpen(false);
	};

	//table setters
	const [users, setUsers] = useState([]);
	const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

	useEffect(() => {
		getAllUsers('project=true')
			.then((data) => {
				setUsers(data);
			})
			.catch((error) => {
				console.error('Error fetching users:', error);
			});
	}, []);

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

	return (
		<>
			<div className="w-[1400px] h-[670px] mt-10 mx-auto bg-[#D4ECFC] rounded-[30px] p-4">
				<div className="w-full h-full flex justify-center items-center gap-4">
					{/* User Profile */}
					<div className="w-[30%] h-full rounded-[20px] bg-[#EFF9FF] relative">
						{/* Logo Stripes */}
						<div className="absolute right-[150px] h-40 flex ">
							<div className="border-[8px] border-[#FE4A49] h-full "></div>
							<div className="border-[8px] border-[#FED766] h-full "></div>
							<div className="border-[8px] border-[#08A045] h-full "></div>
							<div className="border-[8px] border-[#FFD5FF] h-full "></div>
							<div className="border-[8px] border-[#438CDB] h-full "></div>
						</div>
						{/* profile Avatar */}
						<Avatar
							src={
								user.profilePicture ||
								'https://cdn-icons-png.flaticon.com/512/149/149071.png'
							}
							alt="avatar"
							className="w-[120px] h-[120px] absolute right-[130px] top-[130px] "
						/>
						{/* edit Icon */}
						<img
							src={edit}
							alt="edit icon"
							width={35}
							className="absolute right-3 top-2 cursor-pointer"
							onClick={handleEditOpen}
						/>

						{/* User Information */}
						<div className="mt-72 w-full flex justify-center">
							<div className="font-outfit font-[700] text-[28px] text-[#681FDE] ">
								<div className="flex items-center gap-5">
									<img src={userIcon} alt="user icon" width={25} />
									<h2>{user.name}</h2>
								</div>
								<div className="flex items-center gap-5">
									<img src={mail} alt="mail icon" width={25} />
									<h2>{user.email}</h2>
								</div>

								<h2 className="bg-[#201E50] text-center mt-6 px-4 py-1 rounded-full text-[#F0C808] text-[32px] ">
									{user.role.name}
								</h2>
							</div>
						</div>
					</div>
					{/* Team Table */}
					<div className="w-[70%] h-full rounded-[20px] bg-[#EFF9FF] overflow-scroll no-scrollbar ">
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
								</tr>
							</thead>
							<tbody className="font-outfit font-[500] text-[20px] ">
								{users.map((userTable) => (
									<tr key={userTable._id}>
										<td className="py-2 px-4 border-b border-gray-200 flex items-center gap-3">
											<Avatar
												src={
													userTable.profilePicture ||
													'https://cdn-icons-png.flaticon.com/512/149/149071.png'
												}
												alt="avatar"
												className="w-[50px] h-[50px]"
											/>
											{userTable.name}
										</td>
										<td className="py-2 px-4 border-b border-gray-200">
											<a
												href={`mailto:${userTable.email}`}
												className="text-blue-600 hover:underline"
											>
												{userTable.email}
											</a>
										</td>
										<td className="py-2 px-4 border-b border-gray-200">
											{userTable.role.name}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
			{/* Edit Profile Dialog */}
			{isEditOpen && (
				<EditProfileDialog isOpen={isEditOpen} onClose={handleEditClose} />
			)}
		</>
	);
}

export default TeamTable;
