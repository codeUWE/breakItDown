import { useParams } from 'react-router-dom';
import { getTaskById } from '../services/TasksRequests';
import { useEffect, useState } from 'react';
import SingleTaskSubtask from './SingleTaskSubtask';

import Sent from '../assets/sent.png';
import SpeechBubble from '../assets/speechBubble.png';

function SingleTaskBoard() {
	const { id } = useParams();
	const [task, setTask] = useState(null);
	const [activeTab, setActiveTab] = useState('subtasks');

	const currentUser = { _id: 'currentUserId' };

	const handleTabChange = (tab) => {
		setActiveTab(tab);
	};

	const handleSubtaskUpdate = (updatedSubtask) => {
		setTask((prevTask) => {
			const newSubtasks = prevTask.subtasks.map((subtask) =>
				subtask._id === updatedSubtask._id ? updatedSubtask : subtask
			);
			return {
				...prevTask,
				subtasks: newSubtasks.sort(
					(a, b) => new Date(a.deadline) - new Date(b.deadline)
				),
			};
		});
	};

	const handleSubtaskDelete = (subtaskId) => {
		const filteredSubtasks = task.subtasks.filter(
			(subtask) => subtask._id !== subtaskId
		);
		setTask({ ...task, subtasks: filteredSubtasks });
	};

	useEffect(() => {
		getTaskById(id)
			.then((data) => setTask(data))
			.catch((error) => console.log(error));
	}, [id]);

	return (
		<>
			<div className="p-10 w-full h-full flex justify-center items-center">
				<div className="w-[1200px] h-[530px] rounded-[30px] border-[10px] border-[#363636] bg-[#C2DCEB] shadow-2xl p-1">
					<div className="p-3 flex justify-center items-center w-full h-full rounded-3xl">
						<div className="w-[38%] h-full flex flex-col justify-start items-center">
							<h2 className="self-start font-outfit font-[700] text-[45px] text-[#363636] tracking-tight">
								{task?.title}
							</h2>
							<div className="taskInformation w-full flex flex-wrap justify-center items-center">
								<div className="w-1/2 h-[40px] bg-red-400">hello</div>
								<div className="w-1/2 h-[40px] bg-blue-gray-700"></div>
								<div className="w-1/2 h-[40px] bg-green-500"></div>
								<div className="w-1/2 h-[40px] bg-light-blue-900"></div>
							</div>
							<div className="w-full mt-4 border-[1px] border-black "></div>
							{/* later on place here a component <Comment/> - before ask Besslan if this makes sense */}
							<div className="w-full flex justify-start items-center gap-2">
								<h2 className=" font-outfit font-[700] text-[24px] text-[#363636] tracking-tighter">
									Comments
								</h2>
								<img
									src={SpeechBubble}
									alt="Comments Button"
									width={25}
									height={25}
								/>
							</div>
							<div className="w-full h-full rounded-[20px] border-black border-[2px] flex flex-col justify-end items-center p-2 relative">
								<div className="w-[90%] flex justify-between items-center relative">
									<input
										type="text"
										className="bg-transparent border-[#363636] border-[2px] rounded-[20px] w-full "
									/>
									<img
										src={Sent}
										alt="Sent icon for message"
										width={18}
										height={18}
										className="absolute right-2"
									/>
								</div>
								<div className="w-[20px] h-[20px] bg-orange-800 rounded-full border-black border-[4px] self-start absolute top-5 left-[92%] "></div>
							</div>
						</div>
						<div className="w-[62%] h-full flex flex-col justify-start items-center ps-6 pt-1">
							{/* needs logic here: if subtasks is active show me the list of subtasks. if false (progress is active) show me Kanban Board of this feature */}
							<div className="w-full flex justify-around items-center font-outfit text-[48px] font-[700] text-[#363636] tracking-tight mb-4">
								<button
									className={`h2 ${
										activeTab === 'subtasks'
											? 'text-[#681FDE]'
											: 'text-[#363636] '
									}`}
									onClick={() => handleTabChange('subtasks')}
								>
									Subtasks
								</button>
								<button
									className={`h2 ${
										activeTab === 'progress'
											? 'text-[#681FDE]'
											: 'text-[#363636] '
									}`}
									onClick={() => handleTabChange('progress')}
								>
									Progress
								</button>
							</div>
							<div className="w-full h-full overflow-scroll">
								{activeTab === 'subtasks' && task?.subtasks ? (
									<div className="flex flex-col gap-2">
										{task.subtasks.map((subtask) => (
											<SingleTaskSubtask
												key={subtask._id}
												subtask={subtask}
												onUpdate={handleSubtaskUpdate}
												onDelete={handleSubtaskDelete}
												currentUser={currentUser}
											/>
										))}
									</div>
								) : (
									<div>Progress here</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default SingleTaskBoard;
