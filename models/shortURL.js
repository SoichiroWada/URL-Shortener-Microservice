const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const URLSchema = new Schema({
  originalURL: String,
  shorterURL: String
});

const ShortURL = mongoose.model('shortURL', URLSchema);

module.exports = ShortURL;
