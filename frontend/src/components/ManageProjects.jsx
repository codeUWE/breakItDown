import { useState, useEffect, useContext } from 'react';
import {
	getProjectByOwner,
	createProject,
	updateProject,
} from '../services/UserRequests';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../context/AuthProvider';

const ManageProjects = () => {
	const navigate = useNavigate();
	const [project, setProject] = useState('');

	const [enteredProject, setEnteredProject] = useState('');
	const [loading, setLoading] = useState(true);
	const { user } = useContext(AuthContext);

	useEffect(() => {
		getProjectByOwner(user._id)
			.then((data) => {
				console.log(data);
				setProject(data);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			});
	}, []);

	const handleClick = async () => {
		console.log({ title: enteredProject });
		const project = await createProject({ title: enteredProject });
		setProject(project);
		navigate('/admin/dashboard/roles');
	};

	const handleUpdateClick = async () => {
		console.log({ id: project._id }, { title: enteredProject });
		const updatedProject = await updateProject(project._id, {
			...project,
			title: enteredProject,
		});
		setProject(updatedProject);
		navigate('/admin/dashboard/roles');
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<div className="flex flex-col items-center w-[500px] h-[670px] mx-auto rounded-[30px] justify-start pt-20 bg-[#EFF9FF] shadow-md mt-10">
				<h1 className="font-outfit font-[600] text-[45px] m-2 ">
					Manage Projects
				</h1>
				<div className="mt-10 bg-[#D4ECFC] rounded-2xl px-10 py-20">
					<label className="block font-outfit font-[400] text-[30px] mb-5">
						Project:
					</label>
					<div className="flex ">
						{project?.title === undefined ? (
							<div className="flex-col">
								<input
									className=" mt-2 p-2 bg-transparent"
									type="text"
									onChange={(e) => setEnteredProject(e.target.value)}
									placeholder="Enter Project Name"
								/>
								<button
									className=" text-white bg-indigo-600 hover:bg-indigo-700  font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline"
									onClick={handleClick}
								>
									Create Project
								</button>
							</div>
						) : (
							<div className="flex flex-col items-center justify-center">
								<input
									className="bg-white font-outfit font-[400] text-[20px]  px-4 py-2 rounded-3xl w-80"
									type="text"
									onChange={(e) => setEnteredProject(e.target.value)}
									placeholder={project.title}
								/>

								<button
									className="mt-6 text-white bg-indigo-600 hover:bg-indigo-700  font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline disabled:bg-gray-400"
									onClick={handleUpdateClick}
									disabled={!enteredProject}
								>
									Update Project
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default ManageProjects;
