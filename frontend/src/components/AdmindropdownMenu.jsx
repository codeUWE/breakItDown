import React, { useState, useEffect, useRef } from 'react';
import dropdown from '../assets/dropdown.png';
import { NavLink, useLocation } from 'react-router-dom';

const AdmindropdownMenu = ({ isActive }) => {
	// State to manage whether the dropdown is open or closed
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);
	const location = useLocation();

	const getNavLinkClass = ({ isActive }) =>
		isActive
			? 'text-[#F55D3E]'
			: 'hover:font-[700] hover:bg-[#fb937f] hover:text-[#681FDE]';

	const handleClickOutside = (event) => {
		if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		// Close the dropdown when clicking outside
		document.addEventListener('mousedown', handleClickOutside);
		// Close the dropdown when the route changes
		setIsOpen(false);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [location]);

	return (
		<div
			className={`relative inline-block ${isActive ? 'text-[#F55D3E]' : ''}`}
			ref={dropdownRef}
		>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className={`flex items-center px-3 py-2 border border-transparent hover:text-[#F55D3E] rounded-md font-outfit text-[40px] font-[600] ${
					isActive ? 'text-[#F55D3E]' : ''
				}`}
			>
				Admin
				<img src={dropdown} alt="" width={35} height={35} className="ms-3" />
			</button>

			{/* Dropdown menu */}
			<div
				className={`${
					isOpen ? 'block' : 'hidden'
				} font-outfit text-[30px] text-white bg-[#8c87d4] font-[400] origin-top-right absolute left-0 w-72 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50`}
				role="menu"
				aria-orientation="vertical"
				aria-labelledby="options-menu"
			>
				<div className="flex flex-col" role="none">
					{/* Dropdown items */}
					<NavLink
						to="/admin/dashboard/projects"
						className={({ isActive }) =>
							`px-2 ${getNavLinkClass({ isActive })}`
						}
						role="menuitem"
						onClick={() => setIsOpen(false)}
					>
						Manage Projects
					</NavLink>
					<NavLink
						to="/admin/dashboard/roles"
						className={({ isActive }) =>
							`px-2 ${getNavLinkClass({ isActive })}`
						}
						role="menuitem"
						onClick={() => setIsOpen(false)}
					>
						Manage Roles
					</NavLink>
					<NavLink
						to="/admin/dashboard/users"
						className={({ isActive }) =>
							`px-2 ${getNavLinkClass({ isActive })}`
						}
						role="menuitem"
						onClick={() => setIsOpen(false)}
					>
						Manage Users
					</NavLink>

					{/* Add more dropdown items as needed */}
				</div>
			</div>
		</div>
	);
};

export default AdmindropdownMenu;
