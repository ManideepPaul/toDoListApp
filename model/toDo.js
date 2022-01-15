const mongoose = require('mongoose')

///////// Mongoose schema for task input //////////
const add = new mongoose.Schema({
        task: String,
        username: String
    },
    {collection: 'toDo'}
);

////////// Schema into model for task input //////////
const model = mongoose.model('toDo', add);

module.exports = model