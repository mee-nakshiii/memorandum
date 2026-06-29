// Centralized error handler middleware
const errorHandler = (err, req, res, next) => {
  // Default to 500 Internal Server Error if statusCode is not set or still 200 OK
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    error: err.message || 'Internal Server Error'
  });
};

module.exports = {
  errorHandler
};
