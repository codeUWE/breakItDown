const express = require('express');
const { getWidgetInfo } = require('../controllers/tasks');
const { authenticate } = require('../middlewares/auth');

const { getProject } = require('../middlewares/getProject');

const widgetRouter = express.Router();

widgetRouter.route('/info').get(authenticate, getProject, getWidgetInfo);

module.exports = widgetRouter;
