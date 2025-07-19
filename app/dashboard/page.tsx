"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      {session.user.role === "ADMIN" ? (
        <p>Welcome, Admin! You can create tournaments here.</p>
      ) : (
        <p>Welcome, User! You can apply to tournaments.</p>
      )}
    </div>
  );
} 