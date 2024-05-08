import SpeechBubble from '../assets/speechBubble.png';
import backlog from '../assets/backlog.png';
import start from '../assets/start.png';
import inProgress from '../assets/inProgress.png';
import done from '../assets/done.png';
import letVerify from '../assets/letVerify.png';

import { Avatar } from '@material-tailwind/react';
import { Tooltip } from '@material-tailwind/react';

function SingleTaskLayout({ task }) {
	function formatDate(dateString) {
		if (!dateString) return ['No ', ' Date'];
		try {
			const date = new Date(dateString);
			if (isNaN(date)) return ['Invalid', 'Date'];
			const formattedDate = new Intl.DateTimeFormat('de-DE', {
				day: '2-digit',
				month: '2-digit',
				year: '2-digit',
			}).format(date);
			return formattedDate.replace(/\./g, '/').split('/');
		} catch (error) {
			console.error('Error while formatting the date:', error);
			return ['Faulty', 'Date'];
		}
	}
	const dateParts = formatDate(task.deadline); // ["15", "04", "24"]

	return (
		<>
			<div className="w-[180px]  rounded-[15px] border-[2px] border-[#363636] flex flex-col">
				<div className="w-full ps-1 pe-1 pt-[4px] ">
					<h2 className="px-1 font-outfit font-[500] text-[15px] row-start-1 col-start-1 col-span-5">
						{task.title}
					</h2>

					<div className="w-[95%] my-1 mx-auto flex justify-end">
						<div>
							<Avatar
								src="https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=1923&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
								alt="avatar"
								className="w-[29px] h-[29px] border-black border-[2px]"
							/>
						</div>
					</div>
				</div>
				<div className="flex  justify-center items-center border-t-[2px] border-black px-1 ">
					{dateParts.map((part, index) => (
						<span
							key={index}
							className="font-outfit text-[16px] font-[400] text-black"
						>
							{part}
							{index !== dateParts.length - 1 && (
								<span className="text-[#FE4A49] font-[600] mx-[2px]">/</span>
							)}
						</span>
					))}
				</div>
			</div>
		</>
	);
}

export default SingleTaskLayout;
