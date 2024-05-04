import axios from 'axios';

//Get all Tasks
export const getAllTasks = async () => {
	const { data } = await axios.get('http://localhost:3001/tasks');
	return data;
};
//Get Task via id
export const getTaskById = async (id) => {
	const { data } = await axios.get(`http://localhost:3001/tasks/${id}`);
	return data;
};

//Get unassigned Task
export const getUnassignedTasks = async () => {
	const { data } = await axios.get(`http://localhost:3001/tasks/unassigned`);
	console.log(data);
	return data;
};

