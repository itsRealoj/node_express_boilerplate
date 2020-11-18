const { error: logger } = require('../config/logger')('app', { error: true });

module.exports = (err, req, res, next) => {
  logger(err.stack);

  next(err);
};
