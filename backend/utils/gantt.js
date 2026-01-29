const daysToMilliseconds = (days) => days * 24 * 60 * 60 * 1000;

const toValidDate = (value) => {
	if (!value) {
		return null;
	}
	const date = new Date(value);
	return Number.isNaN(date.getTime()) ? null : date;
};

const formatDateForGantt = (date) => {
	if (!date) {
		return null;
	}

	return {
		v: `Date(${date.getFullYear()}, ${date.getMonth()}, ${date.getDate()})`,
	};
};

const buildGanttRow = (task) => {
	const startDate = toValidDate(task.startDate);
	const endDate = toValidDate(task.deadline);
	const totalSubtasks = task.subtasks.length;
	const completedSubtasks = task.subtasks.filter(
		(subtask) => subtask.status === 'done'
	).length;
	const percentComplete =
		totalSubtasks > 0
			? Math.round((completedSubtasks / totalSubtasks) * 100)
			: 0;

	return [
		task._id.toString(),
		task.title,
		formatDateForGantt(startDate),
		formatDateForGantt(endDate),
		startDate && endDate ? null : daysToMilliseconds(3),
		percentComplete,
		null,
	];
};

module.exports = { buildGanttRow, daysToMilliseconds, formatDateForGantt };
