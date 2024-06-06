import { Avatar } from '@material-tailwind/react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';

function SingleTaskLayout({ task }) {
	const { isLoading, user } = useContext(AuthContext);

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
	const dateParts = formatDate(task.deadline);

	return (
		<>
			<div className="xl:w-[200px] md:w-full rounded-lg bg-[#DAF0FD] flex flex-col">
				<div className="ps-2 pe-2 pt-[4px]">
					<h2 className="px-1 font-outfit font-[500] text-[15px] row-start-1 col-start-1 col-span-5">
						{task.title}
					</h2>

					<div className="w-[95%] my-1 mx-auto flex justify-end md:hidden">
						{task.assignee ? (
							<Avatar
								src={
									task.assignee
										? task.assignee.profilePicture
										: 'https://cdn-icons-png.flaticon.com/128/552/552848.png'
								}
								alt="Assignee's Avatar"
								className="w-[35px] h-[35px]"
							/>
						) : (
							<span className="font-outfit text-[14px]">Not assigned</span>
						)}
					</div>
				</div>
				<div className="flex justify-center items-center border-t-[1px] border-[#00000067] px-1 mt-2 ">
					{dateParts.map((part, index) => (
						<span
							key={index}
							className="font-outfit text-[14px] font-[400] text-[#0000007f]"
						>
							{part}
							{index !== dateParts.length - 1 && (
								<span className="text-[#fe4949be] font-[600] mx-[2px]">/</span>
							)}
						</span>
					))}
				</div>
			</div>
		</>
	);
}

export default SingleTaskLayout;
