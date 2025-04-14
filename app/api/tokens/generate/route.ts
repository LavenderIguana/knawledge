import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { name } = await req.json();
    if (!name) {
      return NextResponse.json(
        { error: "Token name is required" },
        { status: 400 }
      );
    }

    // Generate a secure random token
    const token = crypto.randomBytes(32).toString("hex");

    const apiToken = await prisma.apiToken.create({
      data: {
        name,
        token,
        userId: session.user.id,
      },
    });

    return NextResponse.json({
      id: apiToken.id,
      name: apiToken.name,
      token: apiToken.token,
      createdAt: apiToken.createdAt,
      lastUsed: apiToken.lastUsed,
    });
  } catch (error) {
    console.error("Error generating token:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 