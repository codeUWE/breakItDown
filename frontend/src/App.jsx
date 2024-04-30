import './App.css';
import { Button } from '@material-tailwind/react';
import LoginCard from './components/LoginCard';

function App() {
	return (
		<>
			<h1 className="text-3xl font-bold text-red-600 underline">
				Hello world!
				
			</h1>
			{/* <Button>Button</Button> */}
			<br />
			<LoginCard/>
		</>
	);
}

export default App;
