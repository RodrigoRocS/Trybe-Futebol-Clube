import { Request, Router, Response } from 'express';
import MatchController from '../controllers/match.controller';

const matchController = new MatchController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchController.takeAllMatches(req, res));

router.get('/:id', (req: Request, res: Response) => matchController.takeMatchById(req, res));

export default router;
