import { IErrorClass } from '../types/errors';
import { CONFLICT_NAME } from '../constants/ErrorCode';

class ConflictNameError extends Error implements IErrorClass {
  statusCode:number;

  constructor(message:string) {
    super(message);
    this.statusCode = CONFLICT_NAME;
  }
}

export default ConflictNameError;
