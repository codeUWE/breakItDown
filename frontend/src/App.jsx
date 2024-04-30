import './App.css';
import { Button } from '@material-tailwind/react';
import GoodNews from './components/GoodNews';
// import GoodNews from './components/GoodNews';

function App() {
	return (
		<>
			<h1 className="text-3xl flex justify-center items-center">
				Hello world!
			</h1>
			{/* <Button>Button</Button> */}

			<GoodNews/>
		</>
	);
}

export default App;
