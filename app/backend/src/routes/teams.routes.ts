import { Request, Router, Response } from 'express';
import TeamController from '../controllers/team.controller';

const teamController = new TeamController();

const router = Router();

router.get('/', (req: Request, res: Response) => teamController.takeAllTeams(req, res));

router.get('/:id', (req: Request, res: Response) => teamController.takeTeamById(req, res));

export default router;
