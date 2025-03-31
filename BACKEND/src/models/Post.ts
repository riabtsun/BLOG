import mongoose, { Document, Schema, Model } from 'mongoose';

interface IPostUser extends Document {
  type: Schema.Types.ObjectId;
  ref: string;
  required: boolean;
  unique: boolean;
}

export interface IPostDocument extends Document {
  fullName: string;
  text: string;
  tags: string[];
  viewsCount: number;
  user: IPostUser;
  imageUrl: string;
}

const PostSchema: Schema<IPostDocument> = new Schema(
  {
    fullName: { type: String },
    text: { type: String, required: true, unique: false },
    tags: { type: [String], default: [] },
    viewsCount: { type: Number, default: 0 },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: false },
    imageUrl: String,
  },
  { timestamps: true },
);

const PostModel: Model<IPostDocument> = mongoose.model('Post', PostSchema);
export default PostModel;
