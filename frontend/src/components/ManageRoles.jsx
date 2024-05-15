import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import {
  getRoles,
  createRole,
  getPermissions,
  getProjectByOwner,
} from "../services/UserRequests";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthProvider";

const ManageRoles = () => {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getPermissions().then((data) => {
      setPermissions(data);
    });
    getProjectByOwner(user._id)
      .then((data) => {
        console.log(data);
        setRoles(data.roles);
      })

      .catch((error) => {
        console.log("Error fetching roles:", error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    createRole({
      name: role,
      permissions: selectedPermissions.map((permission) => {
        return permission.value;
      }),
    }).then((data) => {
      setRoles((prev) => {
        console.log([...prev, data]);
        return [...prev, data];
      });
    });

    // navigate("/admin/dashboard/users");

    setRole("");
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  // Function to handle option selection
  const handlePermissionChange = (selectedOption) => {
    setSelectedPermissions(selectedOption);
  };

  // Map permissions data to format accepted by react-select
  const options = permissions.map((permission) => ({
    value: permission._id,
    label: permission.name,
  }));

  return (
    <>
      <div className="flex flex-col items-center w-[1000px] h-[670px] mx-auto rounded-[30px]  justify-center  bg-[#EFF9FF] shadow-md mt-10">
        <h1 className="font-outfit font-[600] text-[45px] m-2">Manage Roles</h1>
        <form className="mb-4 w-full max-w-md">
          <label
            htmlFor="role"
            className="font-outfit font-[500] text-[20px]  my-2"
            // "block text-sm font-medium text-gray-700 mb-2"
          >
            Select a Role with Permissions:
          </label>
          <br />
          <Select
            isMulti={true}
            value={selectedPermissions}
            onChange={handlePermissionChange}
            className="block w-full border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm m-4"
            options={options}
            placeholder="Select permissions..."
          />
          <label
            htmlFor="roleInput"
            className="font-outfit font-[500] text-[20px]  my-2"
            // "block text-sm font-medium text-gray-700 mb-2"
          >
            Enter Role:
          </label>
          <div className="flex ">
            <input
              type="text"
              id="roleInput"
              value={role}
              onChange={handleRoleChange}
              className="mt-2 p-2 border flex-grow border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-2xl shadow-sm"
              placeholder="Enter role..."
            />
            <button
              type="submit"
              onClick={handleSubmit}
              className="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-2xl shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Role
            </button>
          </div>
        </form>

        <div className="overflow-x-auto w-full max-w-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {roles.map((item) => (
                <tr key={item._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ManageRoles;
