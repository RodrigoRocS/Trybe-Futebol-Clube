import { Request, Response } from 'express';
import TeamService from '../services/team.services';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class TeamController {
  constructor(
    private teamService = new TeamService(),
  ) {}

  public async takeAllTeams(_req: Request, res: Response) {
    const ServiceResponse = await this.teamService.takeAllTeams();
    res.status(200).json(ServiceResponse.data);
  }

  public async takeTeamById(req: Request, res: Response) {
    const { id } = req.params;

    const serviceResponse = await this.teamService.takeTeamById(Number(id));

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    res.status(200).json(serviceResponse.data);
  }
}
