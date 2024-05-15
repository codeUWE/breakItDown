import axiosClient from '../axiosClient';
import axios from 'axios';

// Get Projects
export const getProject = async () => {
	const { data } = await axiosClient.get('/projects');
	return data;
};

export const getProjectByOwner = async (id) => {
	const { data } = await axiosClient.get(`/projects/users/${id}`);
	console.log(data);
	return data;
};

export const createProject = async (payload) => {
	const { data } = await axiosClient.post(`/projects`, payload);
	return data;
};

//Get roles
export const getRoles = async (query) => {
	const { data } = await axiosClient.get(`/roles?${query}`);
	console.log(data);
	return data;
};

//Get Permissions
export const getPermissions = async () => {
	const { data } = await axiosClient.get('/permissions');
	return data;
};
//Get users
export const getUsers = async () => {
	const { data } = await axiosClient.get('/users');
	return data;
};
// Create User
export const createUser = async (data) => {
	const { userData } = axiosClient.post('/users', data);
	return userData;
};

//Delete User
export const deleteUser = async (id) => {
	const { data } = await axiosClient.delete(`/users/${id}`);
	return data;
};

export const updateUser = async (id, updates) => {
	const { data } = await axiosClient.put(`/users/${id}`, updates);
	return data;
};

// Create User
export const createRole = async (data) => {
	const { userData } = axiosClient.post('/roles', data);
	return userData;
};

//Updating Project Role details
export const updateProjectRole = async (id, updates) => {
	const { data } = await axiosClient.put(`/projects/${id}`, updates);
	return data;
};

//Deleting Project Role details
export const deleteProjectRole = async (id) => {
	const { data } = await axiosClient.delete(`/projects/${id}`);
	return data;
};

//Get All Users
export const getAllUsers = async (query) => {
	const { data } = await axios.get(`http://localhost:3001/users?${query}`, {
		withCredentials: true,
	});
	return data;
};

// Get Roles via id
export const getUsersById = async (id) => {
	const { data } = await axios.get(`http://localhost:3001/users/${id}`, {
		withCredentials: true,
	});
	return data;
};

//Update User
export const updateUsersById = async (id, payload) => {
	const { data } = await axios.put(
		`http://localhost:3001/users/${id}`,
		payload,
		{ withCredentials: true }
	);
	return data;
};

//Delete Role
export const deleteRole = async (id) => {
	const { data } = await axiosClient.delete(`/roles/${id}`);
	return data;
};

export default { getAllUsers, getUsersById };
