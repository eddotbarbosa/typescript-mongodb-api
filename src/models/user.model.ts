import {model, Schema, Types} from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser {
  name: string;
  username: string;
  email: string;
  password: string;
  posts: Types.Array<Types.ObjectId>;
  createdAt: Date;
}

const userSchema: Schema = new Schema<IUser>({
  name: {type: String, required: true},
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true, select: false},
  posts: [{type: Schema.Types.ObjectId, ref: 'Post'}],
  createdAt: {type: Date, default: Date.now}
});

userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) return next();

    const encryptPassword = await bcrypt.hash(this.password, 10);

    this.password = encryptPassword;

    next();
  } catch (err) {
    next(err)
  }
});

const User = model<IUser>('User', userSchema);

export default User;
