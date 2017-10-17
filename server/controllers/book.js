const Book = require('../models/book');

const find = (req, res, next) => {
  Book.find(req.query)
    .then(books => res.json(books))
    .catch(next);
};

const findById = (req, res, next) => {
  Book.findById(req.params.id)
    .then(book => {
      if (!book) res.status(404).send('Book not found.');
      else res.json(book);
    })
    .catch(next);
};

const create = (req, res, next) => {
  const newBook = new Book(req.body);
  newBook
    .save()
    .then(book => res.json(book))
    .catch(next);
};

const updateById = (req, res, next) => {
  Book.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(book => {
      if (!book) res.status(404).send('Book not found.');
      else res.json(book);
    })
    .catch(next);
};

const deleteById = (req, res, next) => {
  Book.findByIdAndRemove(req.params.id)
    .then(book => {
      if (!book) res.status(404).send('Book not found.');
      else res.json(book);
    })
    .catch(next);
};

module.exports = {
  find,
  findById,
  create,
  updateById,
  deleteById
};
