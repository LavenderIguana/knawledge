import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { addPage } from "@/app/actions/addPage";

export async function POST(req: Request) {
  try {
    console.log("🔍 [Shortcut API] Starting request processing");
    
    const body = await req.json();
    console.log("📦 [Shortcut API] Request body:", body);
    
    const { apiToken, url } = body;

    if (!apiToken || !url) {
      console.log("❌ [Shortcut API] Missing parameters:", { apiToken: !!apiToken, url: !!url });
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    // Look up the API token and associated user
    console.log("🔑 [Shortcut API] Looking up API token");
    const tokenRecord = await prisma.apiToken.findUnique({
      where: { token: apiToken },
      include: { user: true }
    });

    if (!tokenRecord) {
      console.log("❌ [Shortcut API] Invalid token");
      return NextResponse.json(
        { error: "Invalid API token" },
        { status: 401 }
      );
    }

    console.log("✅ [Shortcut API] Token valid for user:", tokenRecord.user.id);

    // Update last used timestamp
    await prisma.apiToken.update({
      where: { id: tokenRecord.id },
      data: { lastUsed: new Date() }
    });

    // Process the URL and create a summary
    console.log("📝 [Shortcut API] Processing URL:", url);
    const result = await addPage(url, tokenRecord.user.id);
    console.log("📄 [Shortcut API] AddPage result:", result);
    
    if (!result.success || !result.page) {
      console.log("❌ [Shortcut API] Failed to process URL");
      return NextResponse.json(
        { error: "Failed to process URL" },
        { status: 500 }
      );
    }

    // Create redirect URL
    const redirectUrl = `${process.env.NEXTAUTH_URL}/summarize/${result.page.id}`;
    console.log("🔀 [Shortcut API] Redirecting to:", redirectUrl);

    // Instead of redirecting, return the URL in the response
    return NextResponse.json({
      success: true,
      url: redirectUrl
    });

  } catch (error) {
    console.error("❌ [Shortcut API] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 