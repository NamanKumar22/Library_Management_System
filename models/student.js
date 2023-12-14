// models/student.js
const mongoose = require('../config/db');

const studentSchema = new mongoose.Schema({
  name: String,
  isbn_no: String,
  age: String,
  date_of_birth: String,
  major: String,
  borrowed_books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
