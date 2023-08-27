import { Request, Response } from 'express';
import TeamService from '../services/team.services';

export default class TeamController {
  constructor(
    private teamService = new TeamService(),
  ) {}

  public async takeAllTeams(_req: Request, res: Response) {
    const ServiceResponse = await this.teamService.takeAllTeams();
    res.status(200).json(ServiceResponse.data);
  }
}
