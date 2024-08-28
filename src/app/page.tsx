
import List from "./components/HomeComponent";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import Footer from "./components/Footer";
import { LoadingButton } from './components/Book/button-main'; 
import { sessionData } from "@/lib/session";


export default async function Home() {
  const session = await getServerSession(authOptions);
  

  return (
    <>
      <div className="p-6 min-h-screen">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="bg-white bg-opacity-30 shadow-lg border-2 rounded-lg p-8 w-full max-w-md">
            <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
              Welcome to My Next.js!
            </h1>
            <div className="flex justify-center gap-4 mb-3">
              <LoadingButton href="/post" text="post" />
              <LoadingButton href="/dashboard" text="dashboard" />
            </div>
            <div className="flex justify-center gap-4 mb-3">
              <LoadingButton href="/Register" text="Register" />
              <LoadingButton href="/DataBook" text="Book" />
            </div>
            <div className="flex justify-center gap-4 mb-3">
              <List />
            </div>
          </div>
          <h1 className="text-center pt-4 text-gray-300">
            User session information
          </h1>
          <pre className="mt-6 p-4 bg-gray-900 text-white rounded-md w-full max-w-md overflow-x-auto">
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>
      </div>
      <Footer />
    </>
  );
}
