import React, { useState, useEffect } from 'react';
import getUnassignedTasks from '../services/TasksRequests';
import { getAllUsers } from './GoodNews';
import { Avatar, Card } from '@material-tailwind/react';

function WidgetOpenSubTasks() {
	const [unassignedTasks, setUnassignedTasks] = useState([]);
	const [users, setUsers] = useState([]);
	const [startIndex, setStartIndex] = useState(0);
	const productLeaderName = users.find((users) => users.name === 'John Doe');

	// const deadlineDate = new Date(task.deadline);
	// const month = deadlineDate.getMonth() + 1;
	// const day = deadlineDate.getDate();
	// const year = deadlineDate.getFullYear();
	// const formattedDeadline = `${month}/${day}/${year}`;

	useEffect(() => {
		// Fetch unassigned tasks and users when the component mounts
		Promise.all([getUnassignedTasks(), getAllUsers()])
			.then(([tasksData, usersData]) => {
				// Update state with the fetched data
				setUnassignedTasks(tasksData);
				console.log(usersData);
				setUsers(usersData);
			})
			.catch((error) => {
				// Log any errors that occur during the fetch
				console.log(error);
			});
	}, []);

	const nextTasks = () => {
		setStartIndex((prevIndex) => prevIndex + 1);
	};

	const previousTasks = () => {
		setStartIndex((prevIndex) => Math.max(0, prevIndex - 1));
	};

	return (
		<div className="flex justify-end items-end p-12 mr-8">
			<div className="flex justify-center items-center border-[2px] border-gray-900 rounded-[30px] w-[865px] h-[260px] overflow-auto">
				<Card
					className="flex justify-center items-between py-40 ml-6"
					color="transparent"
					shadow={true}
				>
					<div className="mb-1 font-semibold flex justify-between items-center">
						<h2 className="flex justify-start">Open SubTasks</h2>
						<img
							src="./src/assets/yellowdot.png"
							alt=""
							className="w-[18px] h-[18px] mr-6"
						/>
					</div>

					{unassignedTasks.map((task, index) => (
						<div className="" key={task._id}>
							<div>
								<div className="relative">
									<div className="flex start-0 m-[2px]">
										<h3 className="text-xs font-semibold">
											Title:{task.title}
										</h3>
									</div>
									<img
										src="./src/assets/wireanchor2.png"
										alt="Avatar"
										className="ml-4 w-[21px] h-[13px]"
									/>
								</div>

								{productLeaderName && <p key={productLeaderName.id}></p>}
								<div className="flex justify-end">
									<p className="font-bold">
										<div className="flex justify-between mr-[12px]">
											<div className="flex justify-center">
												<Avatar
													src={productLeaderName.profilePicture}
													alt=""
													className="w-[30px] h-[30px]"
												/>
												<img
													src="./src/assets/done.png"
													alt=""
													className="w-[53px] h-[32px]"
												/>
												<img
													src="./src/assets/caution.png"
													alt=""
													className="w-[46px] h-[29px]"
												/>
											</div>
										</div>
										{productLeaderName.name}
									</p>
								</div>

								<div className=" relative top-[-65px] ">
									<p className="text-xs text-blue-600 ml-10">
										{task.description}
									</p>
									<p className="flex justify-center items-center mr-40 ml-12 p-3 text-xs">
										{task.detailedInformation}
									</p>
									<div className="relative flex justify-items-center justify-start">
										<p>
											<span className="font-bold ml-2">Priority:</span>{' '}
											{task.priority}
										</p>

										<p>
											<span className="font-bold ml-2">Status:</span>{' '}
											{task.status}
										</p>

										<p>
											<span className="font-bold ml-2 text-red-400">
												Deadline:
											</span>{' '}
											{task.deadline &&
												new Date(task.deadline).toLocaleDateString()}
										</p>
									</div>
								</div>

								{index !== unassignedTasks.length - 1 && (
									<div className="flex justify-center ml-4 m-1 w-[790.01px] border-t border-gray-900 flex-grow"></div>
								)}
							</div>
						</div>
					))}

					<div>
						<button onClick={previousTasks} disabled={startIndex === 0}>
							Previous
						</button>
						<button
							onClick={nextTasks}
							disabled={startIndex + 3 >= unassignedTasks.length}
						>
							Next
						</button>
					</div>
				</Card>
			</div>
		</div>
	);
}

export default WidgetOpenSubTasks;
