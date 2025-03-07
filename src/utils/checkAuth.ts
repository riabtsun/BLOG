import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

export interface CustomRequest extends Request {
  userId: mongoose.Types.ObjectId;
}

export default (req: Request, res: Response, next: NextFunction) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
  if (token) {
    try {
      const decoded = jwt.verify(token, 'secret123');
      if (typeof decoded === 'object' && decoded !== null) {
        (req as CustomRequest).userId = decoded._id;
        next();
      }
    } catch (err) {
      res.status(403).json({
        message: 'Unauthorized',
      });
    }
  } else {
    res.status(403).json({
      message: 'Unauthorized',
    });
  }
};
