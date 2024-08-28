import Dashboard from "./dashboard";
import Search from "../components/searchBook";

interface SearchParams {
  query?: string;
}

const Dash = async ({ searchParams }: { searchParams?: SearchParams }) => {
  const query = searchParams?.query || "";

  // console.log(`Query: ${query}`);

  return (
    <div className="flex justify-center pt-14">
      <div className="bg-slate-600 w-11/12 sm:w-4/5 md:py-4 md:p-8 py-3 px-2 rounded-lg shadow-lg bg-opacity-60">
      <div className="md:pb-0 mb-5">
      <Search /></div>
      <Dashboard query={query} />
    </div>
    </div>
  );
};

export default Dash;
