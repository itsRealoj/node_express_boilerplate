const path = require('path');
const { createLogger, format, transports } = require('winston');

const logPath = process.env.APP_LOG_PATH || path.join(__dirname, '../logs/');
const env = process.env.NODE_ENV || 'development';

/**
 * Configure logger.
 *
 * @param {string} type Logger type.
 *
 * @param {object} options Logger level options (error, warn, info, debug).
 *
 * Returns logger transport(s).
 */

const getLogger = (type, options) => {
  // Log format.

  const logFormat = format.combine(
    format.timestamp({ format: 'YYYY-MM--DD HH:mm:ss' }),
    format.printf((log) => `${log.timestamp} :: ${log.message}`)
  );

  // Type log path

  const typeLogPath = path.join(logPath, type);

  // Logger object.

  const logger = createLogger({
    transports: [],
  });

  // Add error level log if error level is true.

  if (options.error) {
    const trans = new transports.File({
      level: 'error',
      filename: path.join(typeLogPath, 'error.log'),
      format: logFormat,
    });

    logger.add(trans);
  }

  // Add warn level log if warn level is true.

  if (options.warn) {
    const trans = new transports.File({
      level: 'warn',
      filename: path.join(typeLogPath, 'warn.log'),
      format: logFormat,
    });

    logger.add(trans);
  }

  // Add info level log if info level is true.

  if (options.info) {
    const trans = new transports.File({
      level: 'info',
      filename: path.join(typeLogPath, 'info.log'),
      format: logFormat,
    });

    logger.add(trans);
  }

  // Add debug level log if error debug is true.

  if (options.debug) {
    const trans = new transports.File({
      level: 'debug',
      filename: path.join(typeLogPath, 'debug.log'),
      format: logFormat,
    });

    logger.add(trans);
  }

  // Show log in console if in development mode.

  if (env === 'development') {
    const trans = new transports.Console();

    logger.add(trans);
  }

  return logger;
};

const defaultOptions = {
  error: false,
  warn: false,
  info: false,
  debug: false,
};

module.exports = (type, options = defaultOptions) => getLogger(type, options);
