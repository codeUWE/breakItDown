import React from 'react';

function DeleteSubtaskDialog({ open, onClose, onDelete, subtask }) {
	if (!open) {
		return null;
	}

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
			<div className="bg-white rounded-3xl p-6 w-full max-w-md mx-auto">
				<div className="font-outfit text-[22px] text-[#F55D3E] mb-4">
					Delete Subtask &quot;
					<span className="font-[600] text-[#681FDE]">{subtask?.title}</span>
					&quot;?
				</div>
				<div className="text-[18px] font-outfit font-[500] text-black mb-4">
					Are you sure you want to delete this subtask? This action cannot be
					undone.
				</div>
				<div className="flex justify-end mt-4">
					<button
						onClick={onClose}
						className="me-4 py-1 w-32 text-white rounded-2xl flex justify-center items-center gap-2 mt-4 bg-[#FE4A49] font-outfit font-[500]"
					>
						Cancel
					</button>
					<button
						onClick={() => onDelete(subtask._id)}
						className="py-1 w-32 text-white rounded-2xl flex justify-center items-center gap-2 mt-4 bg-[#08A045] font-outfit font-[500]"
					>
						Confirm
					</button>
				</div>
			</div>
		</div>
	);
}

export default DeleteSubtaskDialog;
