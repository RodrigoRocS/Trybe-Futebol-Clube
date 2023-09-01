import { Request, Router, Response } from 'express';
import MatchController from '../controllers/match.controller';
import Validations from '../middlewares/InfoValidation';

const matchController = new MatchController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchController.takeAllMatches(req, res));

router.get('/:id', (req: Request, res: Response) => matchController.takeMatchById(req, res));

router.patch(
  '/:id/finish',
  Validations.tokenValidation,
  (req: Request, res: Response) => matchController.closehMatch(req, res),
);

export default router;
