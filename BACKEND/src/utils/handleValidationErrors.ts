import { validationResult } from 'express-validator';
import { NextFunction, Response, Request } from 'express';

export default (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({
      errors: errors.array(),
    });
  }

  next();
};
