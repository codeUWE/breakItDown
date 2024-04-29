const { Schema, model } = require('mongoose');

const noteSchema = new Schema({
    title: {type: String, required: true},
    body: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    task: {type: Schema.Types.ObjectId, ref: 'Task'},
    isDeleted: {type: Boolean, default: false},
    isShared: {type: Boolean, default: false},
    isPinned: {type: Boolean, default: false},
    tags: [{type: String}],
    lifeEdit: {type: String},
    // files: [{type: String}],
}
);

const Note = model('Note', noteSchema);

module.exports = Note;

