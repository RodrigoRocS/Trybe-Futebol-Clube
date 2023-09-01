import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchesService from '../services/matches.services';

export default class MatchController {
  constructor(
    private matchService = new MatchesService(),
  ) {}

  public async takeAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (inProgress === 'true' || inProgress === 'false') {
      const isInProgress = inProgress === 'true';

      const ServiceResponse = await this.matchService.filteredAllMatches(isInProgress);
      return res.status(200).json(ServiceResponse.data);
    }
    const ServiceResponse = await this.matchService.takeAllMatches();
    res.status(200).json(ServiceResponse.data);
  }

  public async takeMatchById(req: Request, res: Response) {
    const { id } = req.params;

    const serviceResponse = await this.matchService.takeMatchById(Number(id));

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    res.status(200).json(serviceResponse.data);
  }

  public async closehMatch(req: Request, res: Response) {
    const { id } = req.params;

    const serviceResponse = await this.matchService.closehMatch(Number(id));

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    return res.status(200).json({ message: 'Finished' });
  }
}
