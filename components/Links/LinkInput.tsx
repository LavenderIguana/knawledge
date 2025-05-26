"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { addPage } from "@/app/actions/addPage"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Link, ArrowRight } from "lucide-react"

interface LinkInputProps {
  pageId: string
  onAddLink: (url: string, pageId: string) => void
}

export function LinkInput({ pageId, onAddLink }: LinkInputProps) {
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isValidUrl, setIsValidUrl] = useState(true)
  const [isFocused, setIsFocused] = useState(false)
  const [newPageId, setNewPageId] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (!url) {
      setIsValidUrl(true)
      return
    }
    try {
      new URL(url)
      setIsValidUrl(true)
    } catch {
      setIsValidUrl(false)
    }
  }, [url])

  const handleSubmit = async (url: string) => {
    if (!url || !isValidUrl) return;

    try {
      setIsLoading(true)
      const result = await addPage(url)

      if (result.success && result.page) {
        setNewPageId(result.page.id)

        
        if (onAddLink) {
          onAddLink(url, result.page.id)
          setUrl("")
          setIsLoading(false)
        } else {
          setUrl("")
          router.push(`/summarize/${result.page.id}`)
        }
      } else {
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit(url)
    }
  }

  if (isLoading && newPageId && !onAddLink) {
    router.push(`/summarize/${newPageId}`)
    return null;
  }

  return (
    <>
      <div className="w-full flex flex-col px-4 py-8 items-center justify-center">
        <div className="w-full max-w-xl mx-auto space-y-4">
          <div className="text-center space-y-2">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center justify-center space-x-2"
            >
              <div className="text-black text-xl">✧</div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Knowledge Analyzer</h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 dark:text-gray-400"
            >
              Enter a URL to summarize any article or webpage
            </motion.p>
          </div>

          <motion.div
            animate={{
              boxShadow: isFocused ? "0 0 0 2px rgba(124, 58, 237, 0.5)" : "none",
            }}
            className="flex items-center w-full bg-gray-50 dark:bg-gray-800 rounded-lg"
          >
            <div className="flex items-center justify-center pl-4">
              <Search className="h-5 w-5 text-gray-400" />
            </div>

            <Input
              ref={inputRef}
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
              placeholder="https://example.com/article"
              className="flex-1 border-0 bg-transparent px-4 py-3 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-0"
              disabled={isLoading}
            />

            <AnimatePresence>
              {url && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="pr-2"
                >
                  <Button onClick={() => setUrl("")} size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-full">
                    <span className="sr-only">Clear</span>
                    <motion.span whileHover={{ rotate: 90 }} transition={{ duration: 0.2 }}>
                      ✕
                    </motion.span>
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <AnimatePresence>
            {!isValidUrl && url && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-500 text-sm text-center"
              >
                Please enter a valid URL (e.g., https://example.com)
              </motion.p>
            )}
          </AnimatePresence>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <Button
              onClick={() => handleSubmit(url)}
              disabled={!url || !isValidUrl || isLoading}
              className="w-full bg-black hover:bg-gray-800 text-white font-medium py-3 transition-all duration-200 flex items-center justify-center group rounded-lg"
            >
              <span>{isLoading ? "Processing..." : "Analyze Content"}</span>
              {!isLoading && (
                <motion.div
                  animate={{ x: url && isValidUrl ? [0, 4, 0] : 0 }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, repeatDelay: 2, duration: 0.6 }}
                  className="ml-2"
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.div>
              )}
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center">
              <Link className="h-4 w-4 mr-2" />
              Instant AI-powered summaries of any content
            </p>
          </motion.div>
        </div>
      </div>
    </>
  )
}

