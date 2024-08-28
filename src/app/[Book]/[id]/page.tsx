"use client";
import { useState, useEffect } from "react";
import { testts } from "./content";
import { usePathname, useRouter } from "next/navigation";

const ChapterContent = () => {
  const [content, setContent] = useState(null);
  const [error, setError] = useState(null);
  const [nextChapter, setNextChapter] = useState(null);
  const [previousChapter, setPreviousChapter] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  // Extract bookTitle and chapterTitle from the URL
  let pathParts = pathname.split('/').filter(part => part);
  if (pathParts.length < 2) {
    throw new Error("Invalid URL structure");
  }
  let bookTitle = decodeURIComponent(pathParts[0]).replace(/-/g, " ");
  let chapterTitle = decodeURIComponent(pathParts[1]).replace(/-/g, " ");

  useEffect(() => {
    const fetchContent = async () => {
      try {
        console.log(`Fetching book with title: ${bookTitle}`);
        console.log(`Fetching chapter with title: ${chapterTitle}`);


        const bookData = await testts(bookTitle);
        if (!bookData) {
          throw new Error("Book not found");
        }

        const chapter = bookData.chapters.find(chap => chap.title === chapterTitle);
        if (!chapter) {
          throw new Error("Chapter not found");
        }

        const chapterIndex = bookData.chapters.findIndex(chap => chap.title === chapterTitle);
        if (chapterIndex === -1) {
          throw new Error("Current chapter index not found");
        }

        const nextChapter = bookData.chapters[chapterIndex + 1] || null;
        const previousChapter = bookData.chapters[chapterIndex - 1] || null;

        setContent({ chapter });
        setNextChapter(nextChapter);
        setPreviousChapter(previousChapter);
      } catch (error) {
        console.error("Error fetching content:", error);
        setError(error);
      }
    };

    fetchContent();
  }, [pathname]);

  if (error) {
    return <div>Error loading content: {error.message}</div>;
  }

  if (!content) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <section className="body-rw text-base Chapter-rw mt-14 bg-black px-20 text-white w-3/4">
        <h1>{content.chapter.title}</h1>
        <div
          className="mt-5"
          dangerouslySetInnerHTML={{ __html: content.chapter.content }} 
        ></div>
      </section>
      <div className="mt-5 flex justify-between w-3/4">
        {previousChapter && (
          <button
            onClick={() => router.push(`/${bookTitle.replace(/ /g, "-")}/${previousChapter.title.replace(/ /g, "-")}`)}
            className="bg-gray-700 text-white px-4 py-2 rounded"
          >
            Previous Chapter
          </button>
        )}
        {nextChapter && (
          <button
            onClick={() => router.push(`/${bookTitle.replace(/ /g, "-")}/${nextChapter.title.replace(/ /g, "-")}`)}
            className="bg-gray-700 text-white px-4 py-2 rounded"
          >
            Next Chapter
          </button>
        )}
      </div>
    </div>
  );
};

export default ChapterContent;
