import OpenSubtasks from './OpenSubtasks';
import TimeDashboard from './TimeDashboard';
import WidgetTime from './WidgetTime';

function Dashboard() {
	return (
		<>
			<div className="w-[97%] h-[100%] mx-auto flex xl:justify-between md:flex-col xl:flex-row pt-8">
				<div className="xl:w-[30%] md:w-full lg:mb-0">
					{/* <TimeDashboard /> */}
					<WidgetTime />
				</div>
				<div className="xl:w-[68%] md:w-full">
					<OpenSubtasks />
				</div>
			</div>
		</>
	);
}

export default Dashboard;
