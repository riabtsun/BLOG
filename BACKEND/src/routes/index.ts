import express from 'express';
const router = express.Router();

import authRouter from './auth/auth.router.js';
import postsRouter from './posts/posts.router.js';
import tagsRouter from './tags/tags.router.js';
import uploadRouter from './upload/upload.router.js';

router.use('/auth', authRouter);
router.use('/posts', postsRouter);
router.use('/tags', tagsRouter);
router.use('/upload', uploadRouter);

export default router;
