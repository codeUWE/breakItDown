const test = require('node:test');
const assert = require('node:assert/strict');

const { getTaskStatusFromSubtasks } = require('../utils/taskStatus');

test('getTaskStatusFromSubtasks returns null for empty input', () => {
	assert.equal(getTaskStatusFromSubtasks([]), null);
});

test('getTaskStatusFromSubtasks returns done when all subtasks are done', () => {
	assert.equal(getTaskStatusFromSubtasks(['done', 'done']), 'done');
});

test('getTaskStatusFromSubtasks returns inProgress when some subtasks are done', () => {
	assert.equal(getTaskStatusFromSubtasks(['done', 'backlog']), 'inProgress');
});

test('getTaskStatusFromSubtasks returns backlog when all subtasks are backlog', () => {
	assert.equal(getTaskStatusFromSubtasks(['backlog', 'backlog']), 'backlog');
});

test('getTaskStatusFromSubtasks returns inProgress for mixed non-done statuses', () => {
	assert.equal(getTaskStatusFromSubtasks(['backlog', 'inProgress']), 'inProgress');
});
