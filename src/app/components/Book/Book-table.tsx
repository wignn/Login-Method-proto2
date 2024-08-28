import { GetBook } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { EditButton, DeleteButton,ChapterBtn } from "./buttons";

const BookTable = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  const books = await GetBook(query, currentPage);

  if (!books) return;

  return (
    <div className="flex justify-center items-center w-full">
      <table className="w-full text-sm text-left text-black  bg-white border-slate-900 bg-opacity-20 shadow-lg border-2">
        <thead className="text-sm text-black uppercase bg-transparent  border-slate-900  shadow-lg border-b">
          <tr>
            <th className="py-3 px-6">#</th>
            <th className="py-3 px-6">Cover</th>
            <th className="py-3 px-6">Title</th>
            <th className="py-3 px-6">Author</th>
            <th className="py-3 px-6">Genre</th>
            <th className="py-3 px-6">Publish</th>
            <th className="py-3 px-6 text-center">Last Updated</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map((book, index) => (
              <tr
                key={book.id}
                className="bg-transparent text-black border-b border-slate-950 h-20"
              >
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-16 h-16 object-cover"
                  />
                </td>
                <td className="py-3 px-6">{book.title}</td>
                <td className="py-3 px-6">{book.author}</td>
                <td className="py-3 px-6">{book.genre}</td>
                <td className="py-3 px-6">
                  {formatDate(book.publishedAt.toString())}
                </td>
                <td className="py-3 px-6">
                  {formatDate(book.updatedAt.toString())}
                </td>
                <td className="flex justify-center gap-1 py-3">
                  <EditButton id={book.id} />
                  <DeleteButton id={book.id} />
                  <ChapterBtn id={book.id}/>    
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="py-3 px-6 text-center text-gray-500">
                No books found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookTable;
