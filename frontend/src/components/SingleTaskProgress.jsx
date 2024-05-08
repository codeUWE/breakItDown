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

	return (
		<>
			<div className="w-full h-full mx-auto rounded-[30px] border-[2px] border-[#363636] flex flex-col justify-center items-center gap-2 p-2">
				<div className="w-full px-2 flex justify-between items-center">
					<h2 className="font-outfit font-[600] text-[20px] text-[#363636]">
						Task Progress: {task.title}
					</h2>
					<div className="flex gap-3 items-center">
						<h2 className="font-outfit font-[400] text-[16px] pt-[6px] mx-auto">
							Subtasks <span className="font-[500] text-[#218348]">done</span>:{' '}
						</h2>
						<h4 className="font-outfit font-[400] text-[16px] pt-[6px] mx-auto">
							{task.progress}
						</h4>
					</div>
				</div>
				<div className="h-full flex justify-center items-center gap-3">
					<SingleTaskColumn title={'To Do'} tasks={todoSubtasks} />
					<SingleTaskColumn title={'In Progress'} tasks={inProgressSubtasks} />
					<SingleTaskColumn title={'Done'} tasks={doneSubtasks} />
				</div>
			</div>
		</>
	);
}

export default SingleTaskProgress;
