const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ✅ Add a new book
async function addBook(title, authorId, publishedDate) {
  try {
    const newBook = await prisma.book.create({
      data: {
        title,
        publishedDate: new Date(publishedDate),
        author: {
          connect: { id: Number(authorId) },
        },
      },
      include: { author: true },
    });

    return newBook;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// ✅ Get all books
async function getAllBooks() {
  try {
    const books = await prisma.book.findMany({
      include: { author: true },
    });
    return books;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// ✅ Get a single book by ID
async function getBookById(id) {
  try {
    const book = await prisma.book.findUnique({
      where: { id: Number(id) },
      include: { author: true },
    });

    if (!book) {
      throw new Error("Book not found");
    }

    return book;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function updateBook(id, newTitle) {
  try {
    const book = await prisma.book.findUnique({
      where: { id },
      include: { author: true },
    });
    if (!book) throw new Error("Book not found");

    const updatedBook = await prisma.book.update({
      where: { id },
      data: { title: newTitle },
      include: { author: true },
    });

    return updatedBook;
  } catch (e) {
    console.error(e);
    throw e;
  }
}


// ✅ Delete book by ID
async function deleteBook(id) {
  try {
    const deletedBook = await prisma.book.delete({
      where: { id: Number(id) },
      include: { author: true },
    });
    return deletedBook;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = {
  addBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};
