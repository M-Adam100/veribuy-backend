const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = new Schema({
	username: {
		type: String
	},
	emailAddress: {
		type: String
	}

});
module.exports = mongoose.model('users', User);
