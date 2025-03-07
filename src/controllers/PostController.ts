import PostModel from '../models/Post.js';
import mongoose from 'mongoose';
import { Response, Request } from 'express';

interface IPost {
  title: string;
  text: string;
  imageUrl: string;
  tags: string[];
  userId: string;
}

interface CustomRequest extends Request {
  userId?: mongoose.Types.ObjectId;
}

export const create = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      userId: req.userId,
    });
    const post = await doc.save();
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed create post',
    });
  }
};
