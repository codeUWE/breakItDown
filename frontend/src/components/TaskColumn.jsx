import TaskLayout from './TaskLayout';

function TaskColumn({ title, tasks, className }) {
	return (
		<>
			<div
				className={`${className} xl:w-[32%]  lg:w-[31.5%] lg:p-3 bg-[#d4ecfc] flex flex-col justify-center items-center xl:gap-2 rounded-3xl md:w-[97%] md:mx-auto xl:mb-0 lg:mx-0 md:mb-3 md:pb-4 md:pt-2 md:px-2 md:max-h-[450px] lg:h-[440px] xl:min-h-[530px] xl:max-h-[530px]`}
			>
				<h3 className="mx-auto xl:p-0 font-outfit font-[600] text-[28px]">
					{title}
				</h3>
				<div className="h-full w-full overflow-scroll no-scrollbar">
					<div className="mx-auto  flex flex-col gap-3 justify-start items-center overflow-scroll no-scrollbar md:pt-2 xl:pb-2">
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
