import { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import {
	createRole,
	getPermissions,
	getProjectByOwner,
	deleteRole,
} from '../services/UserRequests';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

//assets
import deleteIcon from '../assets/deleteIcon.png';

const ManageRoles = () => {
	const navigate = useNavigate();
	const [roles, setRoles] = useState([]);
	const [role, setRole] = useState('');
	const [selectedPermissions, setSelectedPermissions] = useState([]);
	const [permissions, setPermissions] = useState([]);
	const { user } = useContext(AuthContext);

	useEffect(() => {
		getPermissions().then((data) => {
			setPermissions(data);
		});
		getProjectByOwner(user._id)
			.then((data) => {
				setRoles(data.roles);
			})
			.catch((error) => {
				console.log('Error fetching roles:', error);
			});
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();
		// Add role/ send to backend?

		createRole({
			name: role,
			permissions: selectedPermissions.map((permission) => {
				return permission.value;
			}),
		}).then((data) => {
			setRoles((prev) => {
				return [...prev, data];
			});
		});

		// Clear the input field after submission
		setRole('');
	};

	const handleRoleChange = (event) => {
		setRole(event.target.value);
	};

	// Function to handle option selection
	const handlePermissionChange = (selectedOption) => {
		setSelectedPermissions(selectedOption);
	};

	const handleDeleteRole = async (id) => {
		try {
			await deleteRole(id);
			// Remove the role from the state
			setRoles(roles.filter((role) => role._id !== id));
		} catch (error) {
			console.log('Error deleting role:', error);
		}
	};

	// Map permissions data to format accepted by react-select
	const options = permissions.map((permission) => ({
		value: permission._id,
		label: permission.name,
	}));

	return (
		<>
			<div className="flex flex-col items-center w-[500px] h-[670px] mx-auto rounded-[30px] justify-center bg-[#EFF9FF] shadow-md mt-10">
				<h1 className="font-outfit font-[600] text-[45px] mb-2">
					Manage Roles
				</h1>
				<form className="mb-4 w-full max-w-md bg-[#D4ECFC] px-8 py-10 rounded-2xl">
					<label
						htmlFor="role"
						className="font-outfit font-[500] text-[20px] my-2"
					>
						Select Permissions:
					</label>
					<br />
					<Select
						isMulti={true}
						value={selectedPermissions}
						onChange={handlePermissionChange}
						className="bg-white font-outfit font-[400] text-[20px]  px-4 py-2 rounded-3xl w-96"
						options={options}
						placeholder="Select permissions..."
					/>
					<label
						htmlFor="roleInput"
						className="font-outfit font-[500] text-[20px] my-2"
					>
						Enter Role:
					</label>
					<div className="flex flex-col gap-2 items-center">
						<input
							type="text"
							id="roleInput"
							value={role}
							onChange={handleRoleChange}
							className="bg-white font-outfit font-[400] text-[20px]  px-4 py-2 rounded-3xl w-96"
							placeholder="Enter role..."
						/>
						<button
							type="submit"
							onClick={handleSubmit}
							className="w-40 bg-[#080708] text-[#F55D3E] font-outfit font-[600] py-2 rounded-full mt-2 text-[20px] "
						>
							Create Role
						</button>
					</div>
				</form>

				<div className="overflow-x-auto w-full max-w-md rounded-2xl">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Role
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{roles.map((item) => (
								<tr key={item._id}>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="flex justify-between items-center">
											{item.name}{' '}
											<button onClick={() => handleDeleteRole(item._id)}>
												<img src={deleteIcon} alt="delete icon" width={30} />
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
};

export default ManageRoles;
