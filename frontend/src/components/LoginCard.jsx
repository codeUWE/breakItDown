import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import google48 from '../assets/google48.png';
import github48 from '../assets/github48.png';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../context/AuthProvider';
import axiosClient from '../axiosClient';

export default function LoginCard() {
	const navigate = useNavigate();
	const { user, isLoading, login } = useContext(AuthContext);
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();
	const onSubmit = (data) => {
		login(data);
	};

	return (
		<div className="h-screen w-full flex justify-center items-center relative bg-[#6A66A3]">
			<div className="h-full flex absolute right-16">
				<div className="xl:border-[10px] lg:border-[8px] sm:border-[5px] md:border-[6px] border-[#FE4A49] h-full z-10 "></div>
				<div className="xl:border-[10px] lg:border-[8px] sm:border-[5px] md:border-[6px] border-[#FED766] h-full z-10"></div>
				<div className="xl:border-[10px] lg:border-[8px] sm:border-[5px] md:border-[6px] border-[#08A045] h-full z-10"></div>
				<div className="xl:border-[10px] lg:border-[8px] sm:border-[5px] md:border-[6px] border-[#FFD5FF] h-full z-10"></div>
				<div className="xl:border-[10px] lg:border-[8px] sm:border-[5px] md:border-[6px] border-[#438CDB] h-full z-10"></div>
			</div>
			<div className="lg:w-[120px] lg:h-[120px] md:w-[90px] md:h-[90px]   bg-[#ffffff] rounded-full absolute md:right-[50px] lg:right-[45px] xl:right-[55px] md:top-8 z-20 shadow-lg"></div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex items-center justify-center"
			>
				<div className="w-96 p-4 bg-white shadow-lg rounded-3xl">
					<div className=" text-center p-4 rounded-t-md">
						<h3 className="text-[40px] font-outfit">Log In</h3>
					</div>
					<div className="p-4 flex flex-col gap-4 font-outfit text-[18px]">
						<div>
							<label
								htmlFor="email"
								className="block text-md font-medium text-gray-700"
							>
								Email
							</label>
							<input
								type="email"
								id="email"
								{...register('email', { required: 'Email is required' })}
								className="mt-1 p-2 border border-gray-300 rounded-md w-full"
							/>
							{errors.email && (
								<span className="text-red-600">{errors.email.message}</span>
							)}
						</div>
						<div>
							<label
								htmlFor="password"
								className="block text-md font-medium text-gray-700"
							>
								Password
							</label>
							<input
								type="password"
								id="password"
								{...register('password', {
									required: 'Password is required',
									minLength: {
										value: 8,
										message: 'Must be at least 8 characters',
									},
								})}
								className="mt-1 p-2 border border-gray-300 rounded-md w-full"
							/>
							{errors.password && (
								<span className="text-red-600">{errors.password.message}</span>
							)}
						</div>
						<div>
							<label className="inline-flex items-center">
								<input type="checkbox" className="form-checkbox" />
								<span className="ml-2">Remember Me</span>
							</label>
						</div>
					</div>
					<div className="p-4 flex flex-col items-center font-outfit">
						<button
							type="submit"
							className="rounded-full bg-green-500 hover:bg-green-600 text-white px-8 py-2 transition duration-300 ease-in-out"
						>
							Log In
						</button>
						<p className="mt-6 mb-4 flex text-md justify-center">
							Don&apos;t have an account?&nbsp;
							<Link to="/signup" className="text-blue-500">
								Sign Up
							</Link>
						</p>
					</div>
				</div>
			</form>
		</div>
	);
}
