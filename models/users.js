const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {type: String, unique: true, required: true},
    userPassword: {type: String}
}, { timestamps: true });

const User = mongoose.model('User' , userSchema);

module.exports = User;