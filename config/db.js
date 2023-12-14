// config/db.js
const mongoose = require('mongoose');
const DB_URI = 'mongodb+srv://namankumar:dHYia3JHSFMmE0HG@cluster0.orwlxb3.mongodb.net/';

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = mongoose;
