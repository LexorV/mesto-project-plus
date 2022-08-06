import { model, Schema } from 'mongoose';
import validator from 'validator';

export interface IUser {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}
const userShema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    maxLength: 30,
    minLength: 2,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(e:string) {
        return validator.isEmail(e);
      },
    },
    message: 'Неправильный Email',
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator(e:string) {
        return validator.isAlphanumeric(e);
      },
    },
    message: 'Введён некоректный пароль',
  },
  about: {
    type: String,
    required: true,
    maxLength: 200,
    minLength: 2,
  },
  avatar: {
    type: String,
    required: true,
  },
});
export default model<IUser>('user', userShema);
