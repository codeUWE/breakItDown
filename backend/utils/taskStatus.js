const getTaskStatusFromSubtasks = (subtaskStatuses) => {
	if (!Array.isArray(subtaskStatuses) || subtaskStatuses.length === 0) {
		return null;
	}

	if (subtaskStatuses.every((status) => status === 'done')) {
		return 'done';
	}

	if (subtaskStatuses.some((status) => status === 'done')) {
		return 'inProgress';
	}

	if (subtaskStatuses.every((status) => status === 'backlog')) {
		return 'backlog';
	}

	return 'inProgress';
};

module.exports = { getTaskStatusFromSubtasks };
