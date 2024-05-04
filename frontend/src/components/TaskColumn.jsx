import TaskLayout from './TaskLayout';

function TaskColumn({ title, tasks }) {
	return (
		<>
			<div className="w-[330px] h-[440px] border-[2px] border-black bg-[#FDFDFD] flex flex-col justify-center items-center gap-2 rounded-[20px]">
				<h3 className="mx-auto p-2 font-outfit font-[700] text-[24px]">
					{title}
				</h3>
				<div className="h-full w-full mx-auto flex flex-col gap-2 justify-start items-center overflow-auto pb-2">
					{tasks.map((task) => (
						<TaskLayout key={task._id} task={task} />
					))}
				</div>
			</div>
		</>
	);
}

export default TaskColumn;
