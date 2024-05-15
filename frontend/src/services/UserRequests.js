import axiosClient from '../axiosClient';

export const updateProject = async (id, updates) => {
	const { data } = await axiosClient.put(`/projects/${id}`, updates);
	return data;
};

// Get Projects
export const getProject = async () => {
	const { data } = await axiosClient.get('/api/projects');
	return data;
};

export const getProjectByOwner = async (id) => {
	const { data } = await axiosClient.get(`/api/projects/users/${id}`);
	console.log(data);
	return data;
};

export const createProject = async (payload) => {
	const { data } = await axiosClient.post(`/api/projects`, payload);
	return data;
};

//Get roles
export const getRoles = async (query) => {
	const { data } = await axiosClient.get(`/api/roles?${query}`);
	console.log(data);
	return data;
};

//Get Permissions
export const getPermissions = async () => {
	const { data } = await axiosClient.get('/api/permissions');
	return data;
};
//Get users
export const getUsers = async () => {
	const { data } = await axiosClient.get('/api/users');
	return data;
};
// Create User
export const createUser = async (payload) => {
	const { data } = await axiosClient.post('/api/users', payload);
	return data;
};

//Delete User
export const deleteUser = async (id) => {
	const { data } = await axiosClient.delete(`/api/users/${id}`);
	return data;
};

export const updateUser = async (id, updates) => {
	const { data } = await axiosClient.put(`/api/users/${id}`, updates);
	return data;
};

// Create Role
export const createRole = async (payload) => {
	const { data } = await axiosClient.post('/api/roles', payload);
	return data;
};

//Updating Project Role details
export const updateProjectRole = async (id, updates) => {
	const { data } = await axiosClient.put(`/api/projects/${id}`, updates);
	return data;
};

//Deleting Project Role details
export const deleteProjectRole = async (id) => {
	const { data } = await axiosClient.delete(`/api/projects/${id}`);
	return data;
};

//Get All Users
export const getAllUsers = async (query) => {
	const { data } = await axiosClient.get(`/api/users?${query}`, {
		withCredentials: true,
	});
	return data;
};

// Get Roles via id
export const getUsersById = async (id) => {
	const { data } = await axiosClient.get(`/api/users/${id}`, {
		withCredentials: true,
	});
	return data;
};

//Update User
export const updateUsersById = async (id, payload) => {
	const { data } = await axiosClient.put(`/api/users/${id}`, payload, {
		withCredentials: true,
	});
	return data;
};

//Delete Role
export const deleteRole = async (id) => {
	const { data } = await axiosClient.delete(`/api/roles/${id}`);
	return data;
};

export default { getAllUsers, getUsersById };
