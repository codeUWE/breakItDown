import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getRoles } from "../services/UserRequests";
import axiosClient from "../axiosClient";
import {
  Card,
  Input,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";

const AdminDashboard = () => {
  const [project, setProject] = useState("");
  const [role, setRole] = useState("");
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data = { ...data, role };
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
  const handleProjectChange = (event) => {
    setProject(event.target.value);
  };


  useEffect(() => {
    getRoles()
      .then((data) => setRoles(data))

      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <h1 className="text-4xl font-bold text-center text-black-900 my-3 ">
        Welcome to Admin Dashboard
      </h1>
      <div className="w-[1441px] h-[825px] mx-auto rounded-[30px] border-[2px] border-black flex flex-col justify-center items-center my-3">
        <div className="relative flex w-full max-w-[24rem]  justify-center items-center gap-2 rounded-[20px] my-3">
          <Input
            type="Text"
            label="Project Name"
            value={project}
            onChange={handleProjectChange}
            className="pr-20"
            containerProps={{
              className: "min-w-0",
            }}
          />
          <Button
            size="sm"
            color={project ? "gray" : "blue-gray"}
            disabled={!project}
            className="!absolute right-1 top-1 rounded"
            // onClick={handleProjectDetails}
          >
            Add
          </Button>
        </div>

        <div className="flex justify-center items-center gap-3">
          <Card
            className="w-[500px] h-[600px] border-[2px] border-black bg-[#FDFDFD] flex flex-col justify-center items-center gap-2 rounded-[20px]"
            color="transparent"
            shadow={false}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            >
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Project Name: {project}
                </Typography>
                {/* <label >{project}</label> */}
                <Typography variant="h6" color="blue-gray" className="-mb-3">
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
                <Typography variant="h6" color="blue-gray" className="-mb-3">
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
                <Typography variant="h6" color="blue-gray" className="-mb-3">
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
                <Typography variant="h6" color="blue-gray" className="-mb-3">
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
                className=" bg-green-500 hover:bg-green-600 text-white px-8  py-2 transition duration-300 ease-in-out"
              />
            </form>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
