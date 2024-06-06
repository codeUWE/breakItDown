import React, { useState, useEffect } from 'react';
import { getWidgetInfo } from '../services/TasksRequests';

function TimeDashboard() {
	const [currentTime, setCurrentTime] = useState(new Date());
	const [widgetInfo, setWidgetInfo] = useState({
		openTasksCount: 0,
		daysUntilNextDeadline: 0,
	});

	useEffect(() => {
		const fetchWidgetInfo = async () => {
			try {
				const data = await getWidgetInfo();
				setWidgetInfo({
					openTasksCount: String(data.openTasksCount).padStart(2, '0'),
					daysUntilNextDeadline: String(data.daysUntilNextDeadline).padStart(
						2,
						'0'
					),
				});
			} catch (error) {
				console.error('Error fetching widget info:', error);
			}
		};

		fetchWidgetInfo();

		const intervalId = setInterval(() => {
			setCurrentTime(new Date());
		}, 1000);

		return () => clearInterval(intervalId);
	}, []);

	const formatTime = (date) => {
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');
		return (
			<>
				<span>{hours}</span>
				<span className="text-[#E53935]">:</span>
				<span>{minutes}</span>
			</>
		);
	};

	const formatDate = (date) => {
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const year = date.getFullYear();
		return (
			<>
				<span>{day}</span>
				<span className="text-[#E53935] font-[800] mx-1">|</span>
				<span>{month}</span>
				<span className="text-[#E53935] font-[800] mx-1">|</span>
				<span>{year}</span>
			</>
		);
	};

	return (
		<div className="w-full  h-full font-inter font-[900] text-[#080708] leading-none relative ">
			<div className="text-[100px] tracking-tighter">
				{formatTime(currentTime)}
			</div>
			<div className="text-[69px] font-[700] tracking-tighter">
				{formatDate(currentTime)}
			</div>
			<div className="absolute top-[180px] left-[97.2px] border-[6px] border-[#E53935] h-[90px]"></div>
			<div className="absolute top-[180px] left-[215px] border-[6px] border-[#E53935] h-[90px]"></div>
			<div className="absolute top-[370px] left-[215px] border-[6px] border-[#E53935] h-[130px]"></div>
			<div className="absolute top-[260px] left-[33px]">
				<h1 className="text-[120px]">{widgetInfo.openTasksCount}</h1>
			</div>
			<div className="absolute top-[270px] left-[203px]">
				<div className="flex flex-col items-start leading-none">
					<h2 className="text-[50px]">Tasks</h2>
					<h2 className="text-[50px] ps-[10px]">Left</h2>
				</div>
			</div>
			<div className="absolute top-[498px] left-[30px]">
				<h1 className="text-[85px]">{widgetInfo.daysUntilNextDeadline}</h1>
			</div>
			<div className="absolute top-[505px] left-[150px]">
				<div className="flex flex-col items-start leading-none">
					<h2 className="text-[35px] w-96">Days until</h2>
					<h2 className="text-[35px]">Next Deadline</h2>
				</div>
			</div>
		</div>
	);
}

export default TimeDashboard;
