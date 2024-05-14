import './App.css';
import { Routes, Route } from 'react-router-dom';

//components
import Task from './components/Task';
import SingleTaskBoard from './components/SingleTaskBoard';

// import SignUp from './components/SignUp';
import SignUpCard from './components/SignUpCard';
import LoginCard from './components/LoginCard';
import AdminDashboard from './components/AdminDashboard';
import ManageProjects from './components/ManageProjects';
import ManageRoles from './components/ManageRoles';
import ManageUsers from './components/ManageUsers';
import Dashboard from './components/Dashboard';
import Layout from './components/Layout';
// import Team from "./components/Team";
import Notes from './components/Notes';

import Schedule from './components/Schedule';
import Authorize from './components/Authorize';

import ProjectProgress from './components/ProjectProgress';
import TeamView from './components/TeamView';
import TeamTable from './components/TeamTable';

function App() {
	return (
		<>
			<main>
				<Routes>
					<Route path="/login" element={<LoginCard />} />
					<Route path="/signup" element={<SignUpCard />} />

					<Route path="/" element={<Layout />}>
						<Route path="/admin" element={<Authorize role={'Admin'} />}>
							{/* <Route path="dashboard" element={<AdminDashboard />} /> */}
							<Route path="dashboard/projects" element={<ManageProjects />} />
							<Route path="dashboard/roles" element={<ManageRoles />} />
							<Route path="dashboard/users" element={<ManageUsers />} />
						</Route>

						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/tasks" element={<Task />} />
						<Route path="/team" element={<TeamView />} />
						<Route path="/teamtable" element={<TeamTable />} />
						<Route path="/tasks/:id" element={<SingleTaskBoard />} />
						<Route path="/tasks/progress" element={<ProjectProgress />} />
						<Route path="/notes" element={<Notes />} />
					</Route>
				</Routes>
			</main>
		</>
	);
}

export default App;
