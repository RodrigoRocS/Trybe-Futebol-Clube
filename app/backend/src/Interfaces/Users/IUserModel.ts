import { IUser } from './IUser';

export interface IUserModel {
  findbyEmail(email: IUser['email']): Promise<IUser | null>
}
