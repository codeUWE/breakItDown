import { useEffect, useState } from 'react';
import { getAllTasks, createTask } from '../services/TasksRequests';
import TaskColumn from './TaskColumn';
import AddTaskDialog from './AddTaskDialog';
import { useNavigate } from 'react-router-dom';
import { hasPermission } from '../services/utils';
//userIntegration
import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';

import plus from '../assets/plus.png';

function TaskBoard() {
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();
	const [tasks, setTasks] = useState([]);
	const [addOpen, setAddOpen] = useState(false);
	const [view, setView] = useState('My Tasks');

	useEffect(() => {
		getAllTasks()
			.then((data) => setTasks(data))
			.catch((error) => console.log(error));
	}, []);

	const todoTasks = tasks.filter((task) => task.status === 'backlog');
	const inProgressTasks = tasks.filter((task) => task.status === 'inProgress');
	const doneTasks = tasks.filter((task) => task.status === 'done');

	const handleAddOpen = () => {
		setAddOpen(true);
	};

	const handleAddClose = () => {
		setAddOpen(false);
	};

	const handleTaskAdded = (newTask) => {
		setTasks([...tasks, newTask]);
	};

	const handleViewChange = (e) => {
		const selectedView = e.target.value;
		setView(selectedView);
		if (selectedView === 'Project Progress') {
			navigate('/tasks/progress'); // Verwenden von `navigate` von `react-router-dom`
		}
	};

	return (
		<>
			<div className="w-full flex items-center justify-between mt-5">
				<h2 className="font-outfit font-[700] tracking-tighter  xl:text-[45px] md:text-[35px] text-start mb-2">
					Team <span className="text-[#681FDE]">Board</span>
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
						Task Board
					</option>
					<option
						className="font-outfit font-[500] text-[20px]"
						value="Project Progress"
					>
						Project Progress
					</option>
				</select>
			</div>

			<div className="w-full h-full rounded-3xl flex flex-col justify-center items-center bg-[#EFF9FF] mb-5">
				<div className="w-full px-6 pt-4 flex justify-between items-center mb-3">
					<h2 className="font-outfit font-[600]  text-[32px]">All Tasks</h2>
					{hasPermission(user.role.permissions, ['addTicket']) ? (
						<button
							onClick={handleAddOpen}
							className="py-1 px-4 bg-[#575761] text-white rounded-2xl flex items-center gap-2 shadow-md"
						>
							<img src={plus} alt="Add Subtask" width={12} />
							Add Task
						</button>
					) : (
						''
					)}
				</div>
				<div className="w-full flex lg:flex-row lg:justify-center lg:items-center xl:gap-4 lg:gap-3 xl:pb-3 md:flex-col">
					<TaskColumn
						title={'To Do'}
						tasks={todoTasks}
						className="bg-[#d0e7e8]"
					/>
					<TaskColumn
						title={'In Progress'}
						tasks={inProgressTasks}
						className="bg-[#d0e7e8]"
					/>
					<TaskColumn
						title={'Done'}
						tasks={doneTasks}
						className="bg-[#d0e7e8]"
					/>
				</div>
			</div>
			<AddTaskDialog
				open={addOpen}
				onClose={handleAddClose}
				onUpdate={handleTaskAdded}
			/>
		</>
	);
}

export default TaskBoard;
