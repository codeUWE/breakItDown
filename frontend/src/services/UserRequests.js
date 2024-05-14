import axiosClient from '../axiosClient';
import axios from 'axios';

//Get all roles
export const getRoles = async () => {
	const { data } = await axiosClient.get('/roles');
	// console.log(data)
	return data;
};

//Get All Users
export const getAllUsers = async () => {
	const { data } = await axios.get('http://localhost:3001/users/', {
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
