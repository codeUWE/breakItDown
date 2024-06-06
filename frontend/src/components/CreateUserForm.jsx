import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getProjectByOwner } from '../services/UserRequests';
import axiosClient from '../axiosClient';
import { AuthContext } from '../context/AuthProvider';

const CreateUserForm = ({ setUsers }) => {
	const [project, setProject] = useState('');
	const [role, setRole] = useState('');
	const [roles, setRoles] = useState([]);
	const navigate = useNavigate();
	const { user } = useContext(AuthContext);

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		data = { ...data, role, project: project._id };
		console.log(data);
		axiosClient
			.post('/api/users', data)
			.then((response) => {
				setUsers((prev) => {
					return [...prev, response.data];
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		getProjectByOwner(user._id)
			.then((data) => {
				console.log(data);
				setRoles(data.roles);
				setProject(data);
			})
			.catch((error) => console.log(error));
	}, [user._id]);

	return (
		<div className="flex justify-center items-center gap-3 p-5 lg:p-0">
			<div className="bg-[#EFF9FF] rounded-3xl lg:p-6 sm:p-1 w-full max-w-lg mx-auto">
				<div className="text-[32px] text-[#F55D3E] font-outfit font-[500] mb-4">
					Create User
				</div>
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
					<input
						type="text"
						placeholder="User Name"
						{...register('name', { required: 'Name is required' })}
						className="text-[18px] font-outfit font-[500] text-black bg-white  rounded-2xl px-3 py-2"
					/>
					{errors.name && <span>{errors.name.message}</span>}
					<input
						type="text"
						placeholder="name@mail.com"
						{...register('email', { required: 'Email is required' })}
						className="text-[18px] font-outfit font-[500] text-black bg-white  rounded-2xl px-3 py-2"
					/>
					{errors.email && <span>{errors.email.message}</span>}
					<input
						type="password"
						placeholder="********"
						{...register('password', {
							required: 'Password is required',
							minLength: {
								value: 8,
								message: 'Must be at least 8 Characters!',
							},
						})}
						className="text-[18px] font-outfit font-[500] text-black bg-white  rounded-2xl px-3 py-2"
					/>
					{errors.password && <span>{errors.password.message}</span>}
					<select
						{...register('role')}
						onChange={(e) => setRole(e.target.value)}
						className="text-[18px] font-outfit font-[500] text-black bg-white  rounded-2xl px-3 py-2"
					>
						<option value="">Select Role</option>
						{roles?.map((option) => (
							<option
								key={option._id}
								value={option._id}
								className="font-outfit"
							>
								{option.name}
							</option>
						))}
					</select>
					<input
						type="submit"
						value="Create User"
						className="w-40 bg-[#080708] text-[#F55D3E] font-outfit font-[600] py-2 rounded-full mt-2 text-[20px] mx-auto"
					/>
				</form>
			</div>
		</div>
	);
};

export default CreateUserForm;
