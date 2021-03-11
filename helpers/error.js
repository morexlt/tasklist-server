class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}
const handleError = (err, req, res, next) => {
  if (err instanceof ErrorHandler) {
    return res.status(err.statusCode).json({
      status: 'error',
      statusCode: err.statusCode,
      message: err.message,
    });
  }
  return res.status(500).json({
    status: 'error',
    message: err.message,
  });
};

module.exports = {
  ErrorHandler,
  handleError,
};
