'use client'

import { useState, useRef } from 'react'

import {
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  type EditorInstance,
  EditorRoot,
  type JSONContent
} from 'novel'

import { ImageResizer, handleCommandNavigation } from 'novel/extensions'
import { handleImageDrop, handleImagePaste } from 'novel/plugins'

import {
  slashCommand,
  suggestionItems
} from '@/components/novel/slash-command'
import EditorMenu from '@/components/novel/editor-menu'

import { defaultExtensions } from '@/components/novel/extensions'
import { TextButtons } from '@/components/novel/selectors/text-buttons'
import { LinkSelector } from '@/components/novel/selectors/link-selector'
import { NodeSelector } from '@/components/novel/selectors/node-selector'
import { MathSelector } from '@/components/novel/selectors/math-selector'
import { ColorSelector } from '@/components/novel/selectors/color-selector'

import { Separator } from '@/components/ui/separator'
import { uploadFn } from '@/components/novel/image-upload'

const hljs = require('highlight.js')

const extensions = [
  ...defaultExtensions, 
  slashCommand
]

export const defaultEditorContent = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: []
    }
  ]
}

interface EditorProps {
  initialValue?: JSONContent
  onChange: (content: string) => void
  editable?: boolean
  showTitle?: boolean
}

export default function Editor({ initialValue, onChange, editable = true, showTitle = true }: EditorProps) {
  const [openNode, setOpenNode] = useState(false)
  const [openColor, setOpenColor] = useState(false)
  const [openLink, setOpenLink] = useState(false)
  const [openAI, setOpenAI] = useState(false)
  
  const editorContent = initialValue || defaultEditorContent

  return (
    <div className='relative w-full h-full'>
      {showTitle && <div className="text-xl font-bold mb-4 text-left">📝 Take notes here</div>}
      <EditorRoot>
        <EditorContent
          immediatelyRender={false}
          initialContent={editorContent}
          extensions={extensions}
          className='min-h-[500px] overflow-y-auto mb-4 p-4 border rounded-lg bg-background text-foreground'
          
          editorProps={{
            handleDOMEvents: {
              keydown: (_view, event) => handleCommandNavigation(event)
            },
            handlePaste: (view, event) =>
              handleImagePaste(view, event, uploadFn),
            handleDrop: (view, event, _slice, moved) =>
              handleImageDrop(view, event, moved, uploadFn),
            attributes: {
              class:
                'prose dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full'
            },
            editable: () => editable,
          }}
          onUpdate={({ editor }) => {
            onChange(editor.getHTML())
          }}
          slotAfter={<ImageResizer />}
        >
          <EditorCommand className='z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all'>
            <EditorCommandEmpty className='px-2 text-muted-foreground'>
              No results
            </EditorCommandEmpty>
            <EditorCommandList>
              {suggestionItems.map(item => (
                <EditorCommandItem
                  value={item.title}
                  onCommand={val => item.command?.(val)}
                  className='flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent'
                  key={item.title}
                >
                  <div className='flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background'>
                    {item.icon}
                  </div>
                  <div>
                    <p className='font-medium'>{item.title}</p>
                    <p className='text-xs text-muted-foreground'>
                      {item.description}
                    </p>
                  </div>
                </EditorCommandItem>
              ))}
            </EditorCommandList>
          </EditorCommand>

          <EditorMenu open={openAI} onOpenChange={setOpenAI}>
            <Separator orientation='vertical' />
            <NodeSelector open={openNode} onOpenChange={setOpenNode} />

            <Separator orientation='vertical' />
            <LinkSelector open={openLink} onOpenChange={setOpenLink} />

            <Separator orientation='vertical' />
            <MathSelector />

            <Separator orientation='vertical' />
            <TextButtons />

            <Separator orientation='vertical' />
            <ColorSelector open={openColor} onOpenChange={setOpenColor} />
          </EditorMenu>
        </EditorContent>
      </EditorRoot>
    </div>
  )
}
