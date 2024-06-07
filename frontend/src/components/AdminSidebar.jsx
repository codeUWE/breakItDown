// AdminSidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminSidebar = () => {
	const getNavLinkClass = ({ isActive }) =>
		isActive
			? 'text-[#681FDE] font-[700] bg-[#fb937f]'
			: 'hover:font-[700] hover:bg-[#fb937f] hover:text-[#681FDE]';

	return (
		<div className="fixed sm:bottom-4 md:bottom-8 lg:bottom-4 xl:bottom-4 left-1/2 transform -translate-x-1/2 md:w-10/12 lg:w-3/5 bg-[#8c87d4] text-white shadow-lg z-40 sm:p-3 md:p-4 lg:p-3 rounded-3xl">
			<h2 className="font-outfit  md:text-[28px] sm:text-[20px] xl:text-[24px] font-[600] mb-2 lg:mb-0 text-center">
				Admin Panel
			</h2>
			<nav className=" flex justify-evenly font-outfit  md:text-[24px] lg:text-[24px] xl:text-[20px] font-[400]">
				<NavLink
					to="/admin/dashboard/projects"
					className={({ isActive }) =>
						`sm:p-2 md:px-4 rounded-xl ${getNavLinkClass({ isActive })}`
					}
				>
					Manage Projects
				</NavLink>
				<NavLink
					to="/admin/dashboard/roles"
					className={({ isActive }) =>
						`sm:p-2 md:px-4 rounded-xl ${getNavLinkClass({ isActive })}`
					}
				>
					Manage Roles
				</NavLink>
				<NavLink
					to="/admin/dashboard/users"
					className={({ isActive }) =>
						`sm:p-2 md:px-4 rounded-xl ${getNavLinkClass({ isActive })}`
					}
				>
					Manage Users
				</NavLink>
			</nav>
		</div>
	);
};

export default AdminSidebar;
