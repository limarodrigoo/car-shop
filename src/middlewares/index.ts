import { Request, Response, NextFunction } from 'express';

export default class IdMiddleware {
  static validate(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (id.length !== 24) {
        return res.status(400)
          .json({ error: 'Id must have 24 hexadecimal characters' });
      }
      next();
    } catch (e) {
      return res.status(500).json('Ops! Something happened');
    }
  }
}