import React from "react";
// import GoodNews from "../components/GoodNews";
import WidgetOpenSubTasks from "../components/WidgetOpenSubTasks";
import Schedule from "./Schedule";
// import TeamView from "./TeamView";
import RecentCollaborations from "./RecentCollaborations";
import GoodNews from "./GoodNews";

function Dashboard() {
  return (
<>
    <div>
   <RecentCollaborations/>
    </div>

    <GoodNews/>

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
