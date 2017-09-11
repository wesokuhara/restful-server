const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bluebird = require('bluebird');
const config = require('./config');
const routes = require('./server/routes');

const app = express();
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('tiny'));
app.use('/api', routes);

mongoose.Promise = bluebird;
const mongoUrl = process.env.MONGODB_URI || config.mongo.url;
mongoose.connect(mongoUrl, { useMongoClient: true }, () => {
  console.log('MongoDB connection started');
});

const port = process.env.PORT || config.server.port;
app.listen(port, () => {
  console.log('Server listening on port', port);
});

process.on('SIGINT', () => {
  mongoose.connection.close(function () {
    console.log('MongoDB connection closed');
    process.exit(0);
  });
});

module.exports = app;
