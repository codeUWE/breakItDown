import React from "react";
import GoodNews from "../components/GoodNews";
import WidgetOpenSubTasks from "../components/WidgetOpenSubTasks";
import Schedule from "../components/Schedule";

function Dashboard() {
  return (
    <>
      <Schedule />
      <GoodNews />
      {/* <SampleWidget/> */}
      <WidgetOpenSubTasks />
    </>
  );
}

export default Dashboard;
