import { IErrorClass } from '../types/errors';
import { REPEATED_NAME_ERROR } from '../constants/ErrorCode';

class RepeatedNameError extends Error implements IErrorClass {
  statusCode:number;

  constructor(message:string) {
    super(message);
    this.statusCode = REPEATED_NAME_ERROR;
  }
}

export default RepeatedNameError;
