class BaseHttpError extends Error {
  constructor(message, status = 500, details) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

class NotFoundError extends BaseHttpError {
  constructor(message = '资源不存在', details) {
    super(message, 404, details);
  }
}

class BadRequestError extends BaseHttpError {
  constructor(message = '请求无效', details) {
    super(message, 400, details);
  }
}

module.exports = {
  BaseHttpError,
  NotFoundError,
  BadRequestError
};
