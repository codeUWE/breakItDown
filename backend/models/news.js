const { Schema, model } = require('mongoose');

const newsSchema = new Schema({
    name: { type: String, required: true },
    profilePicture: { type: String }, 
    body: { type: String, required: true }
});

const   News = model('News', newsSchema);

module.exports = News;
