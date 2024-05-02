import './App.css';

//components
import Tasks from './components/Tasks';
import SignUpCard from './components/SignUpCard';
import LoginCard from './components/LoginCard';
import Dashboard from './components/Dashboard';
import Layout from './components/Layout';
import Team from './components/Team';
import Notes from './components/Notes';

import Actionbar from './components/Actionbar';
import SignUpError from './components/SignUpError';

function App() {
	return (
		<>
<<<<<<< HEAD
			<Tasks />
			<Actionbar />
			<SignUpError/>
=======
			<main>
				<Routes>
					<Route path="/login" element={<LoginCard />} />
					<Route path="/signup" element={<SignUpCard />} />
					<Route path="/" element={<Layout />}>
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/tasks" element={<Tasks />} />
						<Route path="/team" element={<Team />} />
						<Route path="/notes" element={<Notes />} />
					</Route>
				</Routes>
			</main>
>>>>>>> 23f98393a4ced2d076cb8a20fd9c489aa9146b61
		</>
	);
}

export default App;
