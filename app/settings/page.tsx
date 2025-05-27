"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ApiTokenManager } from "@/components/ApiTokens/ApiTokenManager";


export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading" || status === "unauthenticated") {
    return <div className="min-h-screen bg-background text-foreground flex items-center justify-center">Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-foreground">Settings</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4 text-foreground">API Tokens</h2>
            <p className="text-muted-foreground mb-4">
              Generate API tokens to use with the iOS shortcut or other integrations.
            </p>
            <ApiTokenManager />
          </section>
        </div>
      </div>
    </main>
  );
} 