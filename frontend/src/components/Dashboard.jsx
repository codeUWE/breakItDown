import React from "react";
import GoodNews from "../components/GoodNews";
// import WidgetOpenSubTasks from '../components/WidgetOpenSubTasks';
import RecentCollaborations from "./RecentCollaborations";
import OpenSubtasks from "./OpenSubtasks";
import TimeDashboard from "./TimeDashboard";

function Dashboard() {
  return (
    <>
      {/* <div>
				<RecentCollaborations />
			</div> */}
      <div className="">
        {/* <div>
					<GoodNews />
				</div> */}
        <div>
          <TimeDashboard />
        </div>
        <div>
          <OpenSubtasks />
        </div>
        {/* <div>
					<WidgetOpenSubTasks />
				</div> */}
      </div>
    </>
  );
}

export default Dashboard;
