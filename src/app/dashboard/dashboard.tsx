import Image from "next/image";
import { formatDate } from "@/lib/utils";
import { ReadButton } from "../DataBook/book/[id]/btn";
import { GetDashboard } from "./dashboardAction";

interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  publishedAt: Date;
  coverImage?: string;
}

interface DashboardProps {
  query: string;
}

const Dashboard = async ({ query }: DashboardProps) => {
  const books: Book[] = await GetDashboard(query);
  console.log(books);

  if (!books || books.length === 0) {
    return <div>No books found.</div>;
  }

  return (
        <div>
        <h1 className="hidden sm:block text-lg sm:text-2xl font-bold mb-6 text-center text-white">
          Data Book
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-lg shadow-md flex flex-col h-full"
            >
              <div className="overflow-hidden">
                <div className="relative w-full h-48 md:h-64">
                  <Image
                    src={book.coverImage || "/default-cover.jpg"}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                    alt={book.title}
                  />
                </div>
              </div>
              <div className="md:p-4 p-4 flex flex-col flex-grow">
                <h2 className="text-sm sm:text-lg font-bold md:mb-2 text-center">
                  {book.title}
                </h2>
                <p className="text-xs sm:text-sm text-center">
                  Author: {book.author}
                </p>
                <p className="text-xs sm:text-sm text-center">
                  Genre: {book.genre}
                </p>
                <p className="text-xs sm:text-sm text-center">
                  Published At: {formatDate(book.publishedAt.toString())}
                </p>
                <ReadButton id={book.id} />
              </div>
            </div>
          ))}
        </div>
    </div>
  );
};

export default Dashboard;
