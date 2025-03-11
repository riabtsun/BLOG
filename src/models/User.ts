import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IUser {
  fullName: string;
  email: string;
  passwordHash: string;
  avatarUrl: string;
}

export interface IUserDocument extends IUser, Document {
  _doc: {};
}

const UserSchema: Schema<IUserDocument> = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    avatarUrl: String,
  },
  { timestamps: true },
);

const UserModel: Model<IUserDocument> = mongoose.model('User', UserSchema);
export default UserModel;
