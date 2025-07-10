export class CustomError extends Error {
  constructor(
    public readonly statusCode: number,
    public override readonly message: string,
  ) {
    super(message);
  }

  static BadRequest(message: string): CustomError {
    return new CustomError(400, message);
  }

  static Unauthorized(message: string): CustomError {
    return new CustomError(401, message);
  }

  static Forbidden(message: string): CustomError {
    return new CustomError(403, message);
  }

  static NotFound(message: string): CustomError {
    return new CustomError(404, message);
  }

  static InternalServerError(message: string): CustomError {
    return new CustomError(500, message);
  }

  static Conflict(message: string): CustomError {
    return new CustomError(409, message);
  }

  static UnprocessableEntity(message: string): CustomError {
    return new CustomError(422, message);
  }
}
