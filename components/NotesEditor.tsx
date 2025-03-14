'use client'

import { useState, useCallback, useEffect } from 'react'
import Editor, { defaultEditorContent } from '@/components/novel/editor'
import { saveNotesToDB } from '@/components/Chat/Summary/utils/saveNotesToDB'
import { getUserNotes } from '@/app/actions/getUserNotes'
import { Button } from '@/components/ui/button'
import { Loader2, Save, CheckCircle, Image as ImageIcon, MonitorPlay } from 'lucide-react'
import { debounce } from 'lodash'
import { generateJSON } from '@tiptap/html'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Iframe from '@/components/novel/extensions/iframe-extension'
import type { JSONContent } from 'novel'

interface NotesEditorProps {
  pageId: string
  showMarkdownPreview?: boolean
}

export default function NotesEditor({ pageId, showMarkdownPreview = false }: NotesEditorProps) {
  const [content, setContent] = useState<string>('')
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [initialContent, setInitialContent] = useState<JSONContent>(defaultEditorContent)

  // Load user notes when component mounts
  useEffect(() => {
    const loadUserNotes = async () => {
      setIsLoading(true)
      try {
        const result = await getUserNotes(pageId)
        if (result.success && result.content) {
          setContent(result.content)
          
          // Convert HTML to Novel's JSON content format using TipTap's utilities
          try {
            // Process the HTML to ensure image tags are properly formatted
            const processedHtml = processHtmlForImages(result.content)
            
            const json = generateJSON(processedHtml, [
              StarterKit,
              Image.configure({
                inline: true,
                allowBase64: true,
              }),
              Link.configure({
                openOnClick: false,
              }),
              Iframe
            ])
            setInitialContent(json as JSONContent)
          } catch (err) {
            console.error("Error converting HTML to JSON:", err)
            // Fallback to default content if conversion fails
          }
        } else if (!result.success && result.error) {
          setLoadError(result.error)
        }
      } catch (err) {
        console.error("Exception loading notes:", err)
        setLoadError('Failed to load notes')
      } finally {
        setIsLoading(false)
      }
    }

    loadUserNotes()
  }, [pageId])

  // Helper function to process HTML and ensure images are properly formatted
  const processHtmlForImages = (html: string): string => {
    // Create a DOM parser to manipulate the HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Find all image elements
    const images = doc.querySelectorAll('img');
    
    // Process each image to ensure it has the necessary attributes
    images.forEach(img => {
      // Make sure images have alt text
      if (!img.alt) img.alt = 'Image';
      
      // Ensure the image has proper styling classes if needed
      img.classList.add('novel-image');
      
      // If using data URLs, make sure they're properly formatted
      if (img.src.startsWith('data:')) {
        // The src is already a data URL, no need to modify
      } else if (img.src.startsWith('/')) {
        // For relative URLs, make sure they point to the correct location
        // This depends on your application's structure
      }
    });
    
    // Convert back to string
    return new XMLSerializer().serializeToString(doc);
  };

  // Debounced save function
  const debouncedSave = useCallback(
    debounce(async (content: string) => {
      await saveNotesToDB(pageId, content, { setIsSaving, setSaveError })
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 2000)
    }, 1000),
    [pageId]
  )

  // Handle content changes
  const handleContentChange = (newContent: string) => {
    setContent(newContent)
    debouncedSave(newContent)
  }

  // Manual save button handler
  const handleManualSave = async () => {
    await saveNotesToDB(pageId, content, { setIsSaving, setSaveError })
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 2000)
  }

  // Helper functions for inserting media
  const handleImageUpload = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = async () => {
      if (input.files?.length) {
        const file = input.files[0]
        // Here you would typically upload the file to your server or cloud storage
        // For this example, we'll use a data URL
        const reader = new FileReader()
        reader.onload = (e) => {
          const dataUrl = e.target?.result as string
          // You would need to add this command to your editor instance
          // This is just a placeholder for the concept
          console.log("Image uploaded:", dataUrl)
          // In a real implementation, you would update the editor content
        }
        reader.readAsDataURL(file)
      }
    }
    input.click()
  }

  const handleIframeInsert = () => {
    const url = prompt('Enter the URL to embed:')
    if (url) {
      // Similar to image upload, you would need to add this to your editor instance
      console.log("Iframe URL:", url)
      // In a real implementation, you would update the editor content
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading your notes...</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {loadError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{loadError}</p>
        </div>
      )}
      
      <Editor 
        initialValue={initialContent} 
        onChange={handleContentChange} 
      />
      
      {showMarkdownPreview && (
        <div className="mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-800">
          <h3 className="text-lg font-medium mb-2">Markdown Preview</h3>
          <div 
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      )}
      
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          {saveError && (
            <p className="text-red-500 text-sm">{saveError}</p>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button 
            onClick={handleManualSave}
            disabled={isSaving}
            className="flex items-center gap-2"
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : saveSuccess ? (
              <>
                <CheckCircle className="h-4 w-4 text-green-500" />
                Saved
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
} 