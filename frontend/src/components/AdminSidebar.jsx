// AdminSidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminSidebar = () => {
	const getNavLinkClass = ({ isActive }) =>
		isActive
			? 'text-[#681FDE] font-[700] bg-[#fb937f]'
			: 'hover:font-[700] hover:bg-[#fb937f] hover:text-[#681FDE]';

	return (
		<div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 w-[600px] h-[150px] bg-[#8c87d4] text-white shadow-lg z-40 p-4 rounded-3xl">
			<h2 className="font-outfit text-[30px] font-[600] mb-4 text-center">
				Admin Panel
			</h2>
			<nav className="flex justify-evenly font-outfit text-[18px] font-[400]">
				<NavLink
					to="/admin/dashboard/projects"
					className={({ isActive }) =>
						`p-2 rounded-md ${getNavLinkClass({ isActive })}`
					}
				>
					Manage Projects
				</NavLink>
				<NavLink
					to="/admin/dashboard/roles"
					className={({ isActive }) =>
						`p-2 rounded-md ${getNavLinkClass({ isActive })}`
					}
				>
					Manage Roles
				</NavLink>
				<NavLink
					to="/admin/dashboard/users"
					className={({ isActive }) =>
						`p-2 rounded-md ${getNavLinkClass({ isActive })}`
					}
				>
					Manage Users
				</NavLink>
			</nav>
		</div>
	);
};

export default AdminSidebar;
