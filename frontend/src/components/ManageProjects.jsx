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
				// console.log(data);
				setProject(data);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			});
	}, []);

	const handleClick = async () => {
		// console.log({ title: enteredProject });
		const project = await createProject({ title: enteredProject });
		setProject(project);
		navigate('/admin/dashboard/roles');
	};

	const handleUpdateClick = async () => {
		// console.log({ id: project._id }, { title: enteredProject });
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
			<div className="flex flex-col items-center lg:w-[500px] lg:h-[430px] md:h-[550px] sm:h-[450px] sm:w-3/5 md:w-3/4 h-full mx-auto rounded-3xl justify-start lg:p-4 md:p-4 sm:p-6 bg-[#EFF9FF] shadow-md sm:mt-5 md:mt-10 lg:mt-8 xl:mt-14">
				<h1 className="font-outfit font-[600]  xl:text-[55px] md:text-[50px] sm:text-[40px] m-2 ">
					Manage Projects
				</h1>
				<div className="sm:mt-16 md:mt-10 lg:mt-6 bg-[#D4ECFC] rounded-2xl lg:px-16 lg:py-8 sm:px-4 sm:py-10 md:px-24 md:py-20">
					<label className="block font-outfit font-[200] sm:text-[30px] md:text-[40px] mb-5">
						Project:
					</label>
					<div className="flex ">
						{project?.title === undefined ? (
							<div className="flex flex-col items-center justify-center">
								<input
									className=" bg-white font-outfit font-[400] sm:text-[20px] md:text-[24px]  px-4 py-2 rounded-3xl w-80 mb-6"
									type="text"
									onChange={(e) => setEnteredProject(e.target.value)}
									placeholder="Enter Project Name"
								/>
								<button
									className=" bg-[#080708] text-[#F55D3E] md:text-[24px] font-bold py-2 px-4 rounded-3xl focus:outline-none focus:shadow-outline"
									onClick={handleClick}
								>
									Create Project
								</button>
							</div>
						) : (
							<div className="flex flex-col items-center justify-center">
								<input
									className="bg-white font-outfit font-[400] sm:text-[20px] md:text-[24px]  px-4 py-2 rounded-3xl w-80"
									type="text"
									onChange={(e) => setEnteredProject(e.target.value)}
									placeholder={project.title}
								/>

								<button
									className="mt-6 bg-[#080708] text-[#F55D3E]  md:text-[24px]  font-bold py-2 px-4 rounded-3xl focus:outline-none focus:shadow-outline disabled:bg-gray-400 disabled:text-white"
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
