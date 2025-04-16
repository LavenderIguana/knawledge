"use client";
import { LinkInput } from "@/components/Links/LinkInput";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function SummarizePage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);
  
  const handleAddLink = (url: string, pageId: string) => {
    console.log("Added URL:", url, "with pageId:", pageId);
    router.push(`/summarize/${pageId}`);
  };
  
  useEffect(() => {
    console.log("Current user:", session?.user?.id);
  }, [session]);
  
  if (status === "loading" || status === "unauthenticated") {
    return <div className="h-[calc(100vh-64px)] flex items-center justify-center bg-white dark:bg-gray-900">Loading...</div>;
  }
  
  return (
    <main className="h-[calc(100vh-64px)] flex items-center justify-center bg-white dark:bg-gray-900">
      <LinkInput 
        pageId="" 
        onAddLink={handleAddLink}
      />
    </main>
  );
}
