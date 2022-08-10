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
    default: 'Жак-Ив Кусто',
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
    select: false,
    validate: {
      validator(e:string) {
        return (/[^a-zA-Z0-9]/.test(e));
      },
    },
    message: 'Введён некоректный пароль',
  },
  about: {
    type: String,
    required: true,
    maxLength: 200,
    minLength: 2,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    required: true,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
});
export default model<IUser>('user', userShema);
