// import React from 'react';
// import WidgetOpenSubTasks from '../components/WidgetOpenSubTasks';
import OpenSubtasks from './OpenSubtasks';
import TimeDashboard from './TimeDashboard';

function Dashboard() {
	return (
		<>
			<div className="flex justify-between px-20">
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
