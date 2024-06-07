import { useState, useEffect } from 'react';
import { getWidgetInfo } from '../services/TasksRequests';

function WidgetTime() {
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
				<span className="text-[#E53935] font-[800] mx-1">:</span>
				<span>{minutes}</span>
			</>
		);
	};

	const formatDate = (date, isLast = false) => {
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const year = date.getFullYear();
		return (
			<>
				<span>{day}</span>
				<span
					className={`font-[800] mx-1 ${
						isLast ? 'text-transparent' : 'text-[#E53935]'
					}`}
				>
					|
				</span>
				<span>{month}</span>
				<span className="text-[#E53935] font-[800] mx-1">|</span>
				<span>{year}</span>
			</>
		);
	};

	return (
		<div className="w-full h-full rounded-3xl p-4 flex xl:flex-col md:items-center font-inter font-[100] text-[#080708] bg-[#f18a75] leading-none shadow-md">
			<div className="w-full text-[70px] tracking-tighter md:hidden xl:inline-block">
				{formatTime(currentTime)}
			</div>
			<div className="xl:w-full xl:text-[70px] md:text-[45px] font-[100] tracking-tighter mt-2">
				{formatDate(currentTime)}
			</div>
			<div className="w-full text-[70px] font-[100] text-transparent tracking-tighter mt-2 md:hidden xl:inline-block">
				{formatDate(currentTime)}
			</div>
			<div className="text-[70px] font-[500] xl:pe-[80px] md:ps-12 lg:ps-72 xl:ps-14 tracking-tighter flex items-center">
				<h1 className="xl:text-[100px] md:text-[70px] md:font-[600] xl:font-[700] xl:w-32">
					{widgetInfo.openTasksCount}
				</h1>
				<div className="flex flex-col items-start xl:leading-10 md:leading-7 xl:font-[800] md:pe-2">
					<h2 className="xl:text-[50px] md:text-[30px]">Tasks</h2>
					<h2 className="xl:text-[50px] md:text-[30px] md:ps-[5px] xl:ps-[10px]">
						Left
					</h2>
				</div>
			</div>
			<div className="w-full text-[70px] font-[100] text-transparent tracking-tighter md:hidden xl:inline-block">
				{formatDate(currentTime, true)}
			</div>
			<div className="xl:text-[70px] xl:self-start  xl:font-[800] md:font-[600] xl:ps-[14px] tracking-tighter flex items-center">
				<h1 className="xl:text-[85px] md:text-[70px] xl:me-2 md:me-1 tracking-tighter">
					{widgetInfo.daysUntilNextDeadline}
				</h1>
				<div className="flex flex-col items-start md:font-[500] xl:font-[700] font-inter md:leading-7 xl:leading-8 tracking-tighter md:w-44">
					<h2 className="xl:text-[40px] md:text-[26px] xl:w-40">Days until</h2>
					<h2 className="xl:text-[40px] md:text-[26px] xl:w-60">
						Next Deadline
					</h2>
				</div>
			</div>
		</div>
	);
}

export default WidgetTime;
