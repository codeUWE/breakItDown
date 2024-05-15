
import './App.css';
import { Routes, Route } from 'react-router-dom';

//components
import Task from './components/Task';
import SingleTaskBoard from './components/SingleTaskBoard';
import SignUpCard from './components/SignUpCard';
import LoginCard from './components/LoginCard';
import ManageProjects from './components/ManageProjects';
import ManageRoles from './components/ManageRoles';
import ManageUsers from './components/ManageUsers';
import Dashboard from './components/Dashboard';
import Layout from './components/Layout';
import Landing from './components/Landing';
import Authorize from './components/Authorize';

import ProjectProgress from './components/ProjectProgress';
import TeamTable from './components/TeamTable';


function App() {
	return (
		<>
	
			<main>
				<Routes>
					<Route path="/" element={<Landing />} />
					<Route path="/login" element={<LoginCard />} />
					<Route path="/signup" element={<SignUpCard />} />

					<Route path="/" element={<Layout />}>
						<Route path="/admin" element={<Authorize role={'Admin'} />}>
							<Route path="dashboard/projects" element={<ManageProjects />} />

							<Route path="dashboard/roles" element={<ManageRoles />} />
							<Route path="dashboard/users" element={<ManageUsers />} />
						</Route>
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/tasks" element={<Task />} />
						<Route path="/team" element={<TeamTable />} />
						<Route path="/tasks/:id" element={<SingleTaskBoard />} />
						<Route path="/tasks/progress" element={<ProjectProgress />} />

						<Route path="/notes" element={<Notes />} />
					</Route> 

					</Route>

				</Routes>
			</main>
		</> 
	);
}

export default App;
