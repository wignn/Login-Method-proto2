import { formatDate } from "@/lib/utils";
import type { Book } from "@prisma/client";
import Image from "next/image";
import Ch from "./chapter";
import Footer from "@/app/components/Footer";
import { Bookmark } from "../../../bookmark/btn";
import {btnDataBookMark} from "@/app/bookmark/dataMark";
import { sessionData } from "@/lib/session";
import { IoBookmark } from "react-icons/io5";
import { DataBookMark } from "@/app/bookmark/dataMark";
// import { Bookmarkbtn } from "../../../bookmark/btn";

const BookDetails = async ({ book }: { book: Book }) => {
  const bookId = book.id;
  const session = await sessionData();
  const userId = session?.id;
  const hasBookmark = await btnDataBookMark(userId, bookId);
  const data = await DataBookMark(session?.id);
  const bookmark = data.find(bookmark => bookmark.bookId === bookId);
  
  return (
    <div>
      <div className="flex flex-col lg:flex-row items-start p-5 bg-gray-800 bg-opacity-90 text-gray-100 w-full mt-5 rounded-lg shadow-lg">
        <div className="flex-shrink-0 mb-5 lg:mb-0 lg:mr-10 self-start">
          <div className="relative w-[350px] h-[500px] overflow-hidden rounded-lg shadow-xl">
            <Image
              src={book.coverImage}
              fill
              alt={book.title}
              className="rounded-lg object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="mt-5 text-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-5 rounded-md transition duration-300">
              Start Reading
            </button>
            {!hasBookmark && <Bookmark id={book.id} />}
            {hasBookmark && <IoBookmark size={30}/>}
          </div>
        </div>

        <div className="flex-grow mt-10 lg:mt-0 p-5 lg:p-10 rounded-lg bg-gray-700">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-center lg:text-left">
            {book.title}
          </h1>
          <p className="mb-4">
            <strong>Author:</strong> {book.author}
          </p>
          <p className="mb-4">
            <strong>Views:</strong> {book.id.toLocaleString()} |{" "}
            <strong>Rating:</strong> {book.id}
          </p>
          <p className="mb-4">
            <strong>Release Date:</strong>{" "}
            {formatDate(book.publishedAt.toString())}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {/* Book genres */}
          </div>
          <div className="mb-4 space-y-2">
            {/* Book synopsis */}
          </div>
          <div>
            <strong className="text-lg font-semibold mb-2 block">Chapters:</strong>
            {/* Chapters component */}
          </div>
          <Ch/>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookDetails;