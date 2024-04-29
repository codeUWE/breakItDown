const Comment = require("../models/comments")

const createComment = async (req, res, next) => {
    try {
    // IS THIS CORRECT? - add user later
        const {body: {body, reply},
    } = req;

    const newComment = await Comment.create({ body});
    res.status(201).json(newComment);

    } catch (error) {
        console.log(error)
        res.status(500).send("Something went wrong!");
    }
};

const getComments = async (req, res) => {
    try {
    const comments = await Comment.find({});
    res.json(comments);
    } catch (error) {
        console.log(error)
        res.status(500).send("Something went wrong!");
    }
};

const getComment = async (req, res) => {
    try {
        const {
            params: { id },
        } = req;
    const comment = await Comment.findById(id);
    res.json(comment);

    } catch (error) {
        console.log(error)
        res.status(500).send("Something went wrong!");
    }
};

const updateComment = async (req, res) => {
    try {
        const {params: {id}, body} = req;
        const comment = await Comment.findByIdAndUpdate(id, body, {
            new: true,
        });
        res.json(comment);

    } catch (error) {
        console.log(error)
        res.status(500).send("Something went wrong!");
    }
};

const deleteComment = async (req, res) => {
    try {
        const {
            params: { id },
        } = req;
        const result = await Comment.findByIdAndDelete(id);
        res.json({success: true});

    } catch (error) {
        console.log(error)
        res.status(500).send("Something went wrong!");
    }
};

module.exports = { 
    getComments,
    getComment,
    createComment,
    updateComment,
    deleteComment
}