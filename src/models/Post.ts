import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
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

export default mongoose.model('Post', PostSchema);
