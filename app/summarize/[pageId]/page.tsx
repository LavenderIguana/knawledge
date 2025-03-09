"use client";
import { LinkInput } from "@/components/Links/LinkInput";
import { SummaryDisplay } from "@/components/Summary/SummaryDisplay";

interface SummarizePageProps {
  params: {
    pageId: string;
  };
}

export default function SummarizePage({ params }: SummarizePageProps) {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">URL Manager</h1>
      <div className="max-w-md mx-auto">
        <LinkInput 
          pageId={params.pageId} 
          onAddLink={() => {}} 
        />
        <SummaryDisplay pageId={params.pageId} />
      </div>
    </div>
  );
} 