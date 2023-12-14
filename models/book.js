// models/book.js
const mongoose = require('../config/db');

const bookSchema = new mongoose.Schema({
  name: String,
  isbn_no: String,
  author: String,
  date_published: String,
  date_of_purchase: String,
  is_available: { type: Boolean, default: true },
  borrowed_by: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', default: null },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
