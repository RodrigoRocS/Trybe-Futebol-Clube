import * as bcrypt from 'bcryptjs';
import { ILogin } from '../Interfaces/Login/ILogin';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import { IUserModel } from '../Interfaces/Users/IUserModel';
import UserModel from '../models/UserModel';
import { IToken } from '../Interfaces/Login/IToken';
import JWT from '../utils/JWT';
import { IUser } from '../Interfaces/Users/IUser';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
  ) {

  }

  public async login(data: ILogin):Promise<ServiceResponse<IToken | ServiceMessage>> {
    const user = await this.userModel.findbyEmail(data.email);

    if (!user) return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    if (!bcrypt.compareSync(data.password, user.password)) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }
    const token = JWT.sign({ email: data.email });
    return { status: 'SUCCESSFUL', data: { token } };
  }

  public async verifyRole(data: IToken):Promise<ServiceResponse<Partial<IUser> | ServiceMessage>> {
    const verifyResult = JWT.verify(data.token);

    if (typeof verifyResult === 'string') {
      return { status: 'UNAUTHORIZED', data: { message: verifyResult } };
    }

    const { email } = verifyResult;
    const user = await this.userModel.findbyEmail(email);

    if (!user) {
      return { status: 'UNAUTHORIZED', data: { message: 'User not found' } };
    }

    const { role } = user;

    return { status: 'SUCCESSFUL', data: { role } };
  }
}
