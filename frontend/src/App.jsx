import './App.css';
import { Routes, Route } from 'react-router-dom';

//components
import Task from './components/Task';
import SingleTaskBoard from './components/SingleTaskBoard';
// import Team from "./components/Team";
import Notes from "./components/Notes";
import LoginCard from "./components/LoginCard";
import SignUpCard from './components/SignUpCard';
import AdminDashboard from './components/AdminDashboard';
import Dashboard from './components/Dashboard';
import Layout from './components/Layout';
import Authorize from "./components/Authorize";
import ProjectProgress from './components/ProjectProgress';
import TeamView from './components/TeamView';

function App() {

	return (
		<>
			<main>
				<Routes>
					<Route path="/login" element={<LoginCard />} />
					<Route path="/signup" element={<SignUpCard />} />
					<Route path="/admindashboard" element={<AdminDashboard />} />
					<Route path="/" element={<Layout />}>
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/tasks" element={<Task />} />
						<Route path="/tasks/:id" element={<SingleTaskBoard />} />
						<Route path="/tasks/progress" element={<ProjectProgress />} />
						<Route path="/team" element={<TeamView />} />
						<Route path="/notes" element={<Notes />} />
					</Route>
				</Routes>
			</main>
		</>
	);

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
            <Route path="/tasks/progress" element={<ProjectProgress />} />
            <Route path="/team" element={<Team />} />
            <Route path="/notes" element={<Notes />} />
          </Route>
        </Routes>
      </main>
    </>
  );

}



export default App;
