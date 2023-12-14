// routes/books.js
const express = require('express');
const router = express.Router();
const app = express();
const Book = require('../models/book');
const Student = require('../models/student');





// Create a new book entry
router.post('/', async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Retrieve all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a book entry by ID
router.put('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a book entry by ID
router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Borrow a book by ID
router.post('/:id/borrow', async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
  
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
  
      if (!book.is_available) {
        return res.status(400).json({ error: 'Book is not available for borrowing' });
      }
  
      const studentId = req.body.studentId;
  
      const student = await Student.findById(studentId);
  
      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }
  
      // Update book availability status and borrowed_by field
      book.is_available = false;
      book.borrowed_by = studentId;
      await book.save();
  
      // Update student's borrowed_books array
      student.borrowed_books.push(book._id);
      await student.save();
  
      res.json({ message: 'Book borrowed successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Return a borrowed book by ID
  router.post('/:id/return', async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
  
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
  
      if (book.is_available) {
        return res.status(400).json({ error: 'Book is not currently borrowed' });
      }
  
      // Get the student ID from the book
      const studentId = book.borrowed_by;
  
      // Update book availability status and borrowed_by field
      book.is_available = true;
      book.borrowed_by = null;
      await book.save();
  
      // Remove book ID from the student's borrowed_books array
      const student = await Student.findById(studentId);
      if (student) {
        student.borrowed_books = student.borrowed_books.filter(b => b.toString() !== book._id.toString());
        await student.save();
      }
  
      res.json({ message: 'Book returned successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

  // Get information about books borrowed by a student
router.get('/:studentId/borrowings', async (req, res) => {
    try {
      const student = await Student.findById(req.params.studentId).populate('borrowed_books');
      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }
  
      res.json({
        student: {
          name: student.name,
          isbn_no: student.isbn_no,
          age: student.age,
          date_of_birth: student.date_of_birth,
          major: student.major,
        },
        borrowed_books: student.borrowed_books.map(book => ({
          name: book.name,
          isbn_no: book.isbn_no,
          author: book.author,
          date_published: book.date_published,
          date_of_purchase: book.date_of_purchase,
        })),
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
module.exports = router;
