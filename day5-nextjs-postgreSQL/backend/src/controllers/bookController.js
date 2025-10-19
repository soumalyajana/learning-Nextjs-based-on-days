const bookService = require('../services/bookService');

// ✅ Add a new book
exports.addBook = async (req, res) => {
  try {
    const { title, publishedDate, authorId } = req.body;

    if (!title || !publishedDate || !authorId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const date = new Date(publishedDate);
    if (isNaN(date.getTime())) {
      return res.status(400).json({ error: "Invalid publishedDate" });
    }

    const book = await bookService.addBook(title, authorId, date);
    res.status(201).json(book);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
};

// ✅ Get book by ID
exports.getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const book = await bookService.getBookById(Number(id));

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json(book);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
};

// ✅ Get all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await bookService.getAllBooks();
    res.status(200).json(books);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
};

// ✅ Update book title
exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const updatedBook = await bookService.updateBook(Number(id), title);
    res.status(200).json(updatedBook);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};



// ✅ Delete book
exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBook = await bookService.deleteBook(Number(id));
    res
      .status(200)
      .json({ message: `Deleted book with id ${deletedBook.id}` });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
};



