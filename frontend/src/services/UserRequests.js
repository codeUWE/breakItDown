import axiosClient from '../axiosClient';
import axios from 'axios';

//Get all roles
export const getRoles = async () => {
	const { data } = await axiosClient.get('/roles');
	return data;
};

//Get all Users
export const getAllUsers = async () => {
	const { data } = await axios.get('http://localhost:3001/users');
	return data;
};
