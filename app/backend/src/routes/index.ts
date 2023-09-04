import { Router } from 'express';
import teamRouter from './teams.routes';
import userRouter from './users.routes';
import matchRouter from './matches.routes';
import leaderboardRouter from './leaderboards.routes';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', userRouter);
router.use('/leaderboard', leaderboardRouter);
router.use('/matches', matchRouter);

export default router;
