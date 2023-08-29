import { NextFunction, Request, Response } from 'express';
import JWT from '../utils/JWT';
import UserModel from '../models/UserModel';

class Validations {
  static async userValidation(req: Request, res: Response, next: NextFunction):
  Promise<Response | void> {
    const { email, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email) || password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const userModel = new UserModel();
    const user = await userModel.findbyEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    next();
  }

  static tokenValidation(req: Request, res: Response, next: NextFunction): Response | void {
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
