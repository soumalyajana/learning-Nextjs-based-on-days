const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Add a new author
async function addAuthor(name) {
    try {
        const newlyCreatedAuthor = await prisma.author.create({
            data: { name }
        });
        return newlyCreatedAuthor;
    } catch(err) {
        console.error(err);
        throw err;
    }
}

// Delete an author by ID
async function deleteAuthor(id) {
    try {
        const deletedAuthor = await prisma.author.delete({
            where: { id: Number(id) },
            // Remove this if 'books' relation does not exist in schema
            // include: { books: true }
        });
        return deletedAuthor;
    } catch(err) {
        console.error(err);
        throw err;
    }
}



async function getAllAuthors() {
  try {
    const authors = await prisma.author.findMany({
      include: {
        books: true, // optional — shows books each author has written
      },
    });
    return authors;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function getAuthorById(id) {
  try {
    const author = await prisma.author.findUnique({
      where: { id: Number(id) },
      include: { books: true }, // optional: include books of the author
    });

    if (!author) {
      throw new Error("Author not found");
    }

    return author;
  } catch (err) {
    console.error(err);
    throw err;
  }
}


module.exports = { addAuthor, deleteAuthor , getAllAuthors , getAuthorById };
