import speechBubble from '../assets/speechBubble.png';
import done from '../assets/done.png';
import assign from '../assets/assign.png';
import start from '../assets/start.png';
import { Avatar } from '@material-tailwind/react';
// import { formatDate } from '../services/TimeFormatter';

function SingleTaskSubtask({ subtask }) {
	const { title, description, status, priority, assignee, deadline } = subtask;

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

	const dateParts = formatDate(deadline); // ["15", "04", "24"]

	return (
		<>
			<div className="w-full h-[125px] flex flex-col px-6 gap-2 my-4">
				<div className="w-full flex justify-between items-center">
					<div className="w-[500px] h-max-[40px] ">
						<h2 className="font-outfit text-[24px] font-[500] text-[#5a5a5a] ">
							{title}
						</h2>
						<p className=" font-outfit text-[16px] font-[300] text-[#5a5a5a] text-ellipsis">
							{description}
						</p>
					</div>
					<div className="flex flex-col justify-center items-center gap-2 ">
						<Avatar
							src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							alt="avatar"
							className="w-[30px] h-[30px]"
						/>
						<img
							src={speechBubble}
							alt="comments icon"
							width={30}
							height={30}
						/>
					</div>
				</div>
				<div className="w-full flex justify-between items-center ">
					<div className="flex justify-center items-center gap-3">
						<h3 className="font-outfit text-[14px] font-[500] text-[#5a5a5a]">
							Deadline:{' '}
							{dateParts.map((part, index) => (
								<span key={index}>
									{index !== 0 && (
										<span className="font-[500] mx-[2px] text-[#FE4A49] ">
											/
										</span>
									)}
									{part}
								</span>
							))}
						</h3>
						<h3 className="font-outfit text-[15px] font-[700] text-[#5a5a5a] w-16 text-center ">
							{priority}
						</h3>
						<button className="font-outfit font-[200] text-[13px] text-white w-[76px] h-[19px] bg-[#5a5a5a] rounded-[20px] flex justify-center items-center gap-1 ">
							<div className="w-[3px] h-[3px] rounded-full bg-white "></div>
							<h4>{status}</h4>
						</button>
					</div>
					<div className="flex justify-center items-center gap-3">
						<img
							src={start}
							alt=""
							width={27}
							height={27}
							className="p-[2px]"
						/>
						<img src={done} alt="" width={27} height={27} />
						<img
							src={assign}
							alt=""
							width={27}
							height={27}
							className="pb-[3px] "
						/>
						<button className="font-outfit font-[200] text-[13px] text-[#5a5a5a] w-[76px] h-[19px] bg-[#fffaed] rounded-[20px] ">
							<h4>see more</h4>
						</button>
					</div>
				</div>
				<div className="w-full border-[1px] border-[#363636]"></div>
			</div>
		</>
	);
}

export default SingleTaskSubtask;
