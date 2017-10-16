const Book = require('../models/book');

const find = (req, res) => {
  Book.find(req.query)
    .then(books => res.json(books))
    .catch(err => res.status(500).send(err));
};

const findById = (req, res) => {
  Book.findById(req.params.id)
    .then(book => {
      if (!book) res.status(404).send();
      else res.json(book);
    })
    .catch(err => res.status(500).send(err));
};

const create = (req, res) => {
  const newBook = new Book(req.body);
  newBook
    .save()
    .then(book => res.json(book))
    .catch(err => res.status(500).send(err));
};

const updateById = (req, res) => {
  Book.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(book => {
      if (!book) res.status(404).send();
      else res.json(book);
    })
    .catch(err => res.status(500).send(err));
};

const deleteById = (req, res) => {
  Book.findByIdAndRemove(req.params.id)
    .then(book => {
      if (!book) res.status(404).send();
      else res.json(book);
    })
    .catch(err => res.status(500).send(err));
};

module.exports = {
  find,
  findById,
  create,
  updateById,
  deleteById
};
