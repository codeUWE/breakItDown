import { useState, useEffect, useContext, useRef } from 'react';
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
	const [menuIsOpen, setMenuIsOpen] = useState(false);
	const { user } = useContext(AuthContext);
	const selectRef = useRef(null);

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
	}, [user._id]);

	const handleSubmit = (event) => {
		event.preventDefault();
		createRole({
			name: role,
			permissions: selectedPermissions.map((permission) => permission.value),
		}).then((data) => {
			setRoles((prev) => [...prev, data]);
		});

		// Clear the input field after submission
		setRole('');
		setSelectedPermissions([]);
	};

	const handleRoleChange = (event) => {
		setRole(event.target.value);
	};

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

	const handleClickOutside = (event) => {
		if (selectRef.current && !selectRef.current.contains(event.target)) {
			setMenuIsOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<>
			<div className="lg:w-8/12 sm:w-3/4 sm:h-[450px] md:h-[680px] lg:h-[370px] xl:h-[420px] sm:overflow-scroll sm:no-scrollbar mx-auto rounded-3xl bg-[#EFF9FF] shadow-md sm:mt-5 md:mt-10 lg:mt-10 xl:mt-5 lg:p-4 sm:p-6 xl:p-6">
				<div className="sm:flex sm:flex-col sm:items-center sm:justify-center lg:flex lg:flex-row lg:justify-center lg:items-center xl:gap-14 lg:gap-6 lg:px-1">
					<form className="mb-4 lg:w-1/2 lg:h-[330px] xl:h-[370px] sm:w-full bg-[#D4ECFC] lg:p-4 xl:p-4 sm:p-6 rounded-2xl overflow-scroll">
						<label
							htmlFor="role"
							className="font-outfit font-[500] sm:text-[20px] md:text-[24px]"
						>
							Select Permissions:
						</label>
						<br />
						<div ref={selectRef}>
							<Select
								isMulti={true}
								value={selectedPermissions}
								onChange={handlePermissionChange}
								onMenuOpen={() => setMenuIsOpen(true)}
								menuIsOpen={menuIsOpen}
								className="bg-white font-outfit font-[400] text-[20px]  px-4 py-2 rounded-3xl mt-2"
								options={options}
								placeholder="Select permissions..."
							/>
						</div>
						<br />
						<label
							htmlFor="roleInput"
							className="font-outfit font-[500] sm:text-[20px] md:text-[24px]"
						>
							Enter Role:
						</label>
						<div className="flex flex-col gap-2 items-center">
							<input
								type="text"
								id="roleInput"
								value={role}
								onChange={handleRoleChange}
								className="bg-white font-outfit font-[400] text-[20px]  px-4 py-2 rounded-3xl w-full mt-2"
								placeholder="Enter role..."
							/>
							<button
								type="submit"
								onClick={handleSubmit}
								className="w-40 bg-[#080708] text-[#F55D3E] font-outfit font-[600] sm:py-2 md:py-3 md:px-4 rounded-full mt-4 sm:text-[20px] md:text-[20px] "
							>
								Create Role
							</button>
						</div>
					</form>

					<div className="overflow-scroll lg:no-scrollbar sm:w-full sm:h-full lg:w-[45%] sm:self-stretch lg:max-h-[335px] rounded-2xl lg:mb-4 self-start">
						<table className="w-full divide-y divide-gray-200 md:text-[20px]">
							<thead className="bg-gray-50">
								<tr>
									<th className="px-6 py-3 text-left md:text-[20px] font-outfit text-gray-700 uppercase tracking-wider">
										Roles
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200  ">
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
			</div>
		</>
	);
};

export default ManageRoles;
