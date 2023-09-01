import { NextFunction, Request, Response } from 'express';
import JWT from '../utils/JWT';

class Validations {
  static async userValidation(req: Request, res: Response, next: NextFunction):
  Promise<Response | void> {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.match(emailRegex) || password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    next();
  }

  static tokenValidation(req: Request, res: Response, next: NextFunction): Response | void {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const tokenWhitoutBearer = token.startsWith('Bearer ')
      ? token.split(' ')[1]
      : token;
    const validToken = JWT.verify(tokenWhitoutBearer);

    if (typeof validToken === 'string') {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    next();
  }

  static async createMatchValidation(req: Request, res: Response, next: NextFunction):
  Promise<Response | void> {
    const { homeTeamId, awayTeamId } = req.body;

    if (homeTeamId === awayTeamId) {
      return res.status(422).json(
        { message: 'It is not possible to create a match with two equal teams' },
      );
    }

    next();
  }
}

export default Validations;
