import google50 from '../assets/google50.png';
export default LoginCard

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
 
export function LoginCard() {
  return (
    <Card className="w-96">
      <CardHeader
        variant="gradient"
        color="green"
        className="mb-4 grid h-20 w-22 place-items-center"
      >
        <Typography variant="h3" color="white">
          Log In
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <Input label="Email" size="lg" />
        <Input label="Password" size="lg" />
        <div className="-ml-2.5">
          <Checkbox label="Remember Me" />
        </div>
      </CardBody>
      <CardFooter className="pt-0 flex flex-col items-center">
        {/*wip-  make loading ={true} on clicking */}
        <Button color="green" variant="gradient"className="rounded-full "loading={false} >
          Log In
        </Button>
        <Typography variant="small" className="mt-6 flex justify-center">
          Don&apos;t have an account?
          <Typography
            as="a"
            href="#signup"
            variant="small"
            color="indigo"
            className="ml-1 font-bold"
          >
            Sign up
          </Typography>
        </Typography>
        <Button
        size="lg"
        variant="outlined"
        color="blue-gray"
        className="flex items-center gap-3"
      >
        <img src='google50' alt="metamask" className="h-6 w-6" />
        Continue with Google
      </Button>
      </CardFooter>
    </Card>
  );
}