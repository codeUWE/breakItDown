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
			<div className="w-full flex justify-center items-start xl:gap-10 md:gap-8 md:mt-20 lg:mt-10 xl:mt-10">
				<div className="lg:w-8/12 md:max-h-[680px] md:w-1/2 lg:h-[460px] xl:h-[500px] md:overflow-scroll md:no-scrollbar xl:overflow-hidden rounded-3xl bg-[#EFF9FF] shadow-md md:p-4 xl:p-6">
					<h1 className="font-outfit font-[600]  xl:text-[50px] md:text-[40px] lg:text-[45px] text-center mb-2 ">
						Manage Roles
					</h1>
					<div className="md:flex md:flex-col md:items-center md:justify-center lg:flex lg:flex-row lg:justify-center lg:items-center xl:gap-6 md:gap-4">
						<form className=" lg:w-1/2 md:w-full bg-[#D4ECFC]  xl:p-12 md:p-4 rounded-2xl overflow-scroll md:h-[350px] xl:h-full">
							<label
								htmlFor="role"
								className="font-outfit font-[500] md:text-[20px]"
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
									className="bg-white font-outfit font-[400] text-[16px]  px-4 py-2 rounded-3xl mt-2"
									options={options}
									placeholder="Select permissions..."
								/>
							</div>
							<br />
							<label
								htmlFor="roleInput"
								className="font-outfit font-[500] md:text-[20px]"
							>
								Enter Role Name:
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
									className="w-40 bg-[#080708] text-[#F55D3E] font-outfit font-[600]  md:py-2 md:px-4 rounded-full mt-4 md:text-[20px] "
								>
									Create Role
								</button>
							</div>
						</form>

						<div className="overflow-scroll lg:no-scrollbar md:w-full md:h-full lg:w-[50%] lg:max-h-[350px] xl:max-h-[376px] self-start rounded-2xl">
							<table className="w-full divide-y divide-gray-200 md:text-[16px]">
								<thead className="bg-gray-50">
									<tr>
										<th className="px-6 py-3 text-left md:text-[18px] font-outfit text-gray-700 uppercase tracking-wider">
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
														<img
															src={deleteIcon}
															alt="delete icon"
															width={30}
														/>
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
				<div className="w-1/4 bg-[#e5d848] shadow-md rounded-3xl p-4 md:w-[250px] md:h-[460px] xl:w-[200px] xl:h-[500px] overflow-scroll text-[#5a551d] font-inter text-[14px] no-scrollbar">
					<p className="mb-4 text-red-800 font-[700]">
						On this page, you can create custom roles by selecting one or more
						permissions and entering a name for the role. To add users in the
						next step, at least one role must be created.
					</p>
					<p className="font-[700]">Permissions explained:</p>
					<br />
					<ul>
						<li>
							<strong>closeTicket:</strong> Users with this permission can close
							a task and set its status to Done. They have access to any task
							regardless of whether they are the leader.
						</li>
						<br />
						<li>
							<strong>editTicket:</strong> Users can edit the information (Start
							Time, Deadline, Title, Description, Leader, and Collaborators) of
							any task regardless of whether they are the leader.
						</li>
						<br />
						<li>
							<strong>deleteTicket:</strong> Allows a user to delete a task
							permanently. Access to any task regardless of whether they are the
							leader.
						</li>
						<br />
						<li>
							<strong>editSubtask:</strong> Users can edit the information of
							any subtask regardless of whether they are the leader.
						</li>
						<br />
						<li>
							<strong>deleteSubtask:</strong> Users can delete any subtask
							regardless of whether they are the leader.
						</li>
						<br />
						<li>
							<strong>addTicket:</strong> Users can create a task.
						</li>
						<br />
						<li>
							<strong>addSubtask:</strong> Users can create a subtask. Access to
							any subtask regardless of whether they are the leader.
						</li>
						<br />
						<li>
							<strong>leaderEditTicket:</strong> Only as a leader in the task
							can the user edit the task.
						</li>
						<br />
						<li>
							<strong>leaderEditSubtask:</strong> Only as a leader in the task
							can the user edit a subtask.
						</li>
						<br />
						<li>
							<strong>leaderDeleteSubtask:</strong> Only as a leader in the task
							can the user delete a subtask.
						</li>
						<br />
						<li>
							<strong>leaderAddSubtask:</strong> Only as a leader in the task
							can the user add a subtask.
						</li>
						<br />
						<li>
							<strong>leaderCloseTicket:</strong> Only as a leader in the task
							can the user close the task and change its status to Done.
						</li>
						<br />
						<li>
							<strong>leaderDeleteTicket:</strong> Only as a leader in the task
							can the user permanently delete the task.
						</li>
					</ul>
				</div>
			</div>
		</>
	);
};

export default ManageRoles;
