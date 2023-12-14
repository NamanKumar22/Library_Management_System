// index.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const bookRoutes = require('./routes/books');
const studentRoutes = require('./routes/students');
const cors = require('cors');


// Enable CORS for all routes
app.use(cors());

app.use(express.json());

app.use('/api/books', bookRoutes);

app.use('/api/students', studentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
