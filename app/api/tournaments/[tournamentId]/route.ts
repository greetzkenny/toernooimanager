import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/auth";
import { generateGroupStageMatches } from "@/lib/tournamentUtils";

export async function GET(request: Request, { params }: { params: Promise<{ tournamentId: string }> }) {
  const { tournamentId } = await params;
  const tournament = await prisma.tournament.findUnique({
    where: { id: tournamentId },
    include: { matches: true, teams: true },
  });
  return NextResponse.json(tournament);
}

export async function POST(request: Request, { params }: { params: Promise<{ tournamentId: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const { tournamentId } = await params;
  const tournament = await prisma.tournament.findUnique({
    where: { id: tournamentId },
    include: { teams: true },
  });
  if (!tournament) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const groupMatches = generateGroupStageMatches(tournament.teams, 4, tournamentId, tournament.matchDuration);
  for (const m of groupMatches) {
    await prisma.match.create({ data: m });
  }

  // For knock-out, after group, placeholder call
  // const qualifyingTeams = ... // Logic to get top teams from groups
  // const knockoutMatches = generateKnockoutMatches(qualifyingTeams, tournamentId, tournament.matchDuration);
  // for (const m of knockoutMatches) { await prisma.match.create({ data: m }); }

  return NextResponse.json({ message: 'Matches generated' });
} 