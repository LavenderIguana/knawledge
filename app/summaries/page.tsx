"use client";

import { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { getUserSummaries } from '@/app/actions/getUserSummaries';
import { FileText, ExternalLink, Clock, StickyNote } from 'lucide-react';
import { motion } from 'framer-motion';

interface Summary {
  id: string;
  title: string;
  summary: string;
  url: string;
  pageId: string;
  createdAt: Date;
  updatedAt: Date;
  hasNotes: boolean;
}

export default function SummariesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  const fetchSummaries = useCallback(async () => {
    if (status === "authenticated") {
      try {
        setLoading(true);
        const result = await getUserSummaries();
        if (result.success) {
          setSummaries(result.summaries);
        } else {
          setError(result.error || 'Failed to load summaries');
        }
      } catch (err) {
        setError('Failed to load summaries');
      } finally {
        setLoading(false);
      }
    }
  }, [status]);

  useEffect(() => {
    fetchSummaries();
  }, [fetchSummaries]);

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (status === "loading" || loading) {
    return (
      <div className="h-[calc(100vh-64px)] flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground mx-auto mb-4"></div>
          <p>Loading your summaries...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  if (error) {
    return (
      <div className="h-[calc(100vh-64px)] flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-foreground text-background rounded-md hover:opacity-80"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-[calc(100vh-64px)] bg-background text-foreground p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Summaries</h1>
          <p className="text-muted-foreground">
            {summaries.length === 0 
              ? "You haven't created any summaries yet. Start by adding a link to summarize!"
              : `You have ${summaries.length} ${summaries.length === 1 ? 'summary' : 'summaries'}`
            }
          </p>
        </div>

        {summaries.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <FileText className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No summaries yet</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Get started by adding a link to create your first AI-powered summary
            </p>
            <button
              onClick={() => router.push('/summarize')}
              className="px-6 py-3 bg-foreground text-background rounded-lg hover:opacity-80 transition-opacity"
            >
              Create Your First Summary
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {summaries.map((summary, index) => (
              <motion.div
                key={summary.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group"
                onClick={() => router.push(`/summarize/${summary.pageId}`)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </div>
                    {summary.hasNotes && (
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                        <StickyNote className="h-3 w-3 text-blue-600" />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {summary.url && (
                      <a
                        href={summary.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-1 hover:bg-muted rounded"
                      >
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="font-semibold text-lg mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {summary.title}
                </h3>

                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {truncateText(summary.summary, 150)}
                </p>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{formatDate(summary.updatedAt)}</span>
                  </div>
                  {summary.url && (
                    <span className="truncate max-w-[120px]">
                      {new URL(summary.url).hostname}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
} 