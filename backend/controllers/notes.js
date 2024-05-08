const Note = require('../models/notes');

const createNote = async (req, res) => {
	try {
		const {
			body: { body, title, tags },
		} = req;

		const newNote = await Note.create({ body, title, tags });
		res.status(201).json(newNote);
	} catch (error) {
		console.log(error);
		res.status(500).send('Something went wrong!');
	}
};

const getNotes = async (req, res) => {
	try {
		const notes = await Note.find({});
		res.json(notes);
	} catch (error) {
		console.log(error);
		res.status(500).send('Something went wrong!');
	}
};

const getNote = async (req, res) => {
	try {
		const {
			params: { id },
		} = req;
		const note = await Note.findById(id);
		res.json(note);
	} catch (error) {
		console.log(error);
		res.status(500).send('Something went wrong!');
	}
};

const updateNote = async (req, res) => {
	try {
		const {
			body,
			params: { id },
		} = req;
		const note = await Note.findByIdAndUpdate(id, body, {
			new: true,
		});
		res.json(note);
	} catch (error) {
		console.log(error);
		res.status(500).send('Something went wrong!');
	}
};

const deleteNote = async (req, res) => {
	try {
		const {
			params: { id },
		} = req;
		const result = await Note.findByIdAndDelete(id);
		res.json({ success: true });
	} catch (error) {
		console.log(error);
		res.status(500).send('Something went wrong!');
	}
};

module.exports = {
	getNotes,
	getNote,
	createNote,
	updateNote,
	deleteNote,
};
