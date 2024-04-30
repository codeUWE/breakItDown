import './App.css';
import { Routes, Route } from 'react-router-dom';

//components
import Tasks from './components/Tasks';
import SignUp from './components/SignUp';
import LoginCard from './components/LoginCard';
import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard';
import Layout from './components/Layout';
import Team from './components/Team';
import Notes from './components/Notes';

function App() {
	return (
		<>
			<main>
				<Routes>
					<Route path="/login" element={<LoginCard />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/" element={<Layout />}>
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/tasks" element={<Tasks />} />
						<Route path="/team" element={<Team />} />
						<Route path="/notes" element={<Notes />} />
					</Route>
				</Routes>
			</main>
		</>
	);
}

export default App;
