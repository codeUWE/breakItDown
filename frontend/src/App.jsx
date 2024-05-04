import './App.css';

//components
import Task from './components/Task';
import SingleTaskBoard from './components/SingleTaskBoard';
import SignUp from './components/SignUp';
import SignUpCard from './components/SignUpCard';
import LoginCard from './components/LoginCard';
import Dashboard from './components/Dashboard';
import Layout from './components/Layout';
import Team from './components/Team';
import Notes from './components/Notes';

import Actionbar from './components/Actionbar';
import GoodNews from './components/GoodNews';
import OpenSubTasks from './components/OpenSubTasks';
import Schedule from './components/Schedule';
// import Actionbar from './components/Actionbar';
// import Landing from "./components/Landing";

function App() {
	return (
		<>



			<main>
				<Routes>
					<Route path="/login" element={<LoginCard />} />
					<Route path="/signup" element={<SignUpCard />} />
					<Route path="/" element={<Layout />}>
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/tasks" element={<Task />} />
						<Route path="/tasks/:id" element={<SingleTaskBoard />} />
						<Route path="/team" element={<Team />} />
						<Route path="/notes" element={<Notes />} />
					</Route>
				</Routes>
			</main>

		</>
	);
}

export default App;
