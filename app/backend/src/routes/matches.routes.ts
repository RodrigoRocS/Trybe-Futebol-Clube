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

router.patch(
  '/:id',
  Validations.tokenValidation,
  (req: Request, res: Response) => matchController.updateScore(req, res),
);

router.post(
  '/',
  Validations.tokenValidation,

  Validations.createMatchValidation,
  (req: Request, res: Response) => matchController.newMatch(req, res),
);

export default router;
