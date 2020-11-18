/**
 * Create route not found error instance.
 *
 * Returns route not found error instance.
 */

class RouteNotFoundError extends Error {
  constructor(...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RouteNotFoundError);
    }

    this.name = 'RouteNotFoundError';
    this.date = new Date();
    this.message = 'Route not found.';
  }
}

module.exports = (req, res, next) => {
  const error = new RouteNotFoundError();

  res.status(404);
  res.json(error);
};
