

// function SignUpCard() {
// 	return <>
// 	<h1>SignUp card</h1>
// 	</>
// }

// export default SignUpCard;


import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Typography,
	Input,
	Checkbox,
	Button,
} from '@material-tailwind/react';
import{Link} from 'react-router-dom'
import google48 from '../assets/google48.png'
import github48 from '../assets/github48.png'
export default function SignUpCard() {
	return (
    <div className='flex items-center justify-center mt-20 '>
		<Card className="w-96  ">
			<CardHeader
				variant="gradient"
				color="green"
				className="mb-4 grid h-20 w-22 place-items-center"
			>
				<Typography variant="h3" color="white" className='font-outfit'>
					Sign Up
				</Typography>
			</CardHeader>
			<CardBody className="flex flex-col gap-4 font-inter">
			<Input label="Name" size="lg" />
				<Input label="Email" size="lg" />
				<Input label="Password" size="lg" />
				<Input label="Confirm Password" size="lg" />
				{/* <div className="-ml-2.5">
					<Checkbox label="Remember Me" />
				</div> */}
			</CardBody>
			<CardFooter className="pt-0 flex flex-col items-center font-inter">
				{/*wip-  make loading ={true} on clicking */}
				<Link to="/dashboard">
				<Button
					color="green"
					variant="gradient"
					className="rounded-full "
					loading={false}
				>
					Register
				</Button>
				</Link>
				<Typography variant="small" className="mt-6 mb-4 flex justify-center">
					Already  have an account?
					<Link to="/login">
					<Typography
						as="a"
						
						variant="small"
						color="indigo"
						className="ml-1 font-bold"
					>
						Log In
					</Typography>
					</Link>
				</Typography>
				<div className='flex items-center justify-evenly'>
				<Button
					size="lg"
					variant="outlined"
					color="blue-gray"
					className="flex items-center gap-3 rounded-full m-2"
					
				>
					<a href="https://accounts.google.com/v3/signin/identifier?hl=en-gb&ifkv=AaSxoQyF06yyB3ylAy1z0fDai3yEb7r-RslV7Re-4ja3is33TOPa8qwLA92lvjuZQaJvTJi419r7Ew&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S-2080213894%3A1714640364798073&theme=mn&ddm=0" className="flex items-center gap-3">
					<img src={google48} alt="Gmail sign in" className="h-6 w-6" />
					Sign In
					</a>
				</Button>
        <Button
					size="lg"
					variant="outlined"
					color="blue-gray"
					className="flex items-center gap-3 rounded-full m-2"
					
				>
					<a href="https://github.com/login" className="flex items-center gap-3">
					<img src={github48} alt="Github sign in" className="h-6 w-6" />
					Sign In
					</a>
				</Button>
				</div>
			</CardFooter>
		</Card>
    </div>
	);
}

