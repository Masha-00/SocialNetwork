class CustomError extends Error {
  badRequest(description) {
    this.err = { message: 'Bad request', code: 400, description };
    return this.err;
  }

  unauthorized(description) {
    this.err = { message: 'Unauthorized', code: 401, description };
    return this.err;
  }

  forbidden(description) {
    this.err = { message: 'Forbidden', code: 403, description };
    return this.err;
  }

  notFound(description) {
    this.err = { message: 'Not Found', code: 404, description };
    return this.err;
  }

  serverError(description) {
    this.err = { message: 'Internal Server Error', code: 500, description };
    return this.err;
  }
}

module.exports = CustomError;
