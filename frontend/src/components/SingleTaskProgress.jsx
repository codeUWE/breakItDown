import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getTaskById } from '../services/TasksRequests';
import SingleTaskColumn from './SingleTaskColumn';

function SingleTaskProgress() {
	const { id } = useParams();
	const [task, setTask] = useState(null);

	useEffect(() => {
		getTaskById(id)
			.then((data) => setTask(data))
			.catch((error) => console.log(error));
	}, [id]);

	if (!task) return <div>Loading...</div>;

	const todoSubtasks = task.subtasks.filter(
		(subtask) => subtask.status === 'backlog'
	);
	const inProgressSubtasks = task.subtasks.filter(
		(subtask) => subtask.status === 'inProgress'
	);
	const doneSubtasks = task.subtasks.filter(
		(subtask) => subtask.status === 'done'
	);
	const getStatus = (status) => {
		if (status === 'backlog') {
			return <span className="text-[#575761]">To Do</span>;
		}
		if (status === 'inProgress') {
			return <span className="text-[#C07A19]">In Progress</span>;
		}
		if (status === 'done') {
			return <span className="text-[#08A045]">Done</span>;
		}
	};

	return (
		<>
			<div className="xl:w-[95%]  h-full mx-auto rounded-[30px] flex flex-col justify-center items-center gap-2 lg:p-2">
				<div className="w-full px-1 flex justify-between items-center">
					<h2 className="font-outfit font-[600] text-[24px] text-[#363636]">
						Task Progress: {getStatus(task.status)}
					</h2>
					<div className="flex gap-3 items-center">
						<h2 className="font-outfit font-[400] text-[16px] pt-[6px] mx-auto">
							Subtasks done:
						</h2>
						<h4 className="font-outfit font-[400] text-[16px] pt-[6px] mx-auto">
							{task.progress}
						</h4>
					</div>
				</div>
				<div className="h-full w-full flex justify-center lg:items-center md:items-stretch gap-3">
					<SingleTaskColumn title={'To Do'} tasks={todoSubtasks} />
					<SingleTaskColumn title={'In Progress'} tasks={inProgressSubtasks} />
					<SingleTaskColumn title={'Done'} tasks={doneSubtasks} />
				</div>
			</div>
		</>
	);
}

export default SingleTaskProgress;
