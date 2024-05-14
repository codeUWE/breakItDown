import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import { AuthContext } from '../context/AuthProvider';

function Layout() {
	const { isLoading, user } = useContext(AuthContext);
	return (
		<>
			{!isLoading && (
				<>
					{user ? (
						<div>
							<NavBar />
							<Outlet />
						</div>
					) : (
						<Navigate to="/login" />
					)}
				</>
			)}
		</>
	);
}

export default Layout;
