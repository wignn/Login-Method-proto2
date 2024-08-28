"use server";
import { prisma } from "@/lib/prisma";

export const Content = async (chapterTitle: string) => {
  console.log(`Fetching content for chapter: ${chapterTitle}`);
  try {
    const chapter = await prisma.chapter.findFirst({
      where: { title: chapterTitle },
      include: {
        book: true, 
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