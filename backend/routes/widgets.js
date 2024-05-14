const express = require('express');
const { getWidgetInfo } = require('../controllers/tasks');

const widgetRouter = express.Router();

widgetRouter.route('/info').get(getWidgetInfo);

module.exports = widgetRouter;
