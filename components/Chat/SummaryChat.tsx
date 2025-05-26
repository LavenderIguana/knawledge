"use client";

import { useChat } from '@ai-sdk/react';
import { useEffect, useState, useRef, useCallback } from 'react';
import { renderSummaryContent, renderMessageContent } from '@/components/Chat/Summary/utils';
import { getSummary } from '@/app/actions/getSummary';
import { Loader2, Lock } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

interface SummaryChatProps {
  pageId: string;
}

export function SummaryChat({ pageId }: SummaryChatProps) {
  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;
  const [loadingStage, setLoadingStage] = useState<'fetching' | 'processing' | 'formatting' | 'complete' | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  
  const summaryAddedToChat = useRef(false);
  
  const { messages, input, handleInputChange, handleSubmit, append, setMessages } = useChat({
    initialMessages: [],
    id: `summary-chat-${pageId}`,
    body: {
      pageId,
    },
  });

  const { data: summaryData, isLoading, isError, error } = useQuery({
    queryKey: ['summary', pageId],
    queryFn: async () => {
      setLoadingStage('fetching');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setLoadingStage('processing');
      const result = await getSummary(pageId);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (!result.success || !result.summary) {
        throw new Error("Failed to get summary");
      }
      
      setLoadingStage('formatting');
      await new Promise(resolve => setTimeout(resolve, 600));
      
      setLoadingStage('complete');
      
      return {
        title: result.title || 'Summary',
        summary: result.summary
      };
    },

  });

  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    summaryAddedToChat.current = false;
    setMessages([]);
  }, [pageId, setMessages]);

  useEffect(() => {
    if (summaryData && !summaryAddedToChat.current) {
      setTimeout(() => {
        summaryAddedToChat.current = true;
        
        setMessages([]);
        
        append({
          role: 'assistant',
          content: `# ${summaryData.title}\n\n${summaryData.summary}`
        });
      }, 500);
    }
  }, [summaryData, append, setMessages]);

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    handleSubmit(e);
    
    const inputElement = (e.currentTarget as HTMLFormElement).querySelector('input');
    if (inputElement) {
      setTimeout(() => {
        inputElement.focus();
      }, 0);
    }
  };

  return (
    <div className="w-full bg-background text-foreground">
      <h2 className="text-xl font-bold mb-4 text-foreground">Summary Analysis</h2>
      
      {!isAuthenticated && (
        <div className="bg-muted border border-border text-foreground px-4 py-3 rounded flex items-center mb-4">
          <Lock className="h-4 w-4 mr-2" />
          <p>You are viewing this summary in read-only mode</p>
        </div>
      )}
      
      {loadingStage && !summaryAddedToChat.current && (
        <div className="mb-6 border border-border rounded-lg p-4 bg-muted">
          <div className="space-y-4">
            <div className="flex items-center">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                loadingStage === 'fetching' ? 'bg-white animate-pulse' : 
                loadingStage === 'processing' || loadingStage === 'formatting' || loadingStage === 'complete' ? 'bg-white' : 'bg-muted-foreground'
              }`}>
                {loadingStage === 'fetching' ? <Loader2 className="h-4 w-4 text-black animate-spin" /> : <span className="text-black">✓</span>}
              </div>
              <div className="font-medium text-foreground">Fetching content</div>
            </div>
            
            <div className="flex items-center">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                loadingStage === 'processing' ? 'bg-white animate-pulse' : 
                loadingStage === 'formatting' || loadingStage === 'complete' ? 'bg-white' : 'bg-muted-foreground'
              }`}>
                {loadingStage === 'processing' ? <Loader2 className="h-4 w-4 text-black animate-spin" /> : 
                 loadingStage === 'formatting' || loadingStage === 'complete' ? <span className="text-black">✓</span> : ''}
              </div>
              <div className="font-medium text-foreground">Processing with AI</div>
            </div>
            
            <div className="flex items-center">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                loadingStage === 'formatting' ? 'bg-white animate-pulse' : 
                loadingStage === 'complete' ? 'bg-white' : 'bg-muted-foreground'
              }`}>
                {loadingStage === 'formatting' ? <Loader2 className="h-4 w-4 text-black animate-spin" /> : 
                 loadingStage === 'complete' ? <span className="text-black">✓</span> : ''}
              </div>
              <div className="font-medium text-foreground">Formatting summary</div>
            </div>
            
            <div className="flex items-center">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                loadingStage === 'complete' ? 'bg-white animate-pulse' : 'bg-muted-foreground'
              }`}>
                {loadingStage === 'complete' ? <span className="text-black">✓</span> : ''}
              </div>
              <div className="font-medium text-foreground">Summary ready</div>
            </div>
          </div>
        </div>
      )}
      
      {isError && (
        <div className="mb-6 border border-border rounded-lg p-4 bg-muted">
          <p className="text-foreground">
            Error loading summary: {error instanceof Error ? error.message : "Unknown error"}
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-muted border border-border rounded-md hover:bg-accent text-foreground"
          >
            Try again
          </button>
        </div>
      )}
      
      <div 
        ref={messagesContainerRef}
        className="space-y-4 max-h-[500px] overflow-y-auto mb-4 p-4 border border-border rounded-lg bg-background"
        style={{ scrollBehavior: 'smooth' }}
      >
        {messages.length === 0 && isLoading && !loadingStage && (
          <div className="text-center text-muted-foreground py-8">
            Loading summary...
          </div>
        )}
        
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`p-4 rounded-lg ${
              message.role === 'user' 
                ? 'bg-muted text-foreground ml-auto max-w-[80%]' 
                : 'bg-muted text-foreground mr-auto max-w-[80%]'
            }`}
          >
            <div className="font-semibold mb-1 text-foreground">
              {message.role === 'user' ? 'You' : 'Knowledge Assistant'}
            </div>
            <div className="text-foreground text-lg">
              {message.role === 'assistant' && message.content.includes('# ') 
                ? renderSummaryContent({
                    title: message.content.split('\n')[0].replace('# ', ''),
                    summary: message.content.split('\n').slice(2).join('\n')
                  })
                : renderMessageContent(message.content)}
            </div>
          </div>
        ))}
      
        <div ref={messagesEndRef} />
      </div>
      
      {summaryAddedToChat.current && isAuthenticated && (
        <form 
          onSubmit={handleMessageSubmit}
          className="flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Ask a question about this content..."
            className="flex-1 px-4 py-2 border border-border rounded-lg bg-white text-black placeholder:text-gray-500"
          />
          <button 
            type="submit"
            className="bg-white hover:bg-gray-100 text-black px-4 py-2 rounded-lg border border-border"
          >
            Send
          </button>
        </form>
      )}
      
      {summaryAddedToChat.current && !isAuthenticated && (
        <div className="mt-4 p-4 border border-border rounded-lg bg-muted text-center">
          <p className="text-foreground">Sign in to ask questions about this content</p>
        </div>
      )}
    </div>
  );
} 