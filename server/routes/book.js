const express = require('express');
const bookController = require('../controllers/book');
const bookRouter = express.Router();

bookRouter
  .route('/')
  .get(bookController.find)
  .post(bookController.create);

bookRouter
  .route('/:id')
  .get(bookController.findById)
  .patch(bookController.updateById)
  .delete(bookController.deleteById);

module.exports = bookRouter;
