
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
export default function LoginCard() {
	return (
    <div className='flex items-center justify-center mt-20 '>
		<Card className="w-96  ">
			<CardHeader
				variant="gradient"
				color="green"
				className="mb-4 grid h-20 w-22 place-items-center"
			>
				<Typography variant="h3" color="white" className='font-outfit'>
					Log In
				</Typography>
			</CardHeader>
			<CardBody className="flex flex-col gap-4 font-inter">
				<Input label="Email" size="lg" />
				<Input label="Password" size="lg" />
				<div className="-ml-2.5">
					<Checkbox label="Remember Me" />
				</div>
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
					Log In
				</Button>
				</Link>
				<Typography variant="small" className="mt-6 mb-4 flex justify-center">
					Don&apos;t have an account?
					<Link to="/signup">
					<Typography
						as="a"
						href="#signup"
						variant="small"
						color="indigo"
						className="ml-1 font-bold"
					>
						Sign up
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
					<Link to="https://accounts.google.com/v3/signin/identifier?hl=en-gb&ifkv=AaSxoQyF06yyB3ylAy1z0fDai3yEb7r-RslV7Re-4ja3is33TOPa8qwLA92lvjuZQaJvTJi419r7Ew&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S-2080213894%3A1714640364798073&theme=mn&ddm=0" className="flex items-center gap-3">
					<img src={google48} alt="Gmail sign in" className="h-6 w-6" />
					Sign In
					</Link>
				</Button>
        <Button
					size="lg"
					variant="outlined"
					color="blue-gray"
					className="flex items-center gap-3 rounded-full m-2"
					
				>
					<Link to="https://github.com/login" className="flex items-center gap-3">
					<img src={github48} alt="Github sign in" className="h-6 w-6" />
					Sign In
					</Link>
				</Button>
				</div>
			</CardFooter>
		</Card>
    </div>
	);
}
