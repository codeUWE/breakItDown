import SingleTaskLayout from './SingleTaskLayout';

function SingleTaskColumn({ title, tasks }) {
	return (
		<>
			<div className="xl:w-[230px] md:w-[220px] xl:h-[400px] lg:h-[368px] md:h-[370px] bg-[#c1e1f5] flex flex-col justify-center items-center gap-2 rounded-[20px] pb-2">
				<h3 className="mx-auto font-outfit font-[500] text-[18px]">{title}</h3>
				<div className="h-full w-full mx-auto flex flex-col xl:gap-4 md:gap-2 justify-start items-center overflow-auto pb-2 no-scrollbar xl:px-4 md:px-2">
					{tasks.map((task) => (
						<SingleTaskLayout key={task._id} task={task} />
					))}
				</div>
			</div>
		</>
	);
}

export default SingleTaskColumn;
