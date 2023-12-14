document.addEventListener('DOMContentLoaded', () => {
    const bookList = document.getElementById('books');
    const newBookForm = document.getElementById('new-book-form');
  
    // Function to fetch and display books
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/books');
        const books = await response.json();
  
        // Clear existing list
        bookList.innerHTML = '';
  
        // Display books in the list
        books.forEach((book) => {
          const li = document.createElement('li');
          li.textContent = `${book.name} by ${book.author}`;
          bookList.appendChild(li);
        });
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
  
    // Fetch and display books on page load
    fetchBooks();
  
    // Event listener for form submission
    newBookForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const bookName = document.getElementById('bookName').value;
      const isbn = document.getElementById('isbn').value;
      const author = document.getElementById('author').value;
      const publishedDate = document.getElementById('publishedDate').value;
      const purchaseDate = document.getElementById('purchaseDate').value;
  
      try {
        // Make a POST request to add a new book
        await fetch('http://localhost:3000/api/books', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: bookName,
            isbn_no: isbn,
            author: author,
            date_published: publishedDate,
            date_of_purchase: purchaseDate,
          }),
        });
  
        // Fetch and display updated book list
        fetchBooks();
  
        // Clear form inputs
        newBookForm.reset();
      } catch (error) {
        console.error('Error adding new book:', error);
      }
    });
  });
  