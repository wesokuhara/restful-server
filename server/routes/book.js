const express = require('express');
const bookController = require('../controllers/book');
const bookRouter = express.Router();

bookRouter.route('/')
  .get(bookController.findAll)
  .post(bookController.create);

bookRouter.route('/:id')
  .get(bookController.findById)
  .delete(bookController.deleteById);

module.exports = bookRouter;
