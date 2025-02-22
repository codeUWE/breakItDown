import { useEffect, useRef, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import {
	getCommentsByTask,
	createComment,
	deleteComment,
	updateComment,
} from '../services/CommentsRequests';
import { Avatar } from '@material-tailwind/react';
import { AuthContext } from '../context/AuthProvider';

import sent from '../assets/sent.png';
import moreWhite from '../assets/moreWhite.png';

function Comment({ comment, onDelete, onUpdate }) {
	const { user } = useContext(AuthContext);
	const [isEditing, setIsEditing] = useState(false);
	const [editedBody, setEditedBody] = useState(comment.body);
	const [menuOpen, setMenuOpen] = useState(false);

	const isOwner = user && comment.user && user._id === comment.user._id;

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

	function parseText(text) {
		const urlRegex =
			/(\bhttps?:\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])(?=\s|$)/gi;
		return text.split(urlRegex).map((part, index) => {
			if (part.match(urlRegex)) {
				return (
					<a
						href={part}
						target="_blank"
						rel="noopener noreferrer"
						className="underline text-[#050047] break-words"
						key={index}
					>
						{part}
					</a>
				);
			} else {
				return part;
			}
		});
	}

	return (
		<div
			className={`w-full flex ${
				isOwner ? 'justify-end' : 'justify-start'
			} mb-4 relative`}
		>
			{!isOwner && (
				<Avatar
					src={
						comment.user?.profilePicture ||
						'https://cdn-icons-png.flaticon.com/512/149/149071.png'
					}
					alt="avatar"
					className={`w-[40px] h-[40px] ${
						isOwner ? 'absolute right-0' : 'absolute left-0'
					}`}
				/>
			)}
			<div
				className={`comment max-w-[350px] min-w-[80px] font-outfit font-[500] ${
					isOwner
						? 'text-[#131313] text-[18px] bg-blue-300 me-9 ps-3 pe-2 py-1'
						: 'text-[#131313] text-[18px] bg-green-300 ms-9 ps-3 pe-2 py-1'
				} rounded-2xl break-words overflow-hidden`}
			>
				{isEditing ? (
					<div className="w-48 pe-3">
						<input
							type="text"
							value={editedBody}
							onChange={(e) => setEditedBody(e.target.value)}
							className="w-full text-black p-2 border border-gray-300 rounded-lg mb-2 mx-auto"
						/>
						<div className="flex gap-2">
							<button
								className="text-[#08A045] hover:underline mr-2"
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
					<>
						<div className="flex flex-col">
							<p className="w-full ">{parseText(comment.body)}</p>
							{isOwner && (
								<>
									<button
										onClick={toggleMenu}
										className="self-end h-3 pe-2 mb-1 mx-0"
									>
										<img src={moreWhite} alt="more button" width={20} />
									</button>
									{menuOpen && (
										<div className="absolute bottom-[-40px] right-0 bg-[#363636] shadow-lg rounded-md p-2 z-10 flex gap-3">
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
								</>
							)}
						</div>
					</>
				)}
			</div>
			{isOwner && (
				<Avatar
					src={
						comment.user?.profilePicture ||
						'https://cdn-icons-png.flaticon.com/512/149/149071.png'
					}
					alt="avatar"
					className={`w-[40px] h-[40px] ${
						isOwner ? 'absolute right-0' : 'absolute left-0'
					}`}
				/>
			)}
		</div>
	);
}

export default function Comments() {
	const { id: taskId } = useParams();
	const [comments, setComments] = useState([]);
	const [newCommentBody, setNewCommentBody] = useState('');
	const { user } = useContext(AuthContext);

	const messagesEndRef = useRef(null); // Referenz für das automatische Scrollen

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		async function fetchComments() {
			if (!user) {
				console.log('User data is not loaded yet.');
				return;
			}

			try {
				const taskComments = await getCommentsByTask(taskId);
				if (taskComments) {
					const enrichedComments = taskComments.map((comment) => ({
						...comment,
						isOwner: user && comment.user && user._id === comment.user._id,
					}));
					setComments(enrichedComments);
				}
			} catch (error) {
				console.error('Error fetching comments:', error);
			}
		}

		if (taskId) {
			fetchComments();
		}
	}, [taskId, user]);

	useEffect(() => {
		scrollToBottom(); // Scrollt nach unten, wenn neue Kommentare hinzugefügt werden
	}, [comments]);

	const handleAddComment = async () => {
		if (newCommentBody.trim() === '') return;

		const newComment = await createComment({
			body: newCommentBody,
			task: taskId,
			user: user._id,
		});

		const newCommentWithOwner = {
			...newComment,
			user: {
				_id: user._id,
				profilePicture: user.profilePicture,
			},
			isOwner: true,
		};

		setComments([...comments, newCommentWithOwner]);
		setNewCommentBody('');
	};

	const handleUpdateComment = async (commentId, updatedData) => {
		const updatedComment = await updateComment(commentId, updatedData);

		const updatedCommentWithOwner = {
			...updatedComment,
			isOwner:
				user && updatedComment.user && user._id === updatedComment.user._id,
		};

		setComments((prevComments) =>
			prevComments.map((comment) =>
				comment._id === commentId ? updatedCommentWithOwner : comment
			)
		);
	};

	const handleDelete = async (id) => {
		await deleteComment(id);
		setComments((prevComments) =>
			prevComments.filter((comment) => comment._id !== id)
		);
	};

	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			handleAddComment();
		}
	};

	return (
		<div className="lg:h-full w-full md:h-[250px] comments-container overflow-scroll flex flex-col justify-center relative no-scrollbar px-3 py-3 bg-[#C1E1F5]">
			<div className="h-full w-full overflow-scroll no-scrollbar">
				{comments.map((comment) => (
					<Comment
						key={comment._id}
						comment={comment}
						onDelete={handleDelete}
						onUpdate={handleUpdateComment}
					/>
				))}
				<div ref={messagesEndRef} />
			</div>
			<div className="new-comment mt-3 flex items-center relative px-3">
				<input
					type="text"
					placeholder="Add a comment..."
					value={newCommentBody}
					onChange={(e) => setNewCommentBody(e.target.value)}
					onKeyDown={handleKeyDown}
					className="w-full ps-4 pe-9 py-1 bg-[##EFF9FF] rounded-xl placeholder:text-[#575761] placeholder:font-outfit font-outfit"
				/>
				<button onClick={handleAddComment}>
					<img
						src={sent}
						alt="send button"
						width={30}
						className="absolute right-4 top-[2px]"
					/>
				</button>
			</div>
		</div>
	);
}
