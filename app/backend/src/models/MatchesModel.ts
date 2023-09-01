import { IMatchModel } from '../Interfaces/Matches/IMatchesModel';
import Match from '../database/models/Matches';
import { IMatch } from '../Interfaces/Matches/IMatches';
import Team from '../database/models/Teams';

export default class MatchesModel implements IMatchModel {
  private model = Match;

  async findAll(): Promise<IMatch[]> {
    const data = await this.model.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return data;
  }

  async findById(id: IMatch['id']): Promise<IMatch | null> {
    const user = await this.model.findByPk(id);
    if (!user) return null;
    return user;
  }

  async update(id: IMatch['id']): Promise<IMatch | null> {
    await this.model.update(
      { inProgress: false },
      { where: { id } },
    );

    return null;
  }
}
