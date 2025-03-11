import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel, { IUser, IUserDocument } from '../models/User.js';
import { UserType } from '../types.js';
import { CustomRequest } from '../utils/checkAuth.js';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
    }

    const password: string = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel<IUser>({
      email: req.body.email,
      fullName: req.body.fullName,
      passwordHash: hash,
      avatarUrl: req.body.avatarUrl,
    });

    const user: IUserDocument = await doc.save();

    const token = jwt.sign({ _id: user._id }, 'secret123', { expiresIn: '30d' });

    const { passwordHash, ...userData } = (user._doc as IUserDocument) ?? {};

    res.json({ ...userData, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Registration error' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const user: IUserDocument = await UserModel.findOne({ email: req.body.email }).orFail();
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    }

    const isValidPass: boolean = await bcrypt.compare(req.body.password, user.passwordHash);

    if (!isValidPass) {
      res.status(400).json({
        message: 'Invalid login or password',
      });
    }
    const token = jwt.sign({ _id: user._id }, 'secret123', { expiresIn: '30d' });
    const { passwordHash, ...userData } = (user._doc as IUserDocument) ?? {};

    res.json({ ...userData, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Auth error' });
  }
};

export const getMe = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const user: IUserDocument = await UserModel.findById(req.userId).orFail();
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    }

    const { passwordHash, ...userData } = (user._doc as IUserDocument) ?? {};
    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(403).json({
      message: 'Access denied',
    });
  }
};
