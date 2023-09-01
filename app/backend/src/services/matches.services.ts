import MatchesModel from '../models/MatchesModel';
import { IMatchModel } from '../Interfaces/Matches/IMatchesModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatch } from '../Interfaces/Matches/IMatches';
import { NewEntity } from '../Interfaces';

export default class MatchesService {
  constructor(
    private matchesModel: IMatchModel = new MatchesModel(),
  ) {}

  public async takeAllMatches(): Promise<ServiceResponse<IMatch[]>> {
    const matches = await this.matchesModel.findAll();
    return { status: 'SUCCESSFUL', data: matches };
  }

  public async filteredAllMatches(inProgress: boolean): Promise<ServiceResponse<IMatch[]>> {
    const matches = await this.matchesModel.findAll();
    const filteredMatches = matches.filter((match) => match.inProgress === inProgress);

    return { status: 'SUCCESSFUL', data: filteredMatches };
  }

  public async takeMatchById(id: number): Promise<ServiceResponse<IMatch>> {
    const match = await this.matchesModel.findById(id);
    return { status: 'SUCCESSFUL', data: match };
  }

  public async closehMatch(id: number): Promise<ServiceResponse<null>> {
    const match = await this.matchesModel.findById(id);

    if (!match) {
      return { status: 'NOT_FOUND', data: { message: 'Match not found' } };
    }
    await this.matchesModel.update(id, { inProgress: false });

    return { status: 'SUCCESSFUL', data: null };
  }

  public async updateScore(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<ServiceResponse<IMatch | null>> {
    const match = await this.matchesModel.findById(id);

    if (!match) {
      return { status: 'NOT_FOUND', data: { message: 'Match not found' } };
    }

    const updatedMatch = await this.matchesModel.update(id, { homeTeamGoals, awayTeamGoals });

    return { status: 'SUCCESSFUL', data: updatedMatch };
  }

  private async validateTeams(
    homeTeamId: number,
    awayTeamId: number,
  ): Promise<ServiceResponse<null>> {
    const homeTeam = await this.matchesModel.findById(homeTeamId);
    const awayTeam = await this.matchesModel.findById(awayTeamId);

    if (!homeTeam || !awayTeam) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }

    return { status: 'SUCCESSFUL', data: null };
  }

  public async newMatch(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<ServiceResponse<IMatch | null>> {
    const checkTeam = await this.validateTeams(homeTeamId, awayTeamId);
    if (checkTeam.status !== 'SUCCESSFUL') { return checkTeam; }
    const newMatch: NewEntity<IMatch> = {
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    };
    const matchCreated = await this.matchesModel.create(newMatch);
    return { status: 'SUCCESSFUL', data: matchCreated };
  }
}
