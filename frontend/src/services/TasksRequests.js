import axiosClient from '../axiosClient';

//Get all Tasks
export const getAllTasks = async () => {
	const { data } = await axiosClient.get('/api/tasks');
	return data;
};

// Get Task via id
export const getTaskById = async (id) => {
	const { data } = await axiosClient.get(`/api/tasks/${id}`);
	return data;
};

// Update Task
export const updateTask = async (id, updates) => {
	try {
		const { data } = await axiosClient.put(`/api/tasks/${id}`, updates, {
			withCredentials: true,
		});
		return data;
	} catch (error) {
		console.error(`Error updating task with id ${id}:`, error);
		throw error;
	}
};
//Post Task
export const createTask = async (payload) => {
	const { data } = await axiosClient.post(`/api/tasks/`, payload, {
		withCredentials: true,
	});
	return data;
};

// Delete Task
export const deleteTask = async (id) => {
	try {
		const { data } = await axiosClient.delete(`/api/tasks/${id}`, {
			withCredentials: true,
		});
		return data;
	} catch (error) {
		console.error(`Error deleting task with id ${id}:`, error);
		throw error;
	}
};
// Toggle Task Closed
export const toggleTaskClosed = async (id) => {
	try {
		const { data } = await axiosClient.put(
			`/api/tasks/${id}/toggleClosed`,
			{},
			{ withCredentials: true }
		);
		return data;
	} catch (error) {
		console.error(`Error toggling closed state for task with id ${id}:`, error);
		throw error;
	}
};

//Get Gantt Data
export const getTasksForGantt = async () => {
	try {
		const { data } = await axiosClient.get('/api/tasks/gantt');
		return data;
	} catch (error) {
		console.error('Error fetching tasks for Gantt:', error);
		throw error;
	}
};
// Update Subtask
export const updateSubtask = async (id, updates) => {
	try {
		const { data } = await axiosClient.put(`/api/subtasks/${id}`, updates, {
			withCredentials: true,
		});
		return data;
	} catch (error) {
		console.error(`Error updating subtask with id ${id}:`, error);
		throw error;
	}
};

//Post Subtask
export const createSubtask = async (payload) => {
	const { data } = await axiosClient.post(`/api/subtasks/`, payload, {
		withCredentials: true,
	});
	return data;
};

//Delete Subtask
export const deleteSubtask = async (id) => {
	const { data } = await axiosClient.delete(`/api/subtasks/${id}`, {
		withCredentials: true,
	});
	return data;
};

//Update Subtask
export const update = async (id) => {
	const { data } = await axiosClient.put(`/api/subtasks/${id}`, {
		withCredentials: true,
	});
	return data;
};
// Assign Subtask
export const assignSubtask = async (id) => {
	const { data } = await axiosClient.patch(
		`/api/subtasks/${id}/assign`,
		{},
		{
			withCredentials: true,
		}
	);
	return data;
};

//Get unassigned Subtask
export const getUnassignedTasks = async () => {
	const { data } = await axiosClient.get(`/api/subtasks/unassigned`, {
		withCredentials: true,
	});
	return data;
};

// Get widget information
export const getWidgetInfo = async () => {
	try {
		const { data } = await axiosClient.get('/api/widget/info');

		return data;
	} catch (error) {
		console.error('Error fetching widget info:', error);
		throw error;
	}
};
