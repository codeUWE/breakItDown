import './App.css';

//components
import Tasks from './components/Tasks';
import SignUp from './components/SignUp';
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
			<Tasks />
			<Actionbar />
			<SignUpError/>
		</>
	);
}

export default App;
