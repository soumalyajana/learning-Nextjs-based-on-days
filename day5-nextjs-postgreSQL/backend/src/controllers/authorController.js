const express = require('express'); // You don’t need to alias as 'e'
const authorService = require('../services/authorService');

exports.addAuthor = async (req, res) => {
    try {
        const { name } = req.body;
        const author = await authorService.addAuthor(name);
        res.status(201).json(author);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message || 'Internal server error' });
    }
}

exports.deleteAuthor = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAuthor = await authorService.deleteAuthor(id);
        res.status(200).json(deletedAuthor);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message || 'Internal server error' });
    }
}

exports.getAllAuthors = async (req, res) => {
  try {
    const authors = await authorService.getAllAuthors();
    res.status(200).json(authors);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};


exports.getAuthorById = async (req, res) => {
  try {
    const { id } = req.params;
    const author = await authorService.getAuthorById(id);
    res.status(200).json(author);
  } catch (err) {
    res.status(404).json({ error: err.message || "Author not found" });
  }
};

