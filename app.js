require('dotenv').config();

const env = process.env.NODE_ENV || 'development';

const express = require('express');
const cors = require('cors')();
const morgan = require('morgan');

const requestLoggerFormat = env === 'development' ? 'dev' : 'combined';
const requestLogger = morgan(requestLoggerFormat);
const jsonParser = express.json();
const urlEncodedParser = express.urlencoded({ extended: true });

const app = express();

const errorLogger = require('./errors/errorLogger');
const routeNotFoundErrorHandler = require('./errors/routeNotFoundErrorHandler');
const errorHandler = require('./errors/errorHandler');

//
const healthTest = (req, res) => {
  res.status(200);
  res.send('API is running!');
};

app.use(cors);
app.use(requestLogger);
app.use(jsonParser);
app.use(urlEncodedParser);

app.all('/', healthTest);

app.use(errorLogger);
app.use(routeNotFoundErrorHandler);
app.use(errorHandler);

module.exports = app;
