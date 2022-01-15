const mongoose = require('mongoose');

////////// Mongoose schema for signup input //////////
const signup = new mongoose.Schema({
        name: { type: String, required: true},
        username: { type: String, required: true, unique: true},
        password: { type: String, required: true}
    },
    // This is the collection name in mongodb.
    { collection: 'userRec'}
)

////////// Schema into model for signup input //////////
const model = mongoose.model('userRec', signup);

////////// Exporting the model //////////

module.exports = model