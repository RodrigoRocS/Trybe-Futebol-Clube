import { ICRUDModelCreator, ICRUDModelReader, ICRUDModelUpdater } from '../ICRUD';
import { ILeaderboards } from './ILeaderboards';

export interface ILeaderboardModel extends ICRUDModelReader<ILeaderboards>,
  ICRUDModelUpdater<ILeaderboards>, ICRUDModelCreator<ILeaderboards>{}
