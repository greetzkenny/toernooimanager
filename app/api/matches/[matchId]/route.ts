import { NextRequest, NextResponse } from "next/server";
import prisma from '../../../../lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/auth";

export async function PUT(request: NextRequest, context: { params: Promise<{ matchId: string }> }) {
  const params = await context.params;
  const matchId = params.matchId;
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { team1Score, team2Score } = await request.json();

  try {
    const match = await prisma.match.update({
      where: { id: matchId },
      data: { team1Score, team2Score },
      include: { tournament: true },
    });
    // Calculate winner and update points
    let winnerId = null;
    if (team1Score > team2Score) {
      winnerId = match.team1Id;
      await prisma.team.update({
        where: { id: match.team1Id || '' },
        data: { points: { increment: 3 } }
      });
    } else if (team2Score > team1Score) {
      winnerId = match.team2Id;
      await prisma.team.update({
        where: { id: match.team2Id || '' },
        data: { points: { increment: 3 } }
      });
    } else {
      await prisma.team.update({
        where: { id: match.team1Id || '' },
        data: { points: { increment: 1 } }
      });
      await prisma.team.update({
        where: { id: match.team2Id || '' },
        data: { points: { increment: 1 } }
      });
    }
    await prisma.match.update({
      where: { id: matchId },
      data: { winnerId }
    });
    return NextResponse.json(match);
  } catch {
    return NextResponse.json({ error: 'Error updating match' }, { status: 500 });
  }
} 