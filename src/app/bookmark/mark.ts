'use server'
import { prisma } from "@/lib/prisma";

const addBookmark = async (bookId: string, userId: string) => {
  console.log(`Adding bookmark for book ID ${bookId} 2222and user ID ${userId}`);
  
  try {
    const result = await prisma.bookMark.create({
      data: {
        bookId: bookId,
        userId: userId
      },
    });
    console.log(`Bookmark for book with ID ${bookId} added for user with ID ${userId}`);
    return result
  } catch (error) {
    console.error("Error adding bookmark:", error);
  }
};

export default addBookmark;
