import { useState, useEffect, useContext } from "react";
import {
  getProjectByOwner,
  createProject,
  updateProject,
} from "../services/UserRequests";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthProvider";

const ManageProjects = () => {
  const navigate = useNavigate();
  const [project, setProject] = useState("");

  const [enteredProject, setEnteredProject] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getProjectByOwner(user._id)
      .then((data) => {
        console.log(data);
        setProject(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleClick = async () => {
    console.log({ title: enteredProject });
    const project = await createProject({ title: enteredProject });
    setProject(project);
    navigate("/admin/dashboard/roles");
  };
  const handleUpdateClick = async () => {
    console.log({ id: project._id }, { title: enteredProject });
    const updatedProject = await updateProject(project._id, {
      title: enteredProject,
    });
    setProject(updatedProject);
    navigate("/admin/dashboard/roles");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex flex-col items-center w-[1000px] h-[670px] mx-auto rounded-[30px]  justify-center  bg-[#EFF9FF] shadow-md mt-10">
        <h1 className="font-outfit font-[600] text-[45px] m-2 ">
          Manage Projects
        </h1>
        <div className="w-full max-w-md">
          <label className="block font-outfit font-[800] text-[20px] mb-5">
            Project:
          </label>
          <div className="flex">
            {project?.title === undefined ? (
              <div className="flex-col">
                <input
                  className=" mt-2 p-2  flex-grow shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  onChange={(e) => setEnteredProject(e.target.value)}
                  placeholder="Enter Project Name"
                />
                <button
                  className="ml-2 text-white bg-indigo-600 hover:bg-indigo-700  font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline"
                  onClick={handleClick}
                >
                  Create Project
                </button>
              </div>
            ) : (
              <div className="flex flex-col">
                <input
                  className=" mt-2 p-2 flex-grow shadow appearance-none border rounded py-2 px-3 w-100 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  onChange={(e) => setEnteredProject(e.target.value)}
                  placeholder={project.title}
                />
                <br />
                {/* <label className="block font-outfit font-[800] text-[20px] mb-5">
                  Total No. Users: 
                </label> */}
                <button
                  className="ml-2 text-white bg-indigo-600 hover:bg-indigo-700  font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline"
                  onClick={handleUpdateClick}
                >
                  Update Project
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageProjects;
