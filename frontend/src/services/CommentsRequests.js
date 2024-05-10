// services/CommentsRequests.js
import axios from 'axios';

const baseUrl = 'http://localhost:3001';

// Get comments by task
export const getCommentsByTask = async (taskId) => {
	const { data } = await axios.get(`${baseUrl}/comments/${taskId}`);
	return data;
};

// Create a new comment
export const createComment = async (payload) => {
	const { data } = await axios.post(`${baseUrl}/comments`, payload);
	return data;
};

// Update a comment
export const updateComment = async (id, updates) => {
	const { data } = await axios.put(`${baseUrl}/comments/${id}`, updates);
	return data;
};

// Delete a comment
export const deleteComment = async (id) => {
	const { data } = await axios.delete(`${baseUrl}/comments/${id}`);
	return data;
};
