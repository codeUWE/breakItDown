import { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import { getTasksForGantt } from '../services/TasksRequests';
import { useNavigate } from 'react-router-dom';

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
	const navigate = useNavigate();
	const [data, setData] = useState([columns]);
	const [taskCount, setTaskCount] = useState(0);
	const [view, setView] = useState('Project Progress');

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
	const baseHeight = 150; // Base height
	const taskHeight = 50; // Height per task
	const minHeight = 550; // Minimum chart height
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
		hAxis: {
			// Enable scrolling for horizontal axis
			allowScroll: true,
		},
		// Additional option for vertical scrollbar
		chartArea: {
			width: '1180px', // Adjust width to accommodate scrollbar
			height: '480px', // Adjust height as needed
		},
	};

	const handleViewChange = (e) => {
		const selectedView = e.target.value;
		setView(selectedView);
		if (selectedView === 'My Tasks') {
			navigate('/tasks/');
		}
	};

	return (
		<>
			<div className="w-full flex justify-end">
				<select
					value={view}
					onChange={handleViewChange}
					className="mx-20 mt-4 mb-4 px-4 py-2 bg-[#6A7EA3] rounded-[30px] font-inter font-[800] text-[28px] text-white  "
				>
					<option className="font-inter font-[800] " value="My Tasks">
						My Tasks
					</option>
					<option className="font-inter font-[800] " value="Project Progress">
						Project Progress
					</option>
				</select>
			</div>
			<h2 className="font-outfit font-[800] text-[45px] text-start px-20 mb-2">
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
						data={data}
						options={options}
						width="1200px"
						height="500px"
					/>
				</div>
			</div>
			<div className="mt-20"></div>
		</>
	);
}
