type ApiErrorAttributes = {
  statusCode?: number;
  message: string;
  metadata?: unknown;
};

export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly metadata?: unknown;

  constructor({
    statusCode = 500,
    message = "Internal Server Error",
    metadata,
  }: ApiErrorAttributes) {
    super(message);
    this.statusCode = statusCode;
    this.metadata = metadata;
  }
}

export class BadRequestError extends ApiError {
  constructor({ message, metadata }: ApiErrorAttributes) {
    super({ statusCode: 400, message, metadata });
  }
}

export class NotFoundError extends ApiError {
  constructor({ message, metadata }: ApiErrorAttributes) {
    super({ statusCode: 404, message, metadata });
  }
}

export class UnauthorizedError extends ApiError {
  constructor({ message, metadata }: ApiErrorAttributes) {
    super({ statusCode: 401, message, metadata });
  }
}
