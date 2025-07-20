"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { Application } from "@/types/shared";

export default function ApproveApplications() {
  const { data: session } = useSession();
  const [applications, setApplications] = useState<Application[]>([]);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  useEffect(() => {
    fetch("/api/applications").then((res) => res.json()).then(setApplications);
  }, []);

  const handleApprove = async (appId: string, tournamentId: string, userId: string) => {
    await fetch("/api/teams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: `Team ${userId}`, ownerId: userId, tournamentId }),
    });
    await fetch(`/api/applications/${appId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "APPROVED" }),
    });
    fetch("/api/applications").then((res) => res.json()).then(setApplications);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Approve Applications</h1>
      {applications.map((app: Application) => (
        <div key={app.id} className="mb-4 p-4 border rounded">
          <p>User {app.userId} applied to tournament {app.tournamentId} (Status: {app.status})</p>
          {app.status === "PENDING" && (
            <button onClick={() => handleApprove(app.id, app.tournamentId, app.userId)} className="bg-green-500 text-white p-2 rounded">Approve</button>
          )}
        </div>
      ))}
    </div>
  );
} 