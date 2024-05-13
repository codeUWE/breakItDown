const express = require('express');
const {
	createNews,
	getNews,
	updateNews,
	deleteNews,
	getNewsId,
} = require('../controllers/news');

const newsRouter = express.Router();

newsRouter.get('/', getNews);
newsRouter.get('/:id', getNewsId);
newsRouter.post('/', createNews);
newsRouter.put('/:id', updateNews);
newsRouter.delete('/:id', deleteNews);

module.exports = newsRouter;
