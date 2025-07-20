import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { tournamentId } = await request.json();

  try {
    const application = await prisma.application.create({
      data: {
        userId: session.user.id,
        tournamentId,
      },
    });
    return NextResponse.json(application, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Error applying' }, { status: 500 });
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const applications = await prisma.application.findMany();
  return NextResponse.json(applications);
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id, status } = await request.json();
  const application = await prisma.application.update({
    where: { id },
    data: { status },
  });
  return NextResponse.json(application);
} 