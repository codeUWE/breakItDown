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
		<nav className="w-[1400px] h-[125px] mx-auto rounded-[30px] bg-[#6A66A3] flex items-center justify-self-auto font-Inter font-[500] text-[25px] mt-5 shadow-xl relative">
			<div className="absolute right-[34px] h-full flex ">
				<div className="border-[8px] border-[#FE4A49] h-full "></div>
				<div className="border-[8px] border-[#FED766] h-full "></div>
				<div className="border-[8px] border-[#08A045] h-full "></div>
				<div className="border-[8px] border-[#FFD5FF] h-full "></div>
				<div className="border-[8px] border-[#438CDB] h-full "></div>
			</div>

			{!isLoading && (
				<div className="flex w-full px-7 mx-auto justify-between items-center">
					<ul className="flex items-center text-white font-outfit text-[40px] font-[600] gap-10 ">
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
						<div className="flex flex-col justify-center items-center gap-2">
							<span className="text-[16px] text-[#CFCFCD] font-outfit font-[600]">
								Welcome, {user.name}
							</span>
							<button
								className="flex justify-end px-7 rounded-full text-[#F55D3E] font-outfit text-[30px] font-[600] bg-[#080708] shadow-lg"
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
							className="w-[90px] h-[90px] "
						/>
					</div>
				</div>
			)}
		</nav>
	);
}

export default NavBar;
