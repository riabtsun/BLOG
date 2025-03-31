import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import { loginValidation, postCreateValidation, registerValidation } from './validations/validations.js';
import { checkAuth, handleValidationErrors } from './utils/index.js';
import { UserController, PostController } from './controllers/index.js';

mongoose
  .connect('mongodb://localhost:27017/blog')
  .then(() => {
    console.log('DB Ok');
  })
  .catch((err) => {
    console.log('DB error', err);
  });

const app: Express = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World!');
});

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);

app.post('/upload', checkAuth, upload.single('image'), (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ message: 'No file' });
    return;
  }
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get('/posts/', PostController.getAllPosts);
app.get('/posts/:id', PostController.getOnePost);

app.get('/auth/me', checkAuth, UserController.getMe);
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);

app.delete('/posts/:id', checkAuth, PostController.removePost);
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.updatePost);

app.listen(4444, (err): void => {
  if (err) {
    return console.log(`Server error ${err}`);
  }
  console.log('Server OK');
});
