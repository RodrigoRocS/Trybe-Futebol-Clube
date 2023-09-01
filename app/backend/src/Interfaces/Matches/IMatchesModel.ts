import { ICRUDModelReader, ICRUDModelUpdater } from '../ICRUD';
import { IMatch } from './IMatches';

export interface IMatchModel extends ICRUDModelReader<IMatch>, ICRUDModelUpdater<IMatch>{}
