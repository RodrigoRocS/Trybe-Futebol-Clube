import { ILeaderboards } from '../Interfaces/Leaderboards/ILeaderboards';
import { IMatch } from '../Interfaces/Matches/IMatches';

export default class LdbUtils {
  static totalGames(matches: IMatch[], name: string | undefined, isHome: boolean) {
    if (isHome) { return matches.filter((el: IMatch) => el.homeTeam?.teamName === name).length; }
    return matches.filter((el: IMatch) => el.awayTeam?.teamName === name).length;
  }

  static totalWin(matches: IMatch[], name: string | undefined, isHome: boolean) {
    if (isHome) {
      const games = matches.filter((el: IMatch) => el.homeTeam?.teamName === name);
      const wins = games
        .reduce((acc, cur) => (cur.homeTeamGoals > cur.awayTeamGoals ? acc + 1 : acc), 0);
      return wins;
    }
    const games = matches.filter((el: IMatch) => el.awayTeam?.teamName === name);
    const wins = games
      .reduce((acc, cur) => (cur.awayTeamGoals > cur.homeTeamGoals ? acc + 1 : acc), 0);
    return wins;
  }

  static totalDraw(matches: IMatch[], name: string | undefined, isHome: boolean) {
    if (isHome) {
      const games = matches.filter((el: IMatch) => el.homeTeam?.teamName === name);
      const draw = games
        .reduce((acc, cur) => (cur.homeTeamGoals === cur.awayTeamGoals ? acc + 1 : acc), 0);
      return draw;
    }
    const games = matches.filter((el: IMatch) => el.awayTeam?.teamName === name);
    const draw = games
      .reduce((acc, cur) => (cur.awayTeamGoals === cur.homeTeamGoals ? acc + 1 : acc), 0);
    return draw;
  }

  static totalLoss(matches: IMatch[], name: string | undefined, isHome: boolean) {
    if (isHome) {
      const games = matches.filter((el: IMatch) => el.homeTeam?.teamName === name);
      const loss = games
        .reduce((acc, cur) => (cur.homeTeamGoals < cur.awayTeamGoals ? acc + 1 : acc), 0);
      return loss;
    }
    const games = matches.filter((el: IMatch) => el.awayTeam?.teamName === name);
    const loss = games
      .reduce((acc, cur) => (cur.awayTeamGoals < cur.homeTeamGoals ? acc + 1 : acc), 0);
    return loss;
  }

  static totalGoals(matches: IMatch[], name: string | undefined, isHome: boolean) {
    if (isHome) {
      const games = matches.filter((el: IMatch) => el.homeTeam?.teamName === name);
      const goals = games
        .reduce((acc, cur) => acc + cur.homeTeamGoals, 0);
      return goals;
    }
    const games = matches.filter((el: IMatch) => el.awayTeam?.teamName === name);
    const goals = games
      .reduce((acc, cur) => acc + cur.awayTeamGoals, 0);
    return goals;
  }

  static totalGoalsLoss(matches: IMatch[], name: string | undefined, isHome: boolean) {
    if (isHome) {
      const games = matches.filter((el: IMatch) => el.homeTeam?.teamName === name);
      const goals = games
        .reduce((acc, cur) => acc + cur.awayTeamGoals, 0);
      return goals;
    }
    const games = matches.filter((el: IMatch) => el.awayTeam?.teamName === name);
    const goals = games
      .reduce((acc, cur) => acc + cur.homeTeamGoals, 0);
    return goals;
  }

  static totalPoints(matches: IMatch[], name: string | undefined, isHome: boolean) {
    const wins = this.totalWin(matches, name, isHome) * 3;

    const draws = this.totalDraw(matches, name, isHome);

    const total = wins + draws;
    if (total <= 0) { return 0; }

    return total;
  }

  static goalsBalance(matches: IMatch[], name: string | undefined, isHome: boolean) {
    const goals = this.totalGoals(matches, name, isHome);
    const goalsOwn = this.totalGoalsLoss(matches, name, isHome);

    return goals - goalsOwn;
  }

  static efficiency(matches: IMatch[], name: string | undefined, isHome: boolean) {
    const totalPoints = this.totalPoints(matches, name, isHome);
    const totalGames = this.totalGames(matches, name, isHome);

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
