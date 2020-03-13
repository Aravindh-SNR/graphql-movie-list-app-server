// Schema for the movies collection in MongoDB

const mongoose = require('mongoose');
const {Schema} = mongoose;

const movieSchema = new Schema({
    title: String,
    year: Number,
    directorId: String
});

module.exports = mongoose.model('Movie', movieSchema);