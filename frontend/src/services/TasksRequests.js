import axios from 'axios';

//Get all Tasks
export const getAllTasks = async () => {
	const { data } = await axios.get('http://localhost:3001/tasks');
	return data;
};

// Get Task via id
export const getTaskById = async (id) => {
	const { data } = await axios.get(`http://localhost:3001/tasks/${id}`);
	return data;
};

// Update Task
export const updateTask = async (id, updates) => {
	try {
		const { data } = await axios.put(
			`http://localhost:3001/tasks/${id}`,
			updates
		);
		return data;
	} catch (error) {
		console.error(`Error updating task with id ${id}:`, error);
		throw error;
	}
};

// Delete Task
export const deleteTask = async (id) => {
	try {
		const { data } = await axios.delete(`http://localhost:3001/tasks/${id}`);
		return data;
	} catch (error) {
		console.error(`Error deleting task with id ${id}:`, error);
		throw error;
	}
};

//Get Gantt Data
export const getTasksForGantt = async () => {
	try {
		const { data } = await axios.get('http://localhost:3001/tasks/gantt');
		return data;
	} catch (error) {
		console.error('Error fetching tasks for Gantt:', error);
		throw error;
	}
};
// Update Subtask
export const updateSubtask = async (id, updates) => {
	try {
		const { data } = await axios.put(
			`http://localhost:3001/subtasks/${id}`,
			updates,
			{ withCredentials: true }
		);
		return data;
	} catch (error) {
		console.error(`Error updating subtask with id ${id}:`, error);
		throw error;
	}
};

//Post Subtask
export const createSubtask = async (payload) => {
	const { data } = await axios.post(`http://localhost:3001/subtasks/`, payload);
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
//Assign Subtask
export const assignSubtask = async (id) => {
	const { data } = await axios.patch(
		`http://localhost:3001/subtasks/${id}`,
		{},
		{
			withCredentials: true,
		}
	);
	return data;
};

//Get unassigned Task
export const getUnassignedTasks = async () => {
	const { data } = await axios.get('http://localhost:3001/subtasks/unassigned');
	return data;
};

export default getUnassignedTasks;
