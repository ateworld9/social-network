enum STATUS_CODES {
  UPGRADE = 101,
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UN_AUTHORISED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  PROXY_AUTHENTICATION_REQUIRED = 407,
  I_AM_TEAPOT = 418,
  INTERNAL_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,

	//add new code from MDN if it need
}

class AppError extends Error {
  public readonly name: string;
  public readonly statusCode: STATUS_CODES;
  public readonly isOperational: boolean;
  public readonly errorStack: any;
  public readonly logError: any;
  constructor(
    name: string,
    statusCode: STATUS_CODES,
    description: string,
    isOperational: boolean,
    errorStack?: string,
    logingErrorResponse?: any,
  ) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errorStack = errorStack;
    this.logError = logingErrorResponse;
    Error.captureStackTrace(this);
  }
}

//api Specific Errors
class APIError extends AppError {
  constructor(
    name: string,
    statusCode = STATUS_CODES.INTERNAL_ERROR,
    description = 'Internal Server Error',
    isOperational = true,
  ) {
    super(name, statusCode, description, isOperational);
  }
}

//400
class BadRequestError extends AppError {
  constructor(description = 'Bad request', logingErrorResponse: any) {
    super(
      'BAD_REQUEST',
      STATUS_CODES.BAD_REQUEST,
      description,
      true,
      undefined,
      logingErrorResponse,
    );
  }
}

//400
class ValidationError extends AppError {
  constructor(description = 'Validation Error', errorStack: any) {
    super(
      'BAD REQUEST',
      STATUS_CODES.BAD_REQUEST,
      description,
      true,
      errorStack,
    );
  }
}

export {AppError, APIError, BadRequestError, ValidationError, STATUS_CODES};
