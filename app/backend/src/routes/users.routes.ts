import { Request, Router, Response } from 'express';
import UserController from '../controllers/user.controller';
import Validations from '../middlewares/InfoValidation';

const userController = new UserController();

const router = Router();

router.post(
  '/',
  Validations.userValidation,

  (req: Request, res: Response) => userController.login(req, res),
);

export default router;
