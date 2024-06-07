import React from 'react';
import { Avatar } from '@material-tailwind/react';
import { NavLink, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { useState } from 'react';
import AdmindropdownMenu from './AdmindropdownMenu';

function NavBar() {
	const { isLoading, user, logout } = useContext(AuthContext);
	const location = useLocation();
	const [isOpen, setIsOpen] = useState(false);

	const getNavLinkClass = ({ isActive }) =>
		isActive ? 'text-[#81cbfd]' : 'hover:text-[#81cbfd]';

	const isAdminRoute = location.pathname.startsWith('/admin');

	return (
		<nav className="w-[97%] mx-auto lg:rounded-3xl sm:rounded-2xl bg-[#6A66A3] flex items-center justify-self-auto font-Inter font-[500] xl:text-[40px] lg:text-[35px] md:text-[26px] sm:text-[20px] mt-5 shadow-xl relative md:py-2 sm:py-1">
			<div className="absolute right-[34px] h-full flex ">
				<div className="xl:border-[8px] lg:border-[8px] sm:border-[5px] md:border-[6px] border-[#FE4A49] h-full "></div>
				<div className="xl:border-[8px] lg:border-[8px] sm:border-[5px] md:border-[6px] border-[#FED766] h-full "></div>
				<div className="xl:border-[8px] lg:border-[8px] sm:border-[5px] md:border-[6px] border-[#08A045] h-full "></div>
				<div className="xl:border-[8px] lg:border-[8px] sm:border-[5px] md:border-[6px] border-[#FFD5FF] h-full "></div>
				<div className="xl:border-[8px] lg:border-[8px] sm:border-[5px] md:border-[6px] border-[#438CDB] h-full "></div>
			</div>
			{!isLoading && (
				<div className="flex w-full lg:px-4  sm:px-3 mx-auto justify-between items-center">
					<ul className="flex items-center text-white font-outfit font-[600] sm:gap-4 lg:gap-6 xl:gap-10 ">
						{user.role.name === 'Admin' && (
							<AdmindropdownMenu isActive={isAdminRoute} />
						)}
						<NavLink to="/dashboard" className={getNavLinkClass}>
							Dashboard
						</NavLink>
						<NavLink to="/tasks" className={getNavLinkClass}>
							Tasks
						</NavLink>
						<NavLink to="/team" className={getNavLinkClass}>
							Team
						</NavLink>
					</ul>
					<div className="flex items-center gap-5  ">
						<div className="flex flex-col justify-center items-center lg:gap-2">
							<span className="xl:text-[20px] lg:text-[16px] md:text-[14px] sm:text-[12px] text-[#CFCFCD] font-outfit font-[600] ">
								Welcome, {user.name}
							</span>
							<button
								className="flex justify-end px-7 rounded-full text-[#F55D3E] font-outfit xl:text-[28px] lg:text-[24px] md:text-[20px] sm:text-[16px] font-[600] bg-[#080708] shadow-lg"
								onClick={logout}
							>
								Logout
							</button>
						</div>
						<Avatar
							src={
								user.profilePicture ||
								'https://cdn-icons-png.flaticon.com/512/149/149071.png'
							}
							alt="avatar"
							className="xl:w-[90px] xl:h-[90px]  lg:w-[85px] lg:h-[85px] md:w-[65px] md:h-[65px] sm:w-[55px] sm:h-[55px] sm:me-5 lg:me-4 xl:me-[14px]"
						/>
					</div>
				</div>
			)}
		</nav>
	);
}

export default NavBar;
