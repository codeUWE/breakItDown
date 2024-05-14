import { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import { getTasksForGantt } from '../services/TasksRequests';

// function daysToMilliseconds(days) {
// 	return days * 24 * 60 * 60 * 1000;
// }

const columns = [
	{ type: 'string', label: 'Task ID' },
	{ type: 'string', label: 'Task Name' },
	{ type: 'date', label: 'Start Date' },
	{ type: 'date', label: 'End Date' },
	{ type: 'number', label: 'Duration' },
	{ type: 'number', label: 'Percent Complete' },
	{ type: 'string', label: 'Dependencies' },
];

export default function ProjectProgress() {
	const [data, setData] = useState([columns]);
	const [taskCount, setTaskCount] = useState(0);

	const fetchTasks = async () => {
		try {
			const tasks = await getTasksForGantt();
			setData(tasks);
			setTaskCount(tasks.length - 1); // Subtract 1 to exclude the column headers
		} catch (error) {
			console.error('Error fetching Gantt data:', error);
		}
	};

	useEffect(() => {
		fetchTasks();
	}, []);

	// Dynamically calculate chart height and width with min constraints
	const baseHeight = 100; // Base height
	const taskHeight = 45; // Height per task
	const minHeight = 200; // Minimum chart height
	const calculatedHeight = baseHeight + taskCount * taskHeight;
	console.log(calculatedHeight);

	const baseWidth = 400; // Base width
	const taskWidth = 180; // Width per task (adjust based on estimated chart layout)
	const minWidth = 1190; // Minimum chart width
	const calculatedWidth = baseWidth + taskCount * taskWidth;

	const options = {
		gantt: {
			labelStyle: {
				fontName: 'Outfit',
				fontSize: 16,
				color: '#438CDB',
			},
			trackHeight: 50,
			barCornerRadius: 15,
			barHeight: 25,
			percentEnabled: true,
			criticalPathEnabled: true,
			criticalPathStyle: {
				stroke: '#e64a19',
				strokeWidth: 2,
			},
			arrow: {
				angle: 45,
				width: 2,
				color: '#757575',
				length: 8,
				spaceAfter: 8,
			},
		},
		backgroundColor: {
			fill: '#fff',
		},
	};

	return (
		<>
			<h2 className="font-outfit font-[800] text-[45px] text-start px-20 mt-24 mb-4">
				Project <span className="text-[#681FDE]">Progress</span>
			</h2>
			<div
				className="overflow-auto border border-gray-300 shadow-md rounded-lg"
				style={{
					width: '1200px',
					minHeight: '240px',
					maxHeight: '550px',
					margin: '0 auto',
					background: '#fff',
				}}
			>
				<div className="p-4">
					<Chart
						chartType="Gantt"
						width={`${Math.max(calculatedWidth, minWidth)}px`}
						height={`${Math.max(calculatedHeight, minHeight)}px`}
						data={data}
						options={options}
					/>
				</div>
			</div>
			<div className="mt-20"></div>
		</>
	);
}
