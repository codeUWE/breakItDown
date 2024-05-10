import { Avatar } from '@material-tailwind/react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
	getCommentsByTask,
	createComment,
	deleteComment,
	updateComment,
} from '../services/CommentsRequests';

//assets
import sent from '../assets/sent.png';
import moreWhite from '../assets/moreWhite.png';

function Comment({ comment, onDelete, onUpdate }) {
	const [isEditing, setIsEditing] = useState(false);
	const [editedBody, setEditedBody] = useState(comment.body);
	const [menuOpen, setMenuOpen] = useState(false);

	const handleEdit = () => {
		setIsEditing(true);
		setMenuOpen(false);
	};

	const handleCancelEdit = () => {
		setIsEditing(false);
		setEditedBody(comment.body);
	};

	const handleUpdate = async () => {
		await onUpdate(comment._id, { body: editedBody });
		setIsEditing(false);
	};

	const handleDelete = async () => {
		await onDelete(comment._id);
		setMenuOpen(false);
	};

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	return (
		<div className="w-full flex-col justify-center">
			<div className="comment max-w-[370px] mx-auto mb-4 ps-3 pe-8 pt-2 pb-2 font-outfit font-[500] text-white text-[14px] bg-blue-800 rounded-2xl relative">
				{isEditing ? (
					<div>
						<Avatar
							src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWgel"
							alt="avatar"
							className="w-[40px] h-[40px] absolute top-0 left-[360px] z-10"
						/>
						<input
							type="text"
							value={editedBody}
							onChange={(e) => setEditedBody(e.target.value)}
							className="w-full p-2 border border-gray-300 rounded-lg mb-2"
						/>
						<div className="flex gap-2">
							<button
								className="text-green-500 hover:underline mr-2"
								onClick={handleUpdate}
							>
								Save
							</button>
							<button
								className="text-red-500 hover:underline mr-2"
								onClick={handleCancelEdit}
							>
								Cancel
							</button>
						</div>
					</div>
				) : (
					<div>
						<Avatar
							src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWgel"
							alt="avatar"
							className="w-[40px] h-[40px] absolute top-0 left-[360px] z-10"
						/>
						<p className="">{comment.body}</p>
						<button onClick={toggleMenu} className="absolute bottom-1 right-4">
							<img src={moreWhite} alt="more button" width={20} />
						</button>
						{menuOpen && (
							<div className="absolute top-[55px] right-0 bg-white shadow-lg rounded-md p-2 border border-gray-300 z-10">
								<button
									className="text-blue-500 hover:underline mr-2 block"
									onClick={handleEdit}
								>
									Edit
								</button>
								<button
									className="text-red-500 hover:underline block"
									onClick={handleDelete}
								>
									Delete
								</button>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}

export default function Comments() {
	const { id } = useParams();
	const [comments, setComments] = useState([]);
	const [newCommentBody, setNewCommentBody] = useState('');

	useEffect(() => {
		async function fetchComments() {
			const taskComments = await getCommentsByTask(id);
			setComments(taskComments);
		}
		fetchComments();
	}, [id]);

	const handleAddComment = async () => {
		if (newCommentBody.trim() === '') return;

		const newComment = await createComment({
			body: newCommentBody,
			task: id,
		});
		setComments([...comments, newComment]);
		setNewCommentBody('');
	};

	const handleUpdateComment = async (commentId, updatedData) => {
		const updatedComment = await updateComment(commentId, updatedData);
		setComments((prevComments) =>
			prevComments.map((comment) =>
				comment._id === commentId ? updatedComment : comment
			)
		);
	};

	const handleDelete = async (id) => {
		await deleteComment(id);
		setComments((prevComments) =>
			prevComments.filter((comment) => comment._id !== id)
		);
	};

	return (
		<div className="h-full w-full comments-container overflow-scroll flex flex-col justify-center relative no-scrollbar py-3">
			<div className="h-full w-full  overflow-scroll no-scrollbar">
				{comments.map((comment) => (
					<Comment
						key={comment._id}
						comment={comment}
						onDelete={handleDelete}
						onUpdate={handleUpdateComment}
					/>
				))}
			</div>
			<div className="new-comment mt-3 flex items-center relative px-3 ">
				<input
					type="text"
					placeholder="Add a comment..."
					value={newCommentBody}
					onChange={(e) => setNewCommentBody(e.target.value)}
					className="w-full ps-4 pe-9 py-1 border-[1px] border-[#363636] rounded-xl bg-transparent placeholder:text-black placeholder:font-outfit font-outfit"
				/>
				<button onClick={handleAddComment}>
					<img
						src={sent}
						alt="sent button"
						width={30}
						className="absolute right-4 top-[2px]"
					/>
				</button>
			</div>
		</div>
	);
}
