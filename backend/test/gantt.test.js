const test = require('node:test');
const assert = require('node:assert/strict');

const { buildGanttRow, daysToMilliseconds } = require('../utils/gantt');

test('buildGanttRow formats dates and calculates percent complete', () => {
	const task = {
		_id: 'abc123',
		title: 'My Task',
		startDate: '2024-01-01',
		deadline: '2024-01-03',
		subtasks: [{ status: 'done' }, { status: 'backlog' }],
	};

	const row = buildGanttRow(task);

	assert.equal(row[0], 'abc123');
	assert.equal(row[1], 'My Task');
	assert.deepEqual(row[2], { v: 'Date(2024, 0, 1)' });
	assert.deepEqual(row[3], { v: 'Date(2024, 0, 3)' });
	assert.equal(row[4], null);
	assert.equal(row[5], 50);
	assert.equal(row[6], null);
});

test('buildGanttRow handles missing dates with default duration', () => {
	const task = {
		_id: 'def456',
		title: 'No Dates',
		startDate: null,
		deadline: null,
		subtasks: [],
	};

	const row = buildGanttRow(task);

	assert.equal(row[0], 'def456');
	assert.equal(row[2], null);
	assert.equal(row[3], null);
	assert.equal(row[4], daysToMilliseconds(3));
	assert.equal(row[5], 0);
});
