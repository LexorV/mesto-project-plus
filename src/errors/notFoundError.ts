import {IErrorClass} from '../types/errors';
import {NOT_DATA_SERVER} from '../constants/ErrorCode';
class NotFoundError extends Error implements IErrorClass {
  statusCode:number
  constructor(message:string) {
    super(message);
    this.statusCode = NOT_DATA_SERVER;
  }
}

module.exports = NotFoundError;