import { ICRUDModelCreator, ICRUDModelReader } from '../ICRUD';
import { IUser } from './IUser';

export interface IUserModel extends ICRUDModelCreator<IUser>, ICRUDModelReader<IUser>{
  findbyEmail(email: IUser['email']): Promise<IUser | null>
}
