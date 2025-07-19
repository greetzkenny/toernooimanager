import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { name, startDate, matchDuration } = await request.json();

  try {
    const tournament = await prisma.tournament.create({
      data: {
        name,
        startDate: new Date(startDate),
        matchDuration,
      },
    });
    return NextResponse.json(tournament, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating tournament' }, { status: 500 });
  }
}

export async function GET() {
  const tournaments = await prisma.tournament.findMany();
  return NextResponse.json(tournaments);
} 