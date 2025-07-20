import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { name, ownerId, tournamentId } = await request.json();
  const team = await prisma.team.create({
    data: { name, ownerId, tournamentId },
  });
  return NextResponse.json(team, { status: 201 });
} 