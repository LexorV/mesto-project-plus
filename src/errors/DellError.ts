import { IErrorClass } from '../types/errors';
import { CONFLICT_DEL_CARDS } from '../constants/ErrorCode';

class DellError extends Error implements IErrorClass {
  statusCode:number;

  constructor(message:string) {
    super(message);
    this.statusCode = CONFLICT_DEL_CARDS;
  }
}

export default DellError;
