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
			<div className="w-full flex justify-center items-center xl:gap-20 md:gap-12 md:mt-32 lg:mt-10 xl:mt-28">
				<div className="flex flex-col items-center xl:w-1/3 xl:h-full md:h-full md:w-1/2 lg:w-2/5 rounded-3xl justify-start md:p-4 bg-[#EFF9FF] shadow-md ">
					<h1 className="font-outfit font-[600]  xl:text-[50px] md:text-[40px] lg:text-[45px] m-2 ">
						Manage Projects
					</h1>
					<div className="bg-[#D4ECFC] rounded-2xl xl:p-12 lg:p-8 md:p-4">
						<label className="block font-outfit font-[300] md:text-[30px] mb-5 tracking-tight">
							Enter project name:
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
										className="bg-white font-outfit font-[400] sm:text-[20px] md:text-[20px]  px-4 py-2 rounded-3xl w-80"
										type="text"
										onChange={(e) => setEnteredProject(e.target.value)}
										placeholder={project.title}
									/>

									<button
										className="mt-6 bg-[#080708] text-[#F55D3E]  md:text-[20px]  font-bold py-2 px-4 rounded-3xl focus:outline-none focus:shadow-outline disabled:bg-gray-400 disabled:text-white"
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
				<div className="w-1/4 bg-[#e5d848] shadow-md rounded-3xl p-4  xl:w-[200px] overflow-scroll text-[#5a551d] font-inter text-[14px]">
					This is the first version of the app (beta). Currently, it is only
					possible to create one project per user. The input field serves as an
					update function once a project is added. You can only update the
					project's name, not create a new project.
				</div>
			</div>
		</>
	);
};

export default ManageProjects;
