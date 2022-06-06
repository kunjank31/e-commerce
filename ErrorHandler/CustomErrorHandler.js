class CustomErrorHandler extends Error {
  constructor(message, status) {
    super();
    this.message = message;
    this.status = status;
  }
  static alreadyExists(message = "Email is already taken") {
    return new CustomErrorHandler(message, 406);
  }
  static notFound(message = "Wrong Caredentials") {
    return new CustomErrorHandler(message, 404);
  }
  static unAuthorized(message = "Unauthorized") {
    return new CustomErrorHandler(message, 401);
  }
  static notAllowed(message = "NOT ALLOWED") {
    return new CustomErrorHandler(message, 401);
  }
  static WrongValue(message = "Wrong Key") {
    return new CustomErrorHandler(message, 401);
  }
  static allFieldsRequired(message = "All Fields are required!") {
    return new CustomErrorHandler(message, 400);
  }
}

module.exports = CustomErrorHandler;