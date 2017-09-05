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
mongoose.connect(config.mongo.url, { useMongoClient: true });

app.listen(config.server.port, () => {
  console.log('Server listening on port', config.server.port);
});

module.exports = app;
