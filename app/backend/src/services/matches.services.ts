import MatchesModel from '../models/MatchesModel';
import { IMatchModel } from '../Interfaces/Matches/IMatchesModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatch } from '../Interfaces/Matches/IMatches';

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
}
