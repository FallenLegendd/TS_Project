function formatResponse(statusCode, message, data = null, error = null) {
  return {
    statusCode,
    message,
    error,
    data,
  };
}

module.exports = formatResponse;
