import SingleTaskLayout from './SingleTaskLayout';

function SingleTaskColumn({ title, tasks }) {
	return (
		<>
			<div className="w-[220px] h-[350px] bg-[#c1e1f5] flex flex-col justify-center items-center gap-2 rounded-[20px]">
				<h3 className="mx-auto font-outfit font-[500] text-[18px]">{title}</h3>
				<div className="h-full w-full mx-auto flex flex-col gap-4 justify-start items-center overflow-auto pb-2 no-scrollbar px-4">
					{tasks.map((task) => (
						<SingleTaskLayout key={task._id} task={task} />
					))}
				</div>
			</div>
		</>
	);
}

export default SingleTaskColumn;
