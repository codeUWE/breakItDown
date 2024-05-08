import React from "react";
import GoodNews from "../components/GoodNews";
import WidgetOpenSubTasks from "../components/WidgetOpenSubTasks";
import Schedule from "./Schedule";
// import RecentCollaborations from "./RecentCollaborations";

function Dashboard() {
  return (
<>
    {/* <div>
   <RecentCollaborations/>
    </div> */}

<div>
   <GoodNews />
    </div> 

    <div>
   <Schedule />
    </div> 

     <div>
 <WidgetOpenSubTasks />
    </div>   
</>
    
   
      

  );
}

export default Dashboard;
