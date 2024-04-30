import './App.css';
import { Button } from '@material-tailwind/react';
import GoodNews from './components/GoodNews';
// import GoodNews from './components/GoodNews';

import Actionbar from './components/Actionbar';

function App() {
	return (
		<>
			<GoodNews/>
			<Tasks />
			<Actionbar />
		</>
	);
}

export default App;
