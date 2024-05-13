import React from 'react';
import { Avatar } from '@material-tailwind/react';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';

function NavBar() {
	const { isLoading, user, logout } = useContext(AuthContext);
	return (
		<nav className="w-[1400px] h-[125px] mx-auto rounded-[20px] bg-[#C1E1F5] flex items-center justify-self-auto font-Inter font-[500] text-[25px] mt-5">
			{/* Avatar */}

			{/* Navigation Links		 */}
			{!isLoading && (
				<div className="flex w-full justify-between items-center content- m-6  pl-3.5">
					<ul className="flex space-x-4 ">
						{/* need to decide 1st Page of App */}
						{/* <NavLink to="/">Login</NavLink> */}
						{user.role.name === 'Admin' ? (
							<NavLink to="/admin/dashboard">Admin</NavLink>
						) : (
							''
						)}
						<NavLink to="/dashboard">Dashboard</NavLink>
						<NavLink to="/tasks">Tasks</NavLink>
						<NavLink to="/team">Team</NavLink>
						<NavLink to="/notes">Notes</NavLink>
					</ul>
					<div className="flex items-center gap-5 ">
						<button className="flex justify-end pl-3" onClick={logout}>
							Logout
						</button>
						<div className="flex flex-col justify-center items-center">
							<Avatar src={user.profilePicture} alt="avatar" size="xl" />
							<span className="text-[16px]">Welcome, {user.name}</span>
						</div>
					</div>
				</div>
			)}

			{/* Logout Button */}
		</nav>
	);
}

export default NavBar;
