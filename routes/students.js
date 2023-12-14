// routes/students.js
const express = require('express');
const router = express.Router();
const Student = require('../models/student');

// Create a new student entry
router.post('/', async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Retrieve all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a student entry by ID
router.put('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a student entry by ID
router.delete('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get information about books borrowed by a student
router.get('/:id/borrowings', async (req, res) => {
    try {
      const student = await Student.findById(req.params.id).populate('borrowed_books');
      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }
  
      res.json({
        student: {
          name: student.name,
          isbn_no: student.isbn_no,
          // Add more student attributes as needed
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
