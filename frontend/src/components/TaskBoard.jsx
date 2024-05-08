import { useEffect, useState } from 'react';
import { getAllTasks } from '../services/TasksRequests';
import TaskColumn from './TaskColumn';

function TaskBoard() {
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		getAllTasks()
			.then((data) => setTasks(data))
			.catch((error) => console.log(error));
	}, []);

	const todoTasks = tasks.filter((task) => task.status === 'backlog');
	const inProgressTasks = tasks.filter((task) => task.status === 'inProgress');
	const doneTasks = tasks.filter((task) => task.status === 'done');

	return (
		<>
			<div className="w-[1200px] h-[550px] mx-auto rounded-[30px] border-[2px] border-black flex flex-col justify-center items-center bg-[#d0e7e8]">
				<div className="w-full px-8 flex justify-between items-center">
					<h2 className="font-outfit font-[600] text-[32px]"> All Tasks</h2>
					<button className="font-outfit font-[600] text-[18px] text-[#438CDB]">
						filter by
					</button>
				</div>
				<div className="flex justify-center items-center gap-3">
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
		</>
	);
}

export default TaskBoard;
