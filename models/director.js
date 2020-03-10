// Schema for the directors collection in MongoDB

const mongoose = require('mongoose');
const {Schema} = mongoose;

const directorSchema = new Schema({
    name: String,
    age: Number
});

module.exports = mongoose.model('Director', directorSchema);