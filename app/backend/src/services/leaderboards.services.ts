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
      totalPoints: LdbUtils.totalPoints(filteredMatches, e.homeTeam?.teamName, true),
      totalGames: LdbUtils.totalGames(filteredMatches, e.homeTeam?.teamName, true),
      totalVictories: LdbUtils.totalWin(filteredMatches, e.homeTeam?.teamName, true),
      totalDraws: LdbUtils.totalDraw(filteredMatches, e.homeTeam?.teamName, true),
      totalLosses: LdbUtils.totalLoss(filteredMatches, e.homeTeam?.teamName, true),
      goalsFavor: LdbUtils.totalGoals(filteredMatches, e.homeTeam?.teamName, true),
      goalsOwn: LdbUtils.totalGoalsLoss(filteredMatches, e.homeTeam?.teamName, true),
      goalsBalance: LdbUtils.goalsBalance(filteredMatches, e.homeTeam?.teamName, true),
      efficiency: LdbUtils.efficiency(filteredMatches, e.homeTeam?.teamName, true),
    }));

    const newLeaderboard = [...leaderboard];

    return { status: 'SUCCESSFUL', data: LdbUtils.unique(newLeaderboard) };
  }

  public async awayLeaderboard(): Promise<ServiceResponse<ILeaderboards[]>> {
    const matches = await this.matchesModel.findAll();
    const filteredMatches = matches.filter((match) => match.inProgress === false);
    const leaderboard = filteredMatches.map((e) => ({
      name: e.awayTeam?.teamName || '',
      totalPoints: LdbUtils.totalPoints(filteredMatches, e.awayTeam?.teamName, false),
      totalGames: LdbUtils.totalGames(filteredMatches, e.awayTeam?.teamName, false),
      totalVictories: LdbUtils.totalWin(filteredMatches, e.awayTeam?.teamName, false),
      totalDraws: LdbUtils.totalDraw(filteredMatches, e.awayTeam?.teamName, false),
      totalLosses: LdbUtils.totalLoss(filteredMatches, e.awayTeam?.teamName, false),
      goalsFavor: LdbUtils.totalGoals(filteredMatches, e.awayTeam?.teamName, false),
      goalsOwn: LdbUtils.totalGoalsLoss(filteredMatches, e.awayTeam?.teamName, false),
      goalsBalance: LdbUtils.goalsBalance(filteredMatches, e.awayTeam?.teamName, false),
      efficiency: LdbUtils.efficiency(filteredMatches, e.awayTeam?.teamName, false),
    }));

    const newLeaderboard = [...leaderboard];

    return { status: 'SUCCESSFUL', data: LdbUtils.unique(newLeaderboard) };
  }
}
