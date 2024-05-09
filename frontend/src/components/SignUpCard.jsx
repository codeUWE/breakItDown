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
import { Link, useNavigate } from "react-router-dom";
import google48 from "../assets/google48.png";
import github48 from "../assets/github48.png";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function SignUpCard() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    axios
      .post("http://localhost:3001/auth/signup", data, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        navigate("/admindashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //   console.log(errors)
  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center justify-center mt-20 "
    >
      <Card className="w-96  ">
        <CardHeader
          variant="gradient"
          color="green"
          className="mb-4 grid h-20 w-22 place-items-center"
        >
          <Typography variant="h3" color="white" className="font-outfit">
            Sign Up
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4 font-inter">
          {/* include validation with required or other standard HTML validation rules */}

          <Input
            type="email"
            label="Email"
            {...register("email", { required: "Email is required" })}
            size="lg"
          />

          <Input
            type="password"
            label="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Must be at least 8 Charachters!",
              },
            })}
            size="lg"
          />
        </CardBody>
        <CardFooter className="pt-0 flex flex-col items-center font-inter">
          <input
            type="submit"
            value="Register"
            className="rounded-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 transition duration-300 ease-in-out"
          />

          {/* <Typography variant="small" className="mt-6 mb-4 flex justify-center">
            Already have an account?
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
          </Typography> */}
          <div className="flex items-center justify-evenly">
            <Button
              size="lg"
              variant="outlined"
              color="blue-gray"
              className="flex items-center gap-3 rounded-full m-2"
            >
              <Link
                to="https://accounts.google.com/v3/signin/identifier?hl=en-gb&ifkv=AaSxoQyF06yyB3ylAy1z0fDai3yEb7r-RslV7Re-4ja3is33TOPa8qwLA92lvjuZQaJvTJi419r7Ew&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S-2080213894%3A1714640364798073&theme=mn&ddm=0"
                className="flex items-center gap-3"
              >
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
              <Link
                to="https://github.com/login"
                className="flex items-center gap-3"
              >
                <img src={github48} alt="Github sign in" className="h-6 w-6" />
                Sign In
              </Link>
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* errors will return when field validation fails  */}

      {errors.email?.type === "required" && <span>{errors.email.message}</span>}
      {errors.password?.type === "required" && (
        <span>{errors.password.message}</span>
      )}
      {errors.password?.type === "minLength" && (
        <span>{errors.password.message}</span>
      )}
    </form>
  );
}
