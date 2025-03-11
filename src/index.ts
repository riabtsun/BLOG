import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import { loginValidation, postCreateValidation, registerValidation } from './validations/validations.js';
import checkAuth, { CustomRequest } from './utils/checkAuth.js';
import * as UserController from './controllers/UserController.js';
import * as PostController from './controllers/PostController.js';

mongoose
  .connect('mongodb://localhost:27017/blog')
  .then(() => {
    console.log('DB Ok');
  })
  .catch((err) => {
    console.log('DB error', err);
  });

const app: Express = express();
app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World!');
});

app.post('/auth/login', loginValidation, UserController.login);

app.post('/auth/register', registerValidation, UserController.register);

app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/posts', checkAuth, postCreateValidation, PostController.create);

app.listen(4444, (err): void => {
  if (err) {
    return console.log(`Server error ${err}`);
  }
  console.log('Server OK');
});
