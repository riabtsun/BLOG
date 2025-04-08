import { Request, Response } from 'express';

export const validationImgFile = (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ message: 'No file' });
    return;
  }
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
};
