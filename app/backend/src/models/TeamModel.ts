import { ITeamModel } from '../Interfaces/Teams/ITeamModel';
import { ITeams } from '../Interfaces/Teams/ITeam';
import Teams from '../database/models/Teams';

export default class TeamModel implements ITeamModel {
  private model = Teams;

  async findAll(): Promise<ITeams[]> {
    const dbData = await this.model.findAll();
    return dbData.map(({ id, teamName }) => (
      { id, teamName }
    ));
  }

  async findById(id: ITeams['id']): Promise<ITeams | null> {
    const user = await this.model.findByPk(id);
    if (!user) return null;
    return { ...user };
  }
}
