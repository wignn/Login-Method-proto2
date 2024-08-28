//@ts-nocheck

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { formatDate } from "@/lib/utils";
import { ReadButton } from "../DataBook/book/[id]/btn";
import { DataBookMark } from "../bookmark/dataMark";
import { useSession } from "next-auth/react";
import { DeleteButton } from "../bookmark/btn";

const BookMark = () => {
    const { data: session, status } = useSession();
    const [bookmarks, setBookmarks] = useState([]);
    const [loading, setLoading] = useState(true);
  
    const fetchBookmarks = async () => {
      try {
        const data = await DataBookMark(session?.id);
        setBookmarks(data);
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      }
      setLoading(false);
    };
  
    useEffect(() => {
      if (status !== "loading") {
        fetchBookmarks();
      }
    }, [session, status]);
  
    if (loading) {
      return <p>Loading...</p>;
    }
  
    return (
      <div className="">
        {bookmarks.length === 0 ? (
          <p>You have no bookmarks.</p>
        ) : (
          <div className="flex justify-center pt-14">
            <div className="bg-slate-600 w-11/12 sm:w-4/5 md:py-4 md:p-8 py-3 px-2 rounded-lg shadow-lg bg-opacity-60">
              <h1 className="hidden sm:block text-lg sm:text-2xl font-bold mb-6 text-center text-white">
                Bookmark
              </h1>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
                {bookmarks.map((bookmark) => (
                  <div
                    key={bookmark.id}
                    className="bg-white rounded-lg shadow-md flex flex-col h-full"
                  >
                    <div className="overflow-hidden">
                      <div className="relative w-full h-48 md:h-64">
                        <Image
                          src={bookmark.book.coverImage || "/default-cover.jpg"}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-t-lg"
                          alt={bookmark.book.title}
                        />
                      </div>
                    </div>
                    <div className="md:p-4 p-4 flex flex-col flex-grow">
                      <h2 className="text-sm sm:text-lg font-bold md:mb-2 text-center">
                        {bookmark.book.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-center">
                        Author: {bookmark.book.author}
                      </p>
                      <p className="text-xs sm:text-sm text-center">
                        Published At:{" "}
                        {formatDate(bookmark.book.publishedAt.toString())}
                      </p>
                      <ReadButton id={bookmark.book.id} />
                      <DeleteButton id={bookmark.id} onDelete={fetchBookmarks} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default BookMark;
  