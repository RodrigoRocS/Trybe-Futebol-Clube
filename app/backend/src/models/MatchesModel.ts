import { IMatchModel } from '../Interfaces/Matches/IMatchesModel';
import Match from '../database/models/Matches';
import { IMatch } from '../Interfaces/Matches/IMatches';
import Team from '../database/models/Teams';
import { NewEntity } from '../Interfaces';

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

  async update(id: IMatch['id'], data: Partial<IMatch>): Promise<IMatch | null> {
    const [affectedRows] = await this.model.update(
      { ...data },
      { where: { id } },
    );
    if (affectedRows === 0) { return null; }
    const user = await this.model.findByPk(id);
    return user;
  }

  async create(data: NewEntity<IMatch>): Promise<IMatch> {
    const createdMatch = await this.model.create(data);
    return createdMatch;
  }
}
