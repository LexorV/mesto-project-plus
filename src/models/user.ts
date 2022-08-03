import { model, Schema} from 'mongoose';
export interface IUser {
  name: string;
  about:string;
  avatar:string;
}
const userShema = new Schema<IUser>({
  name:{
    type: String,
    required: true,
    maxLength:30,
    minLength:2,
  },
  about:{
    type: String,
    required: true,
    maxLength:200,
    minLength:2,
  },
  avatar:{
    type: String,
    required: true,
  }
})
export default model<IUser>('user', userShema)