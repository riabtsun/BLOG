import express, { Express } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import indexRouter from './routes/index.js';

mongoose
  .connect('mongodb://localhost:27017/blog')
  .then(() => {
    console.log('DB Ok');
  })
  .catch((err) => {
    console.log('DB error', err);
  });

const app: Express = express();

app.use('/', express.json(), cors(), indexRouter);

app.use('/uploads', express.static('uploads'));

app.listen(4444, (err): void => {
  if (err) {
    return console.log(`Server error ${err}`);
  }
  console.log('Server OK');
});
