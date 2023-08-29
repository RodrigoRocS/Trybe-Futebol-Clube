import { Request, Router, Response } from 'express';
import UserController from '../controllers/user.controller';

const userController = new UserController();

const router = Router();

router.post('/', (req: Request, res: Response) => userController.login(req, res));

export default router;
