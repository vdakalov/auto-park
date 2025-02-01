import { HttpStatus } from './http-status';

export type ExceptionObject = {
  name: string;
  message: string;
  code: number;
  location: string;
  httpStatus?: HttpStatus;
  stack?: string;
};

export default class Exception extends Error {

  public static fromError(error: Error, code?: number, httpStatus?: HttpStatus): Exception {
    const exception = new this(error.message, code, httpStatus);
    exception.stack = error.stack;
    return exception;
  }

  public readonly code: number;

  public readonly location: string = window.location.toString();

  public readonly httpStatus: HttpStatus | undefined;

  constructor(message: string, code: number = 0, httpStatus?: HttpStatus) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.httpStatus = httpStatus;
  }

  public toObject(): ExceptionObject {
    return {
      name: this.constructor.name,
      message: this.message,
      code: this.code,
      location: this.location,
      httpStatus: this.httpStatus,
      stack: this.stack
    };
  }

  public toJSON(): string {
    return JSON.stringify(this.toObject());
  }
}
