var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userSchema = new Schema({
    firstName: {type: String, required: true },
    lastName: {type: String, required: true },
    email: {type: String, required: true }
});

module.exports = mongoose.model('users', userSchema);