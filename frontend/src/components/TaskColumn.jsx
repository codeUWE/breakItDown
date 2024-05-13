import TaskLayout from './TaskLayout';

function TaskColumn({ title, tasks, className }) {
	return (
		<>
			<div
				className={`${className} w-[440px] h-[470px]  bg-[#d4ecfc] flex flex-col justify-center items-center gap-2 rounded-[30px]`}
			>
				<h3 className="mx-auto p-2 font-outfit font-[700] text-[24px]">
					{title}
				</h3>
				<div className="h-full w-full mx-auto  flex flex-col gap-3 justify-start items-center overflow-scroll pb-[14px] no-scrollbar">
					{tasks.map((task) => (
						<TaskLayout key={task._id} task={task} />
					))}
				</div>
			</div>
		</>
	);
}

export default TaskColumn;
