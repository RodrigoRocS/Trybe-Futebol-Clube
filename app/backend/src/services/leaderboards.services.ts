import MatchesModel from '../models/MatchesModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatchModel } from '../Interfaces/Matches/IMatchesModel';
import { ILeaderboards } from '../Interfaces/Leaderboards/ILeaderboards';
import LdbUtils from '../utils/leaderboardUtils';

export default class LeaderboardService {
  constructor(
    private matchesModel: IMatchModel = new MatchesModel(),
  ) {}

  public async homeLeaderboard(): Promise<ServiceResponse<ILeaderboards[]>> {
    const matches = await this.matchesModel.findAll();
    const filteredMatches = matches.filter((match) => match.inProgress === false);
    const leaderboard = filteredMatches.map((e) => ({
      name: e.homeTeam?.teamName || '',
      totalPoints: LdbUtils.totalPoints(filteredMatches, e.homeTeam?.teamName),
      totalGames: LdbUtils.totalGames(filteredMatches, e.homeTeam?.teamName),
      totalVictories: LdbUtils.totalWin(filteredMatches, e.homeTeam?.teamName),
      totalDraws: LdbUtils.totalDraw(filteredMatches, e.homeTeam?.teamName),
      totalLosses: LdbUtils.totalLoss(filteredMatches, e.homeTeam?.teamName),
      goalsFavor: LdbUtils.totalGoals(filteredMatches, e.homeTeam?.teamName),
      goalsOwn: LdbUtils.totalGoalsLoss(filteredMatches, e.homeTeam?.teamName),
      goalsBalance: LdbUtils.goalsBalance(filteredMatches, e.homeTeam?.teamName),
      efficiency: LdbUtils.efficiency(filteredMatches, e.homeTeam?.teamName),
    }));

    const newLeaderboard = [...leaderboard];

    return { status: 'SUCCESSFUL', data: LdbUtils.unique(newLeaderboard) };
  }
}
