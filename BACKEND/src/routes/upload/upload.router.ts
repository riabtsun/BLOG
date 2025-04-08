import express from 'express';
import multer from 'multer';
import { checkAuth } from '../../utils/index.js';
import { validationImgFile } from './upload.controller.js';

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.post('/', checkAuth, upload.single('image'), validationImgFile);
export default router;
