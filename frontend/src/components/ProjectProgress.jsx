import { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import { getTasksForGantt } from '../services/TasksRequests';
import { useNavigate } from 'react-router-dom';

function daysToMilliseconds(days) {
	return days * 24 * 60 * 60 * 1000;
}

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

	const baseHeight = 150; // Base height
	const taskHeight = 50; // Height per task
	const minHeight = 550; // Minimum chart height
	const calculatedHeight = baseHeight + taskCount * taskHeight;

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
			fill: '#EFF9FF',
		},
		hAxis: {
			allowScroll: true,
		},
		chartArea: {
			width: '100%',
			height: '100%',
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
			<div className="w-[97%] mx-auto flex justify-between items-center mt-10">
				<h2 className="font-outfit font-[800] xl:text-[45px] md:text-[35px] text-start tracking-tighter mb-2">
					Project <span className="text-[#681FDE]">Progress</span>
				</h2>
				<select
					value={view}
					onChange={handleViewChange}
					className=" mt-4 mb-4 px-4 py-2 bg-[#5D737E] rounded-[30px] font-outfit font-[500] text-[24px] text-[#fff] shadow-md "
				>
					<option
						className="font-outfit font-[500] text-[20px]"
						value="My Tasks"
					>
						Team Board
					</option>
					<option
						className="font-outfit font-[500] text-[20px]"
						value="Project Progress"
					>
						Project Progress
					</option>
				</select>
			</div>
			<div className="overflow-x-auto w-[97%] mx-auto flex justify-center bg-[#EFF9FF] rounded-[30px] ">
				<div className="p-4 min-w-[800px] md:min-w-[800px] lg:min-w-[1000px] xl:min-w-[1200px]">
					<Chart
						chartType="Gantt"
						data={data}
						options={options}
						width="100%"
						height={`${
							calculatedHeight > minHeight ? calculatedHeight : minHeight
						}px`}
					/>
				</div>
			</div>
			<div className="mt-20"></div>
		</>
	);
}
