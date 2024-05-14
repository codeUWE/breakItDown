import React, { useState, useEffect } from "react";
import Select from "react-select";
import { getRoles, getPermissions } from "../services/UserRequests";

const ManageRoles = () => {
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    getPermissions().then((data) => {
      setPermissions(data);
    });
    getRoles()
      .then((data) => {
        setRoles(data);
      })

      .catch((error) => {
        console.log("Error fetching roles:", error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add role/ send to backend?
    console.log("Role submitted:", role);
    // Clear the input field after submission
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
      {/* <h1 className="text-2xl font-bold mb-4">Manage Roles</h1>
      <form className="mb-4">
        <label
          htmlFor="role"
          className="block text-sm font-medium text-gray-700"
        >
          Select a Role with Permissions:
        </label>
        <Select
          isMulti={true}
          value={selectedPermissions}
          onChange={handlePermissionChange}
          className="mt-1 block w-full border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm"
          options={options}
          placeholder="Select a permission"
        ></Select>
        <label htmlFor="roleInput">Enter Role:</label>
        <input
          type="text"
          id="roleInput"
          value={role}
          onChange={handleRoleChange}
          placeholder="Enter role..."
        />
        <button type="submit" onClick={handleSubmit}>
          Create Role
        </button>
      </form>

      <div className="overflow-x-auto">
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
      </div> */}
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Manage Roles</h1>
        <form className="mb-4 w-full max-w-md">
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Select a Role with Permissions:
          </label>
          <Select
            isMulti={true}
            value={selectedPermissions}
            onChange={handlePermissionChange}
            className="block w-full border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm mb-2"
            options={options}
            placeholder="Select permissions..."
          />
          <label
            htmlFor="roleInput"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Enter Role:
          </label>
          <div className="flex">
            <input
              type="text"
              id="roleInput"
              value={role}
              onChange={handleRoleChange}
              className="flex-grow border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm"
              placeholder="Enter role..."
            />
            <button
              type="submit"
              onClick={handleSubmit}
              className="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
