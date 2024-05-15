import React from 'react';
import axiosClient from '../axiosClient';

const BASE_URL = 'http://localhost:3001/news';

// Create a news item
export const createNews = async (newsData) => {
	try {
		const response = await axiosInstance.post('/api/news', newsData);
		console.log('Create News Response:', response.data); // Logging the response data
		return response.data;
	} catch (error) {
		console.error('Error creating news:', error);
		throw error;
	}
};

// Get all news items
export const getNews = async (userId) => {
	try {
		const response = await axiosInstance.get(`/api/news/?userId=${userId}`);
		return response.data.map((post) => ({
			...post,
			user: {
				name: post.name, //
				profilePicture: post.profilePicture, //
			},
			body: post.body, // Adding the body field
		}));
	} catch (error) {
		console.error('Error fetching news for user:', error);
		throw error;
	}
};

// Update a news item by ID
export const updateNews = async (id, newsData) => {
	try {
		const response = await axiosInstance.put(`${id}`, newsData);
		console.log('Update News Response:', response.data); //
		return response.data;
	} catch (error) {
		console.error('Error updating news:', error);
		throw error;
	}
};

/// Delete a news item by ID
export const deleteNews = async (id) => {
	try {
		console.log('ID:', id); // Log the id variable
		const response = await axiosClient.delete(`/${id}`); //
		console.log('Delete News Response:', response.data); //
		return response.data;
	} catch (error) {
		console.error('Error deleting news:', error);
		throw error;
	}
};

// // Delete a comment
// export const deleteComment = async (id) => {
// 	const { data } = await axiosClient.delete(`${baseUrl}/comments/${id}`, {
// 		withCredentials: true,
// 	});
// 	return data;
// };

// Get a news item by ID
export const getNewsById = async (id) => {
	try {
		const response = await axiosInstance.get(`/${id}`);
		const post = response.data;
		return {
			...post,
			user: {
				name: post.name,
				profilePicture: post.profilePicture,
			},
			body: post.body,
		};
	} catch (error) {
		console.error('Error fetching news by ID:', error);
		throw error;
	}
};

export default { getNewsById, deleteNews, updateNews, getNews, createNews };
