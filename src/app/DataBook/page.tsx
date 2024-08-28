import Search from "../components/Book/search";
import BookTable from "@/app/components/Book/Book-table";
import { CreateButton } from "@/app/components/Book/buttons";
import { GetbookPages } from "@/lib/data";
import Pagination from "../components/Book/pagination";

const DataBook = async ({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) => {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await GetbookPages(query);

  return (
    <>
      <div className="flex items-center justify-center gap-2 mt-16 mb-2">
        <Search />
        <CreateButton />
      </div>
      <div className="- flex flex-col items-center px-4">
        <div className="w-full mx-auto">
          <BookTable query={query} currentPage={currentPage} />
          <div className="flex justify-center items-center mt-4 mb-0">
            <Pagination totalPages={totalPages} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DataBook;
