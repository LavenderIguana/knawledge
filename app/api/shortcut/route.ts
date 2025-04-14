import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { addPage } from "@/app/actions/addPage";

export async function POST(req: Request) {
  try {
    const { apiToken, url } = await req.json();

    if (!apiToken || !url) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    // Look up the API token and associated user
    const tokenRecord = await prisma.apiToken.findUnique({
      where: { token: apiToken },
      include: { user: true }
    });

    if (!tokenRecord) {
      return NextResponse.json(
        { error: "Invalid API token" },
        { status: 401 }
      );
    }

    // Update last used timestamp
    await prisma.apiToken.update({
      where: { id: tokenRecord.id },
      data: { lastUsed: new Date() }
    });

    // Process the URL and create a summary
    const result = await addPage(url, tokenRecord.user.id);
    
    if (!result.success || !result.page) {
      return NextResponse.json(
        { error: "Failed to process URL" },
        { status: 500 }
      );
    }

    // Return the redirect URL in the JSON response
    return NextResponse.json({
      success: true,
      redirectUrl: `${process.env.NEXTAUTH_URL}/summarize/${result.page.id}`
    });

  } catch (error) {
    console.error("Shortcut API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 