
"use server";
import { prisma } from "@/lib/prisma";

// Fetch chapter content along with book details
export const testts = async (chapterTitle: string) => {
  console.log(`Fetching content for chapter: ${chapterTitle}`);
  try {
    const chapter = await prisma.book.findFirst({
      where: { title: chapterTitle },
      include: {
        chapters: true,
      },
    });

    if (!chapter) {
      throw new Error("Chapter not found");
    }

    return chapter;
  } catch (err) {
    console.error("Error fetching chapter content:", err);
    return null;
  }
};