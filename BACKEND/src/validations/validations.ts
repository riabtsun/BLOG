import { body, ValidationChain } from 'express-validator';

export const registerValidation: ValidationChain[] = [
  body('email', 'Incorrect email').isEmail(),
  body('password', 'Password must be at least 5 symbols').isLength({ min: 5 }),
  body('fullName', 'Full name must be at least 3 symbols').isLength({ min: 3 }),
  body('avatarUrl', 'Incorrect avatar url').optional().isURL(),
];

export const loginValidation: ValidationChain[] = [
  body('email', 'Incorrect email').isEmail(),
  body('password', 'Password must be at least 5 symbols').isLength({ min: 5 }),
];

export const postCreateValidation: ValidationChain[] = [
  body('title', 'Title must be at least 3 symbols').isLength({ min: 3 }).isString(),
  body('text', 'Text must be at least 3 symbols').isLength({ min: 3 }).isString(),
  body('tags', 'Incorrect tags format').optional().isArray(),
  body('imageUrl', 'Incorrect image url').optional().isURL(),
];
