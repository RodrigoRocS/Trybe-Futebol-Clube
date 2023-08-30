import { ICRUDModelCreator } from '../ICRUD';
import { IUser } from './IUser';

export interface IUserModel extends ICRUDModelCreator<IUser>{
  findbyEmail(email: IUser['email']): Promise<IUser | null>
}
