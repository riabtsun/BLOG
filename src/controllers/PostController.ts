import PostModel from '../models/Post.js';
import mongoose from 'mongoose';
import { Response, Request } from 'express';

export const getAllPosts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const posts = await PostModel.find()
      .populate({ path: 'user', select: ['name', 'avatar'] })
      .exec();
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed get posts',
    });
  }
};

export const getOnePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const postId = req.params.id;
    const doc = await PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      { $inc: { viewsCount: 1 } },
      { returnDocument: 'after' },
    );
    if (!doc) {
      res.status(404).json({
        message: 'Post not found',
      });
    }
    res.json(doc);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Can find the post',
    });
  }
};

export const removePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const postId = req.params.id;
    const doc = await PostModel.findOneAndDelete({ _id: postId });

    if (!doc) {
      res.status(404).json({
        message: "Can't find post to delete",
      });
      return;
    }

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed delete post',
    });
  }
};

export const updatePost = async (req: CustomRequest, res: Response) => {
  try {
    const postId = req.params.id;
    await PostModel.updateOne(
      { _id: postId },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        user: req.userId,
        tags: req.body.tags,
      },
    );
    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed update post',
    });
  }
};

interface CustomRequest extends Request {
  userId?: mongoose.Types.ObjectId;
}

export const create = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      user: req.userId,
      tags: req.body.tags,
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
