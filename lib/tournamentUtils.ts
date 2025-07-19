import { type Match, type Team } from '@prisma/client';

export function generateGroupStageMatches(teams: Team[], groupSize: number = 4): Match[] {
  const matches: Partial<Match>[] = [];
  // Divide into groups
  const groups = [];
  for (let i = 0; i < teams.length; i += groupSize) {
    groups.push(teams.slice(i, i + groupSize));
  }
  // Generate round-robin for each group
  groups.forEach((group) => {
    for (let a = 0; a < group.length; a++) {
      for (let b = a + 1; b < group.length; b++) {
        matches.push({
          team1Id: group[a].id,
          team2Id: group[b].id,
          duration: 15, // default
          // other fields
        });
      }
    }
  });
  return matches as Match[];
}

export function generateKnockoutMatches(qualifyingTeams: Team[]): Match[] {
  const matches: Partial<Match>[] = [];
  // Simple single-elimination bracket
  for (let i = 0; i < qualifyingTeams.length; i += 2) {
    if (i + 1 < qualifyingTeams.length) {
      matches.push({
        team1Id: qualifyingTeams[i].id,
        team2Id: qualifyingTeams[i + 1].id,
        duration: 15,
      });
    }
  }
  // Recurse for next rounds if needed, but placeholder
  return matches as Match[];
} 