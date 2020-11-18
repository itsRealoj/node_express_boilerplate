const { error: logger } = require('../config/logger')('app', { error: true });

const InternalServerError = require('../errors/InternalServerError');
const RouteNotFoundError = require('../errors/RouteNotFoundError');

module.exports.errorLogger = (err, req, res, next) => {
  logger(err.stack);

  next(err);
};

module.exports.internalServerErrorHandler = (err, req, res, next) => {
  const error = new InternalServerError();

  res.status(500);
  res.json(error);
};

module.exports.routeNotFoundErrorHandler = (req, res, next) => {
  const error = new RouteNotFoundError();

  res.status(404);
  res.json(error);
};
