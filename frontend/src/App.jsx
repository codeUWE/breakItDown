import "./App.css";
import { Routes, Route } from "react-router-dom";

//components
import Task from "./components/Task";
import SingleTaskBoard from "./components/SingleTaskBoard";
// import SignUp from './components/SignUp';
import SignUpCard from "./components/SignUpCard";
import LoginCard from "./components/LoginCard";
import AdminDashboard from "./components/AdminDashboard";
import Dashboard from "./components/Dashboard";
import Layout from "./components/Layout";
import Team from "./components/Team";
import Notes from "./components/Notes";
import Schedule from "./components/Schedule";
import Authorize from "./components/Authorize";

function App() {
  return (
    <>
      <main>
        <Routes>
          <Route path="/login" element={<LoginCard />} />
          <Route path="/signup" element={<SignUpCard />} />

          <Route path="/" element={<Layout />}>
            <Route path="/admin" element={<Authorize role={"Admin"} />}>
              <Route path="dashboard" element={<AdminDashboard />} />
            </Route>
            {/* <Route path="/admindashboard" element={<AdminDashboard />} /> */}
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/tasks" element={<Task />} />
            <Route path="/tasks/:id" element={<SingleTaskBoard />} />
            <Route path="/team" element={<Team />} />
            <Route path="/notes" element={<Notes />} />
          </Route>
        </Routes>
      </main>
    </>
  );
}

//663dd4b97f0e93af9836c3ad

export default App;
