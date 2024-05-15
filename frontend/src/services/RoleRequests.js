import axiosClient from '../axiosClient';

// Get Roles via id
export const getRoleById = async (id) => {
	const { data } = await axiosClient.get(`http://localhost:3001/roles/${id}`);
	return data;
};

//Get All roles
export const getAllRoles = async () => {
	const { data } = await axiosClient.get('http://localhost:3001/roles/');
	return data;
};

export default { getAllRoles, getRoleById };
