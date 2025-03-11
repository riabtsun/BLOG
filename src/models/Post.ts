import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IPostDocument extends Document {
  fullName: string;
  text: string;
  tags: string[];
  viewsCount: number;
  user: string;
  imageUrl: string;
}

const PostSchema: Schema<IPostDocument> = new Schema(
  {
    fullName: { type: String, required: true },
    text: { type: String, required: true, unique: true },
    tags: { type: [String], default: [] },
    viewsCount: { type: Number, default: 0 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    imageUrl: String,
  },
  { timestamps: true },
);

const PostModel: Model<IPostDocument> = mongoose.model('Post', PostSchema);
export default PostModel;
