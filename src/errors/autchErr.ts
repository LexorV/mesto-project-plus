import { IErrorClass } from '../types/errors';
import { NOT_AUTH } from '../constants/ErrorCode';

class AutchErr extends Error implements IErrorClass {
  statusCode:number;

  constructor(message:string) {
    super(message);
    this.statusCode = NOT_AUTH;
  }
}

export default AutchErr;
