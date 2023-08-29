import * as bcrypt from 'bcryptjs';
import { ILogin } from '../Interfaces/Login/ILogin';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import { IUserModel } from '../Interfaces/Users/IUserModel';
import UserModel from '../models/UserModel';
import { IToken } from '../Interfaces/Login/IToken';
import JWT from '../utils/JWT';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
  ) {

  }

  public async login(data: ILogin):Promise<ServiceResponse<IToken | ServiceMessage>> {
    const user = await this.userModel.findbyEmail(data.email);
    console.log(user);

    if (!user) return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    if (!bcrypt.compareSync(data.password, user.password)) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }
    const token = JWT.sign({ email: data.email });
    return { status: 'SUCCESSFUL', data: { token } };
  }
}
