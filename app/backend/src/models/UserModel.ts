import { IUser } from '../Interfaces/Users/IUser';
import { IUserModel } from '../Interfaces/Users/IUserModel';
import User from '../database/models/Users';

export default class UserModel implements IUserModel {
  private model = User;

  async findbyEmail(email: string): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) return null;
    const { password, id, username, role } = user;
    return { email, password, id, username, role };
  }
}
