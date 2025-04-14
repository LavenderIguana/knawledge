import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function DELETE(
  req: Request,
  { params }: { params: { tokenId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Verify the token belongs to the user
    const token = await prisma.apiToken.findUnique({
      where: {
        id: params.tokenId,
      },
    });

    if (!token || token.userId !== session.user.id) {
      return NextResponse.json(
        { error: "Token not found or unauthorized" },
        { status: 404 }
      );
    }

    await prisma.apiToken.delete({
      where: {
        id: params.tokenId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting token:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 