import  { useState, useEffect } from "react";
import { getUsers, deleteUser,updateUser } from "../services/UserRequests"; // Assuming you have an API file for interacting with MongoDB
import deleteIcon from "../assets/deleteIcon.png";
import edit from "../assets/edit.png";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from MongoDB when component mounts
    getUsers().then((data) => {
      setUsers(data);
    });
  }, []);


  const handleEditUser = async(userId) =>{
    
  }

  const handleDeleteUser = async (userId) => {
    // Delete user from MongoDB
    await deleteUser(userId);
    // After deletion, fetch updated list of users and update state
    const updatedUsers = await fetchUsers();
    setUsers(updatedUsers);
  };
  

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Username</th>
            <th className="px-4 py-2">User Email</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="border px-4 py-2">{user.username}</td>
              <td className="border px-4 py-2">{user.userEmail}</td>
              <td className="border px-4 py-2">{user.role}</td>
              <td className="border px-4 py-2">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={ handleEditUser(user._id)}>
                  <img src={edit} alt="" width={27} height={27} />
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={ handleDeleteUser(user._id)}
                >
                  <img src={deleteIcon} alt="" width={27} height={27} />
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
