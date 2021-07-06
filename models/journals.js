const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const journalSchema = new Schema({
    title: { type: String, required: true },
    body: String,
    userID: { type: String, required: true, unique: true }
}, { timestamps: true });

const Journal = mongoose.model('Journals', journalSchema);

module.exports = Journal;