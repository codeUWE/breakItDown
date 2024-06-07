import { Link, useNavigate } from 'react-router-dom';
import heroImage from '../assets/heroImage.png'; // Beispielbild

const LandingPage = () => {
	const navigate = useNavigate();
	return (
		<div className="min-h-screen bg-[#f18a75] pt-5">
			<nav className="w-[97%] h-[100px] mx-auto lg:rounded-3xl sm:rounded-2xl bg-[#6A66A3] flex items-center justify-between font-Inter font-[500] xl:text-[45px] lg:text-[35px] md:text-[24px] sm:text-[20px]  shadow-xl relative md:py-2 sm:py-1 xl:ps-10 xl:pe-40 md:ps-10 md:pe-28 lg:pe-32">
				<h2 className="font-outfit font-[600] text-white">
					Welcome at Break it Down!
				</h2>
				<div>
					<Link
						to="/signup"
						className="px-7 rounded-full text-white font-outfit xl:text-[30px] lg:text-[24px] md:text-[20px] sm:text-[16px] font-[600] bg-[#080708] shadow-lg py-2"
					>
						sign up
					</Link>
					<Link
						to="/login"
						className="px-7 rounded-full text-[#F55D3E] font-outfit xl:text-[30px] lg:text-[24px] md:text-[20px] sm:text-[16px] font-[600] bg-[#080708] shadow-lg xl:ms-5 md:ms-3 py-2"
					>
						login
					</Link>
				</div>
				<div className="absolute right-[34px] h-full flex ">
					<div className="xl:border-[10px] lg:border-[8px] sm:border-[5px] md:border-[6px] border-[#FE4A49] h-full "></div>
					<div className="xl:border-[10px] lg:border-[8px] sm:border-[5px] md:border-[6px] border-[#FED766] h-full "></div>
					<div className="xl:border-[10px] lg:border-[8px] sm:border-[5px] md:border-[6px] border-[#08A045] h-full "></div>
					<div className="xl:border-[10px] lg:border-[8px] sm:border-[5px] md:border-[6px] border-[#FFD5FF] h-full "></div>
					<div className="xl:border-[10px] lg:border-[8px] sm:border-[5px] md:border-[6px] border-[#438CDB] h-full "></div>
				</div>
			</nav>
			<main className="">
				<section className="bg-[#f18a75]">
					<div className="container ms-4 px-6 my-10 text-center">
						<h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-[100px] text-left font-bold text-[#080708] font-outfit">
							Organize your project with ease and efficiency
						</h2>
						<p className="mt-4  md:text-2xl lg:text-3xl xl:text-[50px] text-left font-outfit leading-4 text-[#080708]">
							With our project management tool, you always have an overview of
							your tasks and deadlines.
						</p>
					</div>
				</section>

				<section className="container  flex justify-start  gap-10 md:gap-0 ">
					<div className="xl:w-[80%] flex flex-col xl:justify-start xl:items-start md:w-3/4 md:z-40 md:justify-start ">
						<div className="w-full md:px-12 xl:px-20 lg:px-14  py-4 ">
							<div className=" p-3 shadow-lg bg-[#D4ECFC] rounded-[30px]">
								<div className="bg-[#EFF9FE] rounded-[20px] p-3">
									<h3 className="text-2xl font-bold text-[#080708] font-outfit">
										Responsive{' '}
									</h3>
									<p className="mt-4 text-[#080708] font-outfit">
										This tool is fully responsive for tablets and laptops. It is
										tested for Screens in 768px, 1024px and 1440px.
									</p>
								</div>
							</div>
						</div>
						<div className="w-full md:px-12 xl:px-20 lg:px-14  py-4">
							<div className=" p-3 shadow-lg bg-[#D4ECFC] rounded-[30px]">
								<div className="bg-[#EFF9FE] rounded-[20px] p-3">
									<h3 className="text-2xl font-bold text-[#080708] font-outfit">
										Manage Tasks{' '}
									</h3>
									<p className="mt-4 text-[#080708] font-outfit">
										Manage your tasks, create subtasks and assign them to your
										team members.
									</p>
								</div>
							</div>
						</div>
						<div className="w-full md:px-12 xl:px-20 lg:px-14  py-4">
							<div className=" p-3 shadow-lg bg-[#D4ECFC] rounded-[30px] font-outfit">
								<div className="bg-[#EFF9FE] rounded-[20px] p-3">
									<h3 className="text-2xl font-bold text-[#080708] font-outfit">
										Your own permissions
									</h3>
									<p className="mt-4 text-[#080708]">
										You can set permissions for your team members and manage
										their access for different actions like creating tasks,
										editing tasks, closing tickets, etc.
									</p>
								</div>
							</div>
						</div>
					</div>

					<img
						src={heroImage}
						alt="Hero"
						className="xl:w-[550px] xl:h-[550px] md:w-[400px] md:h-[400px] xl:top-[350px] md:mt-20 md:z-10 md:absolute md:right-4 xl:right-24 "
					/>
				</section>

				<section className="bg-[#f18a75]">
					<div className="container mx-auto px-6  pt-5 pb-16 text-center">
						<h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#080708] font-outfit">
							Start organizing your projects today
						</h2>
						<p className="my-4 text-lg md:text-xl lg:text-2xl xl:text-3xl font-outfit text-[#080708]">
							Just sign up and start organizing your projects with ease.
						</p>
						<Link
							to="/signup"
							className="px-7 rounded-full text-white font-outfit xl:text-[30px] lg:text-[24px] md:text-[20px] sm:text-[16px] font-[600] bg-[#080708] shadow-lg py-2"
						>
							sign up
						</Link>
					</div>
				</section>
			</main>

			<footer className="bg-white shadow py-6">
				<div className="container mx-auto text-center">
					<p className="text-[#080708]">
						&copy; 2024 by Break it Down. All rights reserved.
					</p>
				</div>
			</footer>
		</div>
	);
};

export default LandingPage;
