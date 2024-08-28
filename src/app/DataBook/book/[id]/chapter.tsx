"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { chapter, Bookdata } from "./BookHandler";
import Link from "next/link";
import { DeleteButton } from "./btn";

const Ch = () => {
  const pathname = usePathname();
  const bookId = pathname.split("/").pop();
  const [chapters, setChapters] = useState([]);
  const [bookTitle, setBookTitle] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state

  const fetchData = async () => {
    try {
      const fetchedChapters = await chapter(bookId);
      const fetchedBook = await Bookdata(bookId);

      setChapters(fetchedChapters);
      setBookTitle(fetchedBook.title); 
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchData();
  }, [bookId]);

  const generateChapterUrl = (chapterTitle) => {
    return `/${bookTitle.replace(/ /g, '-')}/${chapterTitle.replace(/ /g, '-')}`;
  };

  return (
    <div className="w-full text-sm">
      {loading ? (
        <div className="mt-4 text-gray-400">Loading.....</div>
      ) : chapters.length > 0 ? (
        <ul className="mt-4 space-y-3">
          {chapters.map((chapter, index) => (
            <li
              key={index}
              className="p-4 h-11 bg-gray-800 rounded-lg shadow-md flex items-center justify-between w-11/12 hover:bg-gray-700 transition duration-300"
            >
              <div className="flex items-center">
                <Link href={generateChapterUrl(chapter.title)}>
                  <span className="text-xs md:text-sm font-semibold text-gray-100 mr-3">
                    {index + 1}.
                  </span>
                  <span className="text-xs md:text-sm font-medium text-gray-200">
                    {chapter.title}
                  </span>
                </Link>
              </div>
              <DeleteButton id={chapter.id} onDelete={fetchData} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-4 text-gray-400">No chapters available</div>
      )}
    </div>
  );
};

export default Ch;
