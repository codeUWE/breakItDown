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


//Update Subtask Status
export const updateSubtask = async (id, updates) => {
	const { data } = await axios.put(
		`http://localhost:3001/subtasks/${id}`,
		updates
	);
	return data;
};

//Delete Subtask
export const deleteSubtask = async (id) => {
	const { data } = await axios.delete(`http://localhost:3001/subtasks/${id}`);
	return data;
};
//Update Subtask
export const update = async (id) => {
	const { data } = await axios.put(`http://localhost:3001/subtasks/${id}`);
	return data;
};

//Get unassigned Task
export const getUnassignedTasks = async () => {
	const { data } = await axios.get(`http://localhost:3001/tasks/unassigned`);
	console.log(data);
	return data;
};


