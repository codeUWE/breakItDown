// services/CommentsRequests.js
import axiosClient from '../axiosClient';

const baseUrl = 'http://localhost:3001';

// Get comments by task
export const getCommentsByTask = async (taskId) => {
	try {
		const { data } = await axiosClient.get(`${baseUrl}/comments/${taskId}`);
		return data;
	} catch (error) {
		console.error('Error fetching comments:', error);
		return []; // Gebe ein leeres Array zurück, um Fehler im UI zu vermeiden
	}
};

// Create a new comment
export const createComment = async (payload) => {
	const { data } = await axiosClient.post(`${baseUrl}/comments`, payload, {
		withCredentials: true,
	});
	return data;
};

// Update a comment
export const updateComment = async (id, updates) => {
	const { data } = await axiosClient.put(`${baseUrl}/comments/${id}`, updates, {
		withCredentials: true,
	});
	return data;
};

// Delete a comment
export const deleteComment = async (id) => {
	const { data } = await axiosClient.delete(`${baseUrl}/comments/${id}`, {
		withCredentials: true,
	});
	return data;
};
