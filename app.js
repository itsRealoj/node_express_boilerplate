require('dotenv').config();

const env = process.env.NODE_ENV || 'development';

const express = require('express');
const cors = require('cors')();
const morgan = require('morgan');

const requestLoggerFormat = env === 'development' ? 'dev' : 'combined';
const requestLogger = morgan(requestLoggerFormat);
const jsonParser = express.json();
const urlEncodedParser = express.urlencoded({ extended: true });

const routes = require('./routes');

const app = express();

const {
  errorLogger,
  routeNotFoundErrorHandler,
  internalServerErrorHandler,
} = require('./utils/errorHandlers');

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

app.use(routes);

app.use(errorLogger);
app.use(routeNotFoundErrorHandler);
app.use(internalServerErrorHandler);

module.exports = app;
