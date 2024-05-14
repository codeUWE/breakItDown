import TaskLayout from './TaskLayout';

function TaskColumn({ title, tasks, className }) {
	return (
		<>
			<div
				className={`${className} w-[450px] h-[580px]  bg-[#d4ecfc] flex flex-col justify-center items-center gap-2 rounded-[30px]`}
			>
				<h3 className="mx-auto p-2 font-outfit font-[600] text-[28px]">
					{title}
				</h3>
				<div className="h-full w-full overflow-scroll no-scrollbar pb-5">
					<div className="mx-auto  flex flex-col gap-3 justify-start items-center overflow-scroll pb-[14px] no-scrollbar">
						{tasks.map((task) => (
							<TaskLayout key={task._id} task={task} />
						))}
					</div>
				</div>
			</div>
		</>
	);
}

export default TaskColumn;
