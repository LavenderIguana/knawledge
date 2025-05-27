"use client";
import NotesEditor from "@/components/NotesEditor";
import { SummaryChat } from "@/components/Chat/SummaryChat";
import { useState } from "react";
import { ClipboardIcon, CheckIcon } from "lucide-react";

interface SummarizePageProps {
  params: {
    pageId: string;
  };
}

export default function SummarizePage({ params }: SummarizePageProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    const url = window.location.href;
    // Create a shareable URL that includes the pageId parameter
    // This ensures anyone with this link can view the notes
    const shareableUrl = `${window.location.origin}/summarize/${params.pageId}`;
    
    navigator.clipboard.writeText(shareableUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <main className="min-h-screen w-full bg-background text-foreground flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-7xl">
        <div className="flex justify-end mb-4">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-100 text-black border border-white rounded-md transition-colors"
          >
            {copied ? (
              <>
                <CheckIcon className="h-5 w-5" />
                Copied!
              </>
            ) : (
              <>
                <ClipboardIcon className="h-5 w-5" />
                Share
              </>
            )}
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-4 items-stretch justify-center">
          <div className="w-full md:w-1/2 flex justify-center">
            <SummaryChat pageId={params.pageId} />
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="w-full h-full">
              <NotesEditor pageId={params.pageId} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
