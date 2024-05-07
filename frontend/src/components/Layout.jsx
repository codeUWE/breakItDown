import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import { TemporaryNavbar } from './TemporaryNavbar';

function Layout() {
	return (
		<div>
			<NavBar />
			<Outlet />
		</div>
	);
}

export default Layout;
