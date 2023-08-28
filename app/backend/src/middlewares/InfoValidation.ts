import { NextFunction, Request, Response } from 'express';
import JWT from '../utils/JWT';

class Validations {
  static validateUser(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    next();
  }

  static validateToken(req: Request, res: Response, next: NextFunction): Response | void {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const validToken = JWT.verify(token);
    if (validToken === 'Token must be a valid Token') {
      return res.status(401).json({ message: validToken });
    }
    next();
  }
}

export default Validations;
