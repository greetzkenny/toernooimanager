"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Tournament } from "@/types/shared";

export default function TournamentDetail() {
  const params = useParams();
  const tournamentId = params.tournamentId as string;
  const { data: session } = useSession();
  const [tournament, setTournament] = useState<Tournament | null>(null);

  useEffect(() => {
    fetch(`/api/tournaments/${tournamentId}`).then(res => res.json()).then(setTournament);
  }, [tournamentId]);
}