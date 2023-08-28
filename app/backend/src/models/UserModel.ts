import { IUser } from '../Interfaces/Users/IUser';
import { NewEntity } from '../Interfaces';
import { IUserModel } from '../Interfaces/Users/IUserModel';
import User from '../database/models/Users';

export default class UserModel implements IUserModel {
  private model = User;

  async create(data: NewEntity<IUser>): Promise<IUser> {
    const user = await this.model.create(data);
    const { email, password, id, username, role } = user;
    return { email, password, id, username, role };
  }

  async findbyEmail(email: string): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) return null;
    const { password, id, username, role } = user;
    return { email, password, id, username, role };
  }

  async findAll(): Promise<IUser[]> {
    const dbData = await this.model.findAll();
    return dbData.map(({ email, password, id, username, role }) => (
      { email, password, id, username, role }
    ));
  }

  async findById(id: IUser['id']): Promise<IUser | null> {
    const user = await this.model.findByPk(id);
    if (!user) return null;
    const { email, password, username, role } = user;
    return { email, password, id, username, role };
  }
}
