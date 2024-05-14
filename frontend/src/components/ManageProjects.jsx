import { useState, useEffect, useContext } from "react";
import { getProjectByOwner, createProject } from "../services/UserRequests";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/AuthProvider";

const ManageProjects = () => {
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
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* <h1>Manage Projects</h1>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Project:
      </label>
      <div>
        <input
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          // id="projectname"
          // value={project?.title ? project.title : ""}
          type="text"
          onChange={(e) => setEnteredProject(e.target.value)}
          placeholder="Enter your Project Name"
        />
        {project?.title === undefined ? (
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleClick}
          >
            Create Project
          </button>
        ) : (
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleClick}
          >
            Update Project
          </button>
        )}
      </div> */}

      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6">Manage Projects</h1>
        <div className="w-full max-w-md">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Project:
          </label>
          <div className="flex">
            <input
              className="flex-grow shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              onChange={(e) => setEnteredProject(e.target.value)}
              placeholder="Enter your Project Name"
            />
            {project?.title === undefined ? (
              <button
                className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleClick}
              >
                Create Project
              </button>
            ) : (
              <button
                className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleClick}
              >
                Update Project
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageProjects;
