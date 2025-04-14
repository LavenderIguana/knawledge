"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Copy, CheckCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface ApiToken {
  id: string;
  name: string;
  token: string;
  createdAt: string;
  lastUsed: string;
}

export function ApiTokenManager() {
  const [tokenName, setTokenName] = useState("");
  const [tokens, setTokens] = useState<ApiToken[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  // Fetch existing tokens
  useEffect(() => {
    fetchTokens();
  }, []);

  const fetchTokens = async () => {
    try {
      const response = await fetch("/api/tokens");
      if (response.ok) {
        const data = await response.json();
        setTokens(data.tokens);
      }
    } catch (error) {
      console.error("Error fetching tokens:", error);
      toast.error("Failed to load API tokens");
    }
  };

  const generateToken = async () => {
    if (!tokenName.trim()) {
      toast.error("Please enter a token name");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/tokens/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: tokenName }),
      });

      if (response.ok) {
        const newToken = await response.json();
        setTokens([...tokens, newToken]);
        setTokenName("");
        toast.success("API token generated successfully");
      } else {
        throw new Error("Failed to generate token");
      }
    } catch (error) {
      console.error("Error generating token:", error);
      toast.error("Failed to generate API token");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteToken = async (tokenId: string) => {
    try {
      const response = await fetch(`/api/tokens/${tokenId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTokens(tokens.filter((t) => t.id !== tokenId));
        toast.success("API token deleted successfully");
      } else {
        throw new Error("Failed to delete token");
      }
    } catch (error) {
      console.error("Error deleting token:", error);
      toast.error("Failed to delete API token");
    }
  };

  const copyToken = (token: string) => {
    navigator.clipboard.writeText(token);
    setCopiedToken(token);
    toast.success("Token copied to clipboard");
    setTimeout(() => setCopiedToken(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <Input
          value={tokenName}
          onChange={(e) => setTokenName(e.target.value)}
          placeholder="Token name (e.g., iOS Shortcut)"
          className="flex-1"
        />
        <Button onClick={generateToken} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate Token"
          )}
        </Button>
      </div>

      <div className="space-y-4">
        {tokens.map((token) => (
          <div
            key={token.id}
            className="p-4 border rounded-lg bg-white dark:bg-gray-800"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">{token.name}</h3>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToken(token.token)}
                >
                  {copiedToken === token.token ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteToken(token.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Created: {new Date(token.createdAt).toLocaleDateString()}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Last used: {new Date(token.lastUsed).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 