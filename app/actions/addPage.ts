'use server'

import prisma from '@/lib/prisma'
import { createPageSnapshot } from './createPageSnapshot'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function extractTitle(url: string, userId?: string): Promise<string> {
  try {
    // If no userId provided, check for session
    if (!userId) {
      const session = await getServerSession(authOptions)
      if (!session) {
        throw new Error('Unauthorized')
      }
    }
    
    const response = await fetch(url)
    const html = await response.text()
    
    const titleMatch = html.match(/<title>(.*?)<\/title>/i)
    const title = titleMatch ? titleMatch[1] : url
    
    return title
  } catch (error) {
    console.error('Failed to extract title:', error)
    return url
  }
}

export async function addPage(url: string, userId?: string) {
  if (!url) {
    throw new Error('URL is required')
  }

  try {
    let authenticatedUserId = userId;
    
    // If no userId provided, check for session
    if (!authenticatedUserId) {
      const session = await getServerSession(authOptions)
      if (!session?.user?.id) {
        throw new Error('Unauthorized')
      }
      authenticatedUserId = session.user.id;
    }

    const title = await extractTitle(url, authenticatedUserId)

    const page = await prisma.page.create({
      data: {
        title: title,
        url: url,
        userId: authenticatedUserId,
      },
    })

    await createPageSnapshot(page.id)

    return { success: true, page }
  } catch (error) {
    console.error('Failed to add page:', error)
    return { success: false, error: 'Failed to add page' }
  }
}
