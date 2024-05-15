// import React from 'react';
// import WidgetOpenSubTasks from '../components/WidgetOpenSubTasks';
import OpenSubtasks from './OpenSubtasks';
import TimeDashboard from './TimeDashboard';

function Dashboard() {
	return (
		<>
			<div className="">
				<div>
					<TimeDashboard />
				</div>
				<div>
					<OpenSubtasks />
				</div>
			</div>
		</>
	);
}

export default Dashboard;
