import { Request, Router, Response } from 'express';
// import Validations from '../middlewares/InfoValidation';
import LeaderboardController from '../controllers/leaderboard.controller';

const leaderboardController = new LeaderboardController();

const router = Router();

router.get(
  '/home',
  (req: Request, res: Response) => leaderboardController.homeLeaderboard(req, res),
);

export default router;
