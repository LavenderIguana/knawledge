'use server'

import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'

export async function getUserSummaries() {
  try {
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id
    
    if (!userId) {
      return { 
        success: false, 
        error: 'User not authenticated',
        summaries: []
      }
    }

    // Get all user notes with their associated summaries
    const userNotes = await prisma.userNotes.findMany({
      where: { userId },
      include: {
        summary: {
          include: {
            markdown: {
              include: {
                pageSnapshot: {
                  include: {
                    page: true
                  }
                }
              }
            }
          }
        }
      },
      orderBy: { updatedAt: 'desc' }
    });

    // Transform the data to a more usable format
    const summaries = userNotes.map(note => ({
      id: note.summary.note_id,
      title: note.summary.markdown.title,
      summary: note.summary.summary,
      url: note.summary.markdown.pageSnapshot?.page?.url || '',
      pageId: note.summary.markdown.pageSnapshot?.page?.id || '',
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
      hasNotes: note.content && note.content !== '<div><p>No content has been added to this note yet.</p></div>'
    }));

    return { 
      success: true, 
      summaries
    }

  } catch (error) {
    console.error('Failed to fetch user summaries:', error)
    return { 
      success: false, 
      error: 'Failed to fetch summaries',
      summaries: []
    }
  }
} 