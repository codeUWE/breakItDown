import { useState, useEffect, useContext } from "react";
import CreateUserForm from "./CreateUserForm";
import {
  getProjectByOwner,
  deleteUser,
  updateUser,
} from "../services/UserRequests";
import deleteIcon from "../assets/deleteIcon.png";
import edit from "../assets/edit.png";
import { AuthContext } from "../context/AuthProvider";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // Fetch users from MongoDB when component mounts
    getProjectByOwner(user._id).then((data) => {
      console.log(data);
      setUsers(data.users);
    });
  }, []);

  const handleEditUser = async (userId) => {};

  const handleDeleteUser = async (userId) => {
    // Delete user from MongoDB
    await deleteUser(userId);
    // After deletion, fetch updated list of users and update state
    const updatedUsers = await fetchUsers();
    setUsers(updatedUsers);
  };

  return (
    <div>
      <CreateUserForm setUsers={setUsers} />
      <div className="container mx-auto">
        <h1 className="font-outfit font-[600] mb-4 text-[32px]">
          Registered Users
        </h1>
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 font-outfit font-[600] text-[28px]">
                Username
              </th>
              <th className="px-4 py-2 font-outfit font-[600] text-[28px]">User Email</th>
              <th className="px-4 py-2 font-outfit font-[600] text-[28px]">Role</th>
              <th className="px-4 py-2 font-outfit font-[600] text-[28px] ">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="border px-4 py-2 text-center">{user.name}</td>
                <td className="border px-4 py-2 text-center">{user.email}</td>
                <td className="border px-4 py-2 text-center">
                  {user.role.name}
                </td>
                <td className="border px-4 py-2 text-center">
                  <div className="flex justify-center">
                    <button
                      className="m-3"
                      onClick={(e) => {
                        handleEditUser(user._id);
                      }}
                    >
                      <img src={edit} alt="" width={27} height={27} />
                      Edit
                    </button>
                    <button
                      className="m-3"
                      onClick={(e) => {
                        handleDeleteUser(user._id);
                      }}
                    >
                      <img src={deleteIcon} alt="" width={27} height={27} />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
