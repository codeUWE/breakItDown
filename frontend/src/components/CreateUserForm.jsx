import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getProjectByOwner } from "../services/UserRequests";
import axiosClient from "../axiosClient";
import {
  Card,
  Input,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";

import { AuthContext } from "../context/AuthProvider";

const CreateUserForm = () => {
  const [project, setProject] = useState("");
  const [role, setRole] = useState("");
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data = { ...data, role, project: project._id };
    console.log(data);
    axiosClient
      .post("/users", data)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProjectByOwner(user._id)
      .then((data) => {
        console.log(data);
        setRoles(data.roles);
        setProject(data);
      })

      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <h1 className="font-outfit font-[600] text-[45px] text-center text-black-900 my-10 ">
        Manage Users
      </h1>

      <div className="flex justify-center items-center gap-3">
        <Card
          className="w-[700px] h-[800px]  bg-[#f4f9fc] flex flex-col justify-center items-center gap-2 rounded-[20px]"
          color="transparent"
          shadow={false}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          >
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h2" color="blue-gray" className="mb-4">
                Project Name: {project.title}
              </Typography>
              {/* <label >{project}</label> */}
              <Typography variant="h4" color="blue-gray" className="-mb-3">
                User Name
              </Typography>
              <Input
                size="lg"
                placeholder="userName"
                {...register("name")}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="h4" color="blue-gray" className="-mb-3">
                User Email
              </Typography>
              <Input
                size="lg"
                placeholder="name@mail.com"
                {...register("email", { required: "Email is required" })}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="h4" color="blue-gray" className="-mb-3">
                Password
              </Typography>
              <Input
                type="password"
                size="lg"
                placeholder="********"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Must be at least 8 Charachters!",
                  },
                })}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="h4" color="blue-gray" className="-mb-3">
                Role
              </Typography>

              <Select
                {...register("role")}
                onChange={(value) => {
                  console.log(value);
                  setRole(value);
                }}
              >
                {roles?.map((option) => (
                  <Option key={option._id} value={option._id}>
                    {option.name}
                  </Option>
                ))}
              </Select>
            </div>
            <br />
            <input
              type="submit"
              value="Create User"
              className=" text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl px-8  py-2 transition duration-300 ease-in-out"
            />
          </form>
        </Card>
      </div>
    </>
  );
};

export default CreateUserForm;
