import { ILeaderboards } from '../Interfaces/Leaderboards/ILeaderboards';
import { IMatch } from '../Interfaces/Matches/IMatches';

export default class LdbUtils {
  static totalGames(matches: IMatch[], name: string | undefined) {
    return matches.filter((el: IMatch) => el.homeTeam?.teamName === name).length;
  }

  static totalWin(matches: IMatch[], name: string | undefined) {
    const games = matches.filter((el: IMatch) => el.homeTeam?.teamName === name);
    const wins = games
      .reduce((acc, cur) => (cur.homeTeamGoals > cur.awayTeamGoals ? acc + 1 : acc), 0);
    return wins;
  }

  static totalDraw(matches: IMatch[], name: string | undefined) {
    const games = matches.filter((el: IMatch) => el.homeTeam?.teamName === name);
    const draw = games
      .reduce((acc, cur) => (cur.homeTeamGoals === cur.awayTeamGoals ? acc + 1 : acc), 0);
    return draw;
  }

  static totalLoss(matches: IMatch[], name: string | undefined) {
    const games = matches.filter((el: IMatch) => el.homeTeam?.teamName === name);
    const loss = games
      .reduce((acc, cur) => (cur.homeTeamGoals < cur.awayTeamGoals ? acc + 1 : acc), 0);
    return loss;
  }

  static totalGoals(matches: IMatch[], name: string | undefined) {
    const games = matches.filter((el: IMatch) => el.homeTeam?.teamName === name);
    const goals = games
      .reduce((acc, cur) => acc + cur.homeTeamGoals, 0);
    return goals;
  }

  static totalGoalsLoss(matches: IMatch[], name: string | undefined) {
    const games = matches.filter((el: IMatch) => el.homeTeam?.teamName === name);
    const goals = games
      .reduce((acc, cur) => acc + cur.awayTeamGoals, 0);
    return goals;
  }

  static totalPoints(matches: IMatch[], name: string | undefined) {
    const wins = this.totalWin(matches, name) * 3;

    const draws = this.totalDraw(matches, name);

    const total = wins + draws;
    if (total <= 0) { return 0; }

    return total;
  }

  static goalsBalance(matches: IMatch[], name: string | undefined) {
    const goals = this.totalGoals(matches, name);
    const goalsOwn = this.totalGoalsLoss(matches, name);

    return goals - goalsOwn;
  }

  static efficiency(matches: IMatch[], name: string | undefined) {
    const totalPoints = this.totalPoints(matches, name);
    const totalGames = this.totalGames(matches, name);

    const efficiency = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);
    return efficiency;
  }

  static sortLeaderboard(leaderboard: ILeaderboards[]) {
    const sortedLeaderboard = [...leaderboard];

    sortedLeaderboard.sort((a: ILeaderboards, b: ILeaderboards) => {
      if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
      if (a.totalVictories !== b.totalVictories) return b.totalVictories - a.totalVictories;
      if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;

      return b.goalsFavor - a.goalsFavor;
    });

    return sortedLeaderboard;
  }

  static unique(leaderboard: ILeaderboards[]) {
    const unique = leaderboard.reduce((acc: ILeaderboards[], cur) => {
      if (!acc.some((e) => e.name === cur.name)) {
        acc.push(cur);
      }
      return acc;
    }, []);

    return this.sortLeaderboard(unique);
  }
}
