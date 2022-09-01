class ErrorHandler {
  constructor(status, msg) {
    this.status = status;
    this.message = msg;
  }

  // user is not giving all information to enter
  static validationError(message = "All fields are required dumbo!") {
    return new ErrorHandler(422, message); // ErrorHandler is a constructor here
  }
  // product not found error
  static notFoundError(message = "Not found!") {
    return new ErrorHandler(404, message); // ErrorHandler is a constructor here
  }

  static serverError(message = "Internal error") {
    return new ErrorHandler(500, message); // ErrorHandler is a constructor here
  }
  // for users with wrong id pass basically if users apiKey doesn't matches
  static forbidden(message = "Not allowed!") {
    return new ErrorHandler(403, message); // ErrorHandler is a constructor here
  }
}

module.exports = ErrorHandler;
