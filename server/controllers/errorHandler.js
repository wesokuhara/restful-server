const errorHandler = (err, req, res, next) => {
  switch (err.name) {
    case 'ValidationError':
      res.status(400);
      break;
    case 'CastError':
      res.status(400);
      break;
    default:
      res.status(500);
  }

  res.send({ error: err.message });
};

module.exports = errorHandler;
