const express = require('express');
const bookRouter = require('./book');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to the Mongo REST API');
});

router.use('/books', bookRouter);

module.exports = router;
