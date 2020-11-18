/**
 * Create internal server error instance.
 *
 * Returns internal server error instance.
 */

class InternalServerError extends Error {
  constructor(...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InternalServerError);
    }

    this.name = 'InternalServerError';
    this.date = new Date();
    this.message = 'Internal server error.';
  }
}

module.exports = (err, req, res, next) => {
  const error = new InternalServerError();

  res.status(500);
  res.json(error);
};
