const winston = require('winston');
const expressWinston = require('express-winston');

const requestLoggs = expressWinston.logger({
  transports: [new winston.transports.File({ filename: 'request.log' })],
  format: winston.format.json(),
});

const errorLoggs = expressWinston.errorLogger({
  transports: [new winston.transports.File({ filename: 'error.log' })],
  format: winston.format.json(),
});

module.exports = {
  requestLoggs,
  errorLoggs,
};
