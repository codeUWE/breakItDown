import React from 'react';
import SpeechBubble from '../assets/speechBubble.png';
import stepInto from '../assets/stepInto.png';
import { Avatar } from '@material-tailwind/react';

function TaskArea() {
	return (
		<>
			<div className="w-full p-5">
				{/* To Do Area */}
				<div className="w-[1060px] h-[530px] mx-auto rounded-[30px] border-[2px] border-black flex flex-col justify-center items-center">
					<div className="w-full px-6 flex justify-between items-center">
						<h2 className="font-outfit font-[600] text-[32px]"> All Tasks</h2>
						<button className="font-outfit font-[600] text-[18px] text-[#438CDB]">
							filter by
						</button>
					</div>
					<div className="flex justify-center items-center gap-3">
						<div className="w-[330px] h-[440px] border-[2px] border-black bg-[#FDFDFD] flex flex-col justify-center items-center gap-2 rounded-[20px]">
							<h3 className="mx-auto p-2 font-outfit font-[700] text-[24px]">
								To Do
							</h3>
							<div className="h-full w-full mx-auto flex flex-col gap-2 justify-start items-center overflow-auto pb-2">
								<div className="w-[288px] h-[110px] rounded-[20px] border-[2px] border-black  flex">
									<div className="flex flex-col justify-center items-center border-e-2 border-black p-2 ">
										<h2 className="m-0 font-outfit font-[700] text-[16px]">
											APR
										</h2>
										<h2 className="m-0 font-outfit font-[700] text-[24px] leading-none tracking-tighter">
											30.
										</h2>
									</div>
									<div className="w-full grid grid-rows-4 grid-col-6 ps-1 pe-1 pt-[4px] pb-[10px]">
										<h2 className="font-outfit font-[500] text-[20px] row-start-1 col-start-1 col-span-5">
											Task Name
										</h2>
										<h3 className="font-outfit font-[300] text-[18px] row-start-2 col-start-1 col-span-3 tracking-tight mt-1">
											<span className="text-[#FE4A49] font-outfit font-[500] ">
												X
											</span>{' '}
											Subtasks
										</h3>
										<img
											src={SpeechBubble}
											alt="Icon of a speech bubble"
											width={29}
											height={29}
											className="row-start-4 col-start-1"
										/>
										<div className="w-[60px] row-start-4 col-start-4 col-span-2 mx-auto">
											<div className="w-[60px] w-max-[67px] h-[30px] h-max-[30px] flex justify-end relative ">
												<Avatar
													src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
													alt="avatar"
													className="w-[29px] h-[29px] absolute top-0 left-0 z-50"
												/>
												<Avatar
													src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
													alt="avatar"
													className="w-[29px] h-[29px] absolute  top-0 left-[15px] z-40"
												/>
												<Avatar
													src="https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=1923&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
													alt="avatar"
													className="w-[29px] h-[29px] absolute  top-0 left-[30px]"
												/>
											</div>
										</div>

										<img
											src={stepInto}
											alt="icon step into"
											width={24}
											height={24}
											className="row-start-2 row-end-4 col-start-6 ms-4 mt-5"
										/>
										<h4 className="font-outfit font-[400] text-[12px] pt-[6px] row-start-1 col-start-6 mx-auto">
											(X/<span className="text-[#FE4A49] font-[500]">X</span>){' '}
										</h4>
									</div>
								</div>
								<div className="w-[288px] h-[110px] rounded-[20px] border-[2px] border-black  flex">
									<div className="flex flex-col justify-center items-center border-e-2 border-black p-2 ">
										<h2 className="m-0 font-outfit font-[700] text-[16px]">
											APR
										</h2>
										<h2 className="m-0 font-outfit font-[700] text-[24px] leading-none tracking-tighter">
											30.
										</h2>
									</div>
									<div className="w-full grid grid-rows-4 grid-col-6 ps-1 pe-1 pt-[4px] pb-[10px]">
										<h2 className="font-outfit font-[500] text-[20px] row-start-1 col-start-1 col-span-5">
											Task Name
										</h2>
										<h3 className="font-outfit font-[300] text-[18px] row-start-2 col-start-1 col-span-3 tracking-tight mt-1">
											<span className="text-[#FE4A49] font-outfit font-[500] ">
												X
											</span>{' '}
											Subtasks
										</h3>
										<img
											src={SpeechBubble}
											alt="Icon of a speech bubble"
											width={29}
											height={29}
											className="row-start-4 col-start-1"
										/>
										<div className="w-[60px] row-start-4 col-start-4 col-span-2 mx-auto">
											<div className="w-[60px] w-max-[67px] h-[30px] h-max-[30px] flex justify-end relative ">
												<Avatar
													src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
													alt="avatar"
													className="w-[29px] h-[29px] absolute top-0 left-0 z-50"
												/>
												<Avatar
													src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
													alt="avatar"
													className="w-[29px] h-[29px] absolute  top-0 left-[15px] z-40"
												/>
												<Avatar
													src="https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=1923&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
													alt="avatar"
													className="w-[29px] h-[29px] absolute  top-0 left-[30px]"
												/>
											</div>
										</div>

										<img
											src={stepInto}
											alt="icon step into"
											width={24}
											height={24}
											className="row-start-2 row-end-4 col-start-6 ms-4 mt-5"
										/>
										<h4 className="font-outfit font-[400] text-[12px] pt-[6px] row-start-1 col-start-6 mx-auto">
											(X/<span className="text-[#FE4A49] font-[500]">X</span>){' '}
										</h4>
									</div>
								</div>
							</div>
						</div>
						{/* In Progress Area */}
						<div className="w-[330px] h-[440px] border-[2px] border-black bg-[#FFFEF9] flex flex-col justify-center items-center gap-2 rounded-[20px]">
							<h3 className="mx-auto p-2 font-outfit font-[700] text-[24px]">
								In Progress
							</h3>
							<div className="h-full w-full mx-auto flex flex-col gap-2 justify-start items-center overflow-auto pb-2">
								<div className="w-[288px] h-[110px] rounded-[20px] border-[2px] border-black  flex">
									<div className="flex flex-col justify-center items-center border-e-2 border-black p-2 ">
										<h2 className="m-0 font-outfit font-[700] text-[16px]">
											APR
										</h2>
										<h2 className="m-0 font-outfit font-[700] text-[24px] leading-none tracking-tighter">
											30.
										</h2>
									</div>
									<div className="w-full grid grid-rows-4 grid-col-6 ps-1 pe-1 pt-[4px] pb-[10px]">
										<h2 className="font-outfit font-[500] text-[20px] row-start-1 col-start-1 col-span-5">
											Task Name
										</h2>
										<h3 className="font-outfit font-[300] text-[18px] row-start-2 col-start-1 col-span-3 tracking-tight mt-1">
											<span className="text-[#FE4A49] font-outfit font-[500] ">
												X
											</span>{' '}
											Subtasks
										</h3>
										<img
											src={SpeechBubble}
											alt="Icon of a speech bubble"
											width={29}
											height={29}
											className="row-start-4 col-start-1"
										/>
										<div className="w-[60px] row-start-4 col-start-4 col-span-2 mx-auto">
											<div className="w-[60px] w-max-[67px] h-[30px] h-max-[30px] flex justify-end relative ">
												<Avatar
													src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
													alt="avatar"
													className="w-[29px] h-[29px] absolute top-0 left-0 z-50"
												/>
												<Avatar
													src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
													alt="avatar"
													className="w-[29px] h-[29px] absolute  top-0 left-[15px] z-40"
												/>
												<Avatar
													src="https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=1923&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
													alt="avatar"
													className="w-[29px] h-[29px] absolute  top-0 left-[30px]"
												/>
											</div>
										</div>

										<img
											src={stepInto}
											alt="icon step into"
											width={24}
											height={24}
											className="row-start-2 row-end-4 col-start-6 ms-4 mt-5"
										/>
										<h4 className="font-outfit font-[400] text-[12px] pt-[6px] row-start-1 col-start-6 mx-auto">
											(X/<span className="text-[#FE4A49] font-[500]">X</span>){' '}
										</h4>
									</div>
								</div>
								<div className="w-[288px] h-[110px] rounded-[20px] border-[2px] border-black  flex">
									<div className="flex flex-col justify-center items-center border-e-2 border-black p-2 ">
										<h2 className="m-0 font-outfit font-[700] text-[16px]">
											APR
										</h2>
										<h2 className="m-0 font-outfit font-[700] text-[24px] leading-none tracking-tighter">
											30.
										</h2>
									</div>
									<div className="w-full grid grid-rows-4 grid-col-6 ps-1 pe-1 pt-[4px] pb-[10px]">
										<h2 className="font-outfit font-[500] text-[20px] row-start-1 col-start-1 col-span-5">
											Task Name
										</h2>
										<h3 className="font-outfit font-[300] text-[18px] row-start-2 col-start-1 col-span-3 tracking-tight mt-1">
											<span className="text-[#FE4A49] font-outfit font-[500] ">
												X
											</span>{' '}
											Subtasks
										</h3>
										<img
											src={SpeechBubble}
											alt="Icon of a speech bubble"
											width={29}
											height={29}
											className="row-start-4 col-start-1"
										/>
										<div className="w-[60px] row-start-4 col-start-4 col-span-2 mx-auto">
											<div className="w-[60px] w-max-[67px] h-[30px] h-max-[30px] flex justify-end relative ">
												<Avatar
													src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
													alt="avatar"
													className="w-[29px] h-[29px] absolute top-0 left-0 z-50"
												/>
												<Avatar
													src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
													alt="avatar"
													className="w-[29px] h-[29px] absolute  top-0 left-[15px] z-40"
												/>
												<Avatar
													src="https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=1923&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
													alt="avatar"
													className="w-[29px] h-[29px] absolute  top-0 left-[30px]"
												/>
											</div>
										</div>

										<img
											src={stepInto}
											alt="icon step into"
											width={24}
											height={24}
											className="row-start-2 row-end-4 col-start-6 ms-4 mt-5"
										/>
										<h4 className="font-outfit font-[400] text-[12px] pt-[6px] row-start-1 col-start-6 mx-auto">
											(X/<span className="text-[#FE4A49] font-[500]">X</span>){' '}
										</h4>
									</div>
								</div>
							</div>
						</div>
						{/* Done Area */}
						<div className="w-[330px] h-[440px] border-[2px] border-black bg-[#F9FFFB] flex flex-col justify-center items-center gap-2 rounded-[20px]">
							<h3 className="mx-auto p-2 font-outfit font-[700] text-[24px]">
								Done
							</h3>
							<div className="h-full w-full mx-auto flex flex-col gap-2 justify-start items-center overflow-auto pb-2">
								<div className="w-[288px] h-[110px] rounded-[20px] border-[2px] border-black  flex">
									<div className="flex flex-col justify-center items-center border-e-2 border-black p-2 ">
										<h2 className="m-0 font-outfit font-[700] text-[16px]">
											APR
										</h2>
										<h2 className="m-0 font-outfit font-[700] text-[24px] leading-none tracking-tighter">
											30.
										</h2>
									</div>
									<div className="w-full grid grid-rows-4 grid-col-6 ps-1 pe-1 pt-[4px] pb-[10px]">
										<h2 className="font-outfit font-[500] text-[20px] row-start-1 col-start-1 col-span-5">
											Task Name
										</h2>
										<h3 className="font-outfit font-[300] text-[18px] row-start-2 col-start-1 col-span-3 tracking-tight mt-1">
											<span className="text-[#FE4A49] font-outfit font-[500] ">
												X
											</span>{' '}
											Subtasks
										</h3>
										<img
											src={SpeechBubble}
											alt="Icon of a speech bubble"
											width={29}
											height={29}
											className="row-start-4 col-start-1"
										/>
										<div className="w-[60px] row-start-4 col-start-4 col-span-2 mx-auto">
											<div className="w-[60px] w-max-[67px] h-[30px] h-max-[30px] flex justify-end relative ">
												<Avatar
													src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
													alt="avatar"
													className="w-[29px] h-[29px] absolute top-0 left-0 z-50"
												/>
												<Avatar
													src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
													alt="avatar"
													className="w-[29px] h-[29px] absolute  top-0 left-[15px] z-40"
												/>
												<Avatar
													src="https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=1923&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
													alt="avatar"
													className="w-[29px] h-[29px] absolute  top-0 left-[30px]"
												/>
											</div>
										</div>

										<img
											src={stepInto}
											alt="icon step into"
											width={24}
											height={24}
											className="row-start-2 row-end-4 col-start-6 ms-4 mt-5"
										/>
										<h4 className="font-outfit font-[400] text-[12px] pt-[6px] row-start-1 col-start-6 mx-auto">
											(X/<span className="text-[#FE4A49] font-[500]">X</span>){' '}
										</h4>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default TaskArea;
