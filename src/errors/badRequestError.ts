import { IErrorClass } from '../types/errors';
import { COMING_DATA_INCORRECT } from '../constants/ErrorCode';

class BadRequestError extends Error implements IErrorClass {
  statusCode:number;

  constructor(message:string) {
    super(message);
    this.statusCode = COMING_DATA_INCORRECT;
  }
}

export default BadRequestError;
