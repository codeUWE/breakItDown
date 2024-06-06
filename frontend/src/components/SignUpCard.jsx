import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import google48 from '../assets/google48.png';
import github48 from '../assets/github48.png';
import { useForm } from 'react-hook-form';
import axiosClient from '../axiosClient';

export default function SignUpCard() {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();
	const onSubmit = (data) => {
		console.log('Form Data:', data); // Überprüfen der gesendeten Daten
		axiosClient
			.post('/api/auth/signup', data, {
				withCredentials: true,
			})
			.then((response) => {
				console.log(response);
				navigate('/login');
			})
			.catch((err) => {
				console.log(err);
			});
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
			<div className="lg:w-[120px] lg:h-[120px] md:w-[90px] md:h-[90px] bg-[#ffffff] rounded-full absolute md:right-[50px] lg:right-[45px] xl:right-[55px] md:top-8 z-20 shadow-lg"></div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex items-center justify-center"
			>
				<div className="w-96 p-4 bg-white shadow-lg rounded-3xl">
					<div className="text-center p-4 rounded-t-md">
						<h3 className="text-[40px] font-outfit">Sign Up</h3>
					</div>
					<div className="p-4 flex flex-col gap-4 font-outfit text-[18px]">
						<div>
							<label
								htmlFor="name"
								className="block text-md font-medium text-gray-700"
							>
								Name
							</label>
							<input
								type="text"
								id="name"
								{...register('name', { required: 'Name is required' })}
								className="mt-1 p-2 border border-gray-300 rounded-md w-full"
							/>
							{errors.name && (
								<span className="text-red-600">{errors.name.message}</span>
							)}
						</div>
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
					</div>
					<div className="p-4 flex flex-col items-center font-outfit">
						<button
							type="submit"
							className="rounded-full bg-green-500 hover:bg-green-600 text-white px-8 py-2 transition duration-300 ease-in-out"
						>
							Register
						</button>
						<p className="mt-6 mb-4 flex text-md justify-center">
							Already have an account?&nbsp;
							<Link to="/login" className="text-blue-500">
								Log In
							</Link>
						</p>
						<div className="flex items-center justify-evenly w-full">
							<a
								href="https://accounts.google.com/v3/signin/identifier?hl=en-gb&ifkv=AaSxoQyF06yyB3ylAy1z0fDai3yEb7r-RslV7Re-4ja3is33TOPa8qwLA92lvjuZQaJvTJi419r7Ew&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S-2080213894%3A1714640364798073&theme=mn&ddm=0"
								className="flex w-32 items-center gap-3 border border-gray-300 p-2 rounded-full m-2 hover:bg-gray-100 transition"
							>
								<img src={google48} alt="Gmail sign in" className="h-6 w-6" />
								Sign In
							</a>
							<a
								href="https://github.com/login"
								className="flex w-32 items-center gap-3 border border-gray-300 p-2 rounded-full m-2 hover:bg-gray-100 transition"
							>
								<img src={github48} alt="Github sign in" className="h-6 w-6" />
								Sign In
							</a>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}
