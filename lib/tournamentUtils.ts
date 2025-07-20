import type { Match, Team, Stage } from '@prisma/client';

export function generateGroupStageMatches(teams: Team[], groupSize: number = 4, tournamentId: string, duration: number): Omit<Match, 'id' | 'createdAt' | 'updatedAt' | 'team1Score' | 'team2Score' | 'winnerId' | 'date'>[] {
  const matches: Omit<Match, 'id' | 'createdAt' | 'updatedAt' | 'team1Score' | 'team2Score' | 'winnerId' | 'date'>[] = [];
  const groups = [];
  for (let i = 0; i < teams.length; i += groupSize) {
    groups.push(teams.slice(i, i + groupSize));
  }
  groups.forEach((group) => {
    for (let a = 0; a < group.length; a++) {
      for (let b = a + 1; b < group.length; b++) {
        matches.push({
          team1Id: group[a].id,
          team2Id: group[b].id,
          duration,
          tournamentId,
          stage: "GROUP" as Stage,
        });
      }
    }
  });
  return matches;
}

export function generateKnockoutMatches(qualifyingTeams: Team[], tournamentId: string, duration: number): Omit<Match, 'id' | 'createdAt' | 'updatedAt' | 'team1Score' | 'team2Score' | 'winnerId' | 'date'>[] {
  let matches: Omit<Match, 'id' | 'createdAt' | 'updatedAt' | 'team1Score' | 'team2Score' | 'winnerId' | 'date'>[] = [];
  let currentTeams = qualifyingTeams;

  while (currentTeams.length > 1) {
    const roundMatches = [];
    for (let i = 0; i < currentTeams.length; i += 2) {
      if (i + 1 < currentTeams.length) {
        roundMatches.push({
          team1Id: currentTeams[i].id,
          team2Id: currentTeams[i + 1].id,
          duration,
          tournamentId,
          stage: currentTeams.length === 2 ? "FINALS" as Stage : "KNOCKOUT" as Stage,
        });
      }
    }
    matches = [...matches, ...roundMatches];
    // Placeholder for winners (in real, update after results)
    currentTeams = currentTeams.filter((_, index) => index % 2 === 0);
  }
  return matches;
} 