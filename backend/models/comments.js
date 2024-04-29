const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    // add to user later: required: true
    body: {type: String, required: true},
    isDeleted: {type: Boolean, default: false},
    // do we need a seperate schema for reply? if so delete reply
    reply: {type: Schema.Types.ObjectId, ref: 'Comment'},
    // can replyId reference to reply
    task: {type: Schema.Types.ObjectId, ref: 'Task'},
    subtask: {type: Schema.Types.ObjectId, ref: 'Subtask'},
},
{timestamp: true}
);

const Comment = model('Comment', commentSchema);

module.exports = Comment;