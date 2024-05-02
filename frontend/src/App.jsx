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
import Landing from './components/Landing';
import SignUpError from './components/SignUpError';


function App() {
	return (
		<>
		<Landing/>
		<SignUpError/>

		{/* <Tasks />	
		<Actionbar />	 */}
		
			

			
		</>
	);
}

export default App;
