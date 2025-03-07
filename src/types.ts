import { IUser } from './models/User.js';
import mongoose from 'mongoose';

export interface UserType extends mongoose.Document {
  _doc?: IUser;
  email: string;
  fullName: string;
  passwordHash: string;
  avatarUrl: string;
  _id: mongoose.Types.ObjectId;
  __v: number;
}
