/* eslint-disable react/prop-types */
import SpeechBubble from '../assets/speechBubble.png';
import stepInto from '../assets/stepInto.png';
import { Avatar, Tooltip } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';

function TaskLayout({ task }) {
	const navigate = useNavigate();

	const formatDate = (dateString) => {
		if (!dateString) return 'Invalid Date';
		try {
			const date = new Date(dateString);
			const monthShortNames = [
				'Jan',
				'Feb',
				'Mar',
				'Apr',
				'May',
				'Jun',
				'Jul',
				'Aug',
				'Sep',
				'Oct',
				'Nov',
				'Dec',
			];
			let day = date.getDate().toString();
			day = day.padStart(2, '0');
			const month = monthShortNames[date.getMonth()];

			return `${month} ${day}`;
		} catch (error) {
			console.error('Error while formatting the date:', error);
			return 'Invalid Date';
		}
	};

	console.log('Received date:', task.deadline);

	return (
		<>
			<div className="w-[350px] h-[155px] rounded-[20px] border-[2px] border-black  flex bg-white">
				<div className="flex flex-col w-[60px] justify-center items-center border-e-2 border-black  bg-red-600 text-white rounded-s-[18px]">
					<h2 className="m-0 font-outfit font-[700] text-[16px]">
						{formatDate(task.deadline).split(' ')[0]}
					</h2>
					<h2 className="m-0 font-outfit font-[700] text-[24px] leading-none tracking-tighter">
						{formatDate(task.deadline).split(' ')[1]}
					</h2>
				</div>
				<div className="w-full grid grid-rows-4 grid-col-6 ps-3 pe-1 pt-[4px] pb-[10px]">
					<Tooltip
						content={task.title}
						className="bg-[#363636] text-[12px] font-outfit font-[600] p-1 px-2 rounded-3xl"
					>
						<h2 className="font-outfit font-[500] text-[20px] row-start-1 col-start-1 col-span-5 truncate ">
							{task.title}
						</h2>
					</Tooltip>

					<h3 className="font-outfit font-[300] text-[13px] row-start-2 row-end-2 col-start-1 col-span-4 tracking-tight mt-1  ">
						{task.description}
					</h3>
					<img
						src={SpeechBubble}
						alt="Icon of a speech bubble"
						width={29}
						height={29}
						className="row-start-4 col-start-1"
					/>
					<div className="w-[60px] row-start-4 col-start-4 col-span-2 mx-auto">
						<div className="w-[60px] w-max-[67px] h-[30px] h-max-[30px] flex justify-end relative ">
							<Avatar
								src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
								alt="avatar"
								className="w-[29px] h-[29px] absolute top-0 left-0 z-50"
							/>
							<Avatar
								src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
								alt="avatar"
								className="w-[29px] h-[29px] absolute  top-0 left-[15px] z-40"
							/>
							<Avatar
								src="https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=1923&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
								alt="avatar"
								className="w-[29px] h-[29px] absolute  top-0 left-[30px]"
							/>
						</div>
					</div>

					<img
						src={stepInto}
						alt="icon step into"
						width={24}
						height={24}
						className="row-start-2 row-end-4 col-start-6 ms-4 mt-5"
						onClick={() => navigate(`/tasks/${task._id}`)}
					/>
					<h4 className="font-outfit font-[400] text-[12px] pt-[6px] row-start-1 col-start-6 mx-auto">
						{task.progress}
					</h4>
				</div>
			</div>
		</>
	);
}

export default TaskLayout;
