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
				// Formatieren Sie die Zahlen als zweistellige Zeichenketten
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
		<div className="flex flex-col items-start ms-16 mt-8 justify-center font-inter font-[900] text-[#080708] leading-none	relative">
			<div className="text-[150px] tracking-tighter flex">
				{formatTime(currentTime)}
			</div>
			<div className="text-[69px] font-[700] tracking-tighter flex">
				{formatDate(currentTime)}
			</div>
			<div className="absolute top-[230px] left-[84.2px] border-[6px] border-[#E53935] h-[170px]"></div>
			<div className="absolute top-[230px] left-[201px] border-[6px] border-[#E53935] h-[170px]"></div>
			<div className="absolute top-[501px] left-[201px] border-[6px] border-[#E53935] h-[130px]"></div>
			<div className="absolute top-[393px] left-[33px] flex items-center gap-[6px]">
				<h1 className="text-[115px]">{widgetInfo.openTasksCount}</h1>
			</div>
			<div className="absolute top-[400px] left-[188px] flex items-center gap-[6px]">
				<div className="flex flex-col items-start leading-none">
					<h2 className="text-[50px]">Tasks</h2>
					<h2 className="text-[50px] ps-[10px]">Left</h2>
				</div>
			</div>
			<div className="absolute top-[630px] left-[50px]">
				<h1 className="text-[125px]">{widgetInfo.daysUntilNextDeadline}</h1>
			</div>
			<div className="absolute top-[640px] left-[240px] flex items-center gap-[6px]">
				<div className="flex flex-col items-start leading-none">
					<h2 className="text-[50px] w-96">Days until</h2>
					<h2 className="text-[50px]">Next Deadline</h2>
				</div>
			</div>
		</div>
	);
}

export default TimeDashboard;
