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

  public async takeMatchById(id: number): Promise<ServiceResponse<IMatch>> {
    const match = await this.matchesModel.findById(id);
    return { status: 'SUCCESSFUL', data: match };
  }
}
