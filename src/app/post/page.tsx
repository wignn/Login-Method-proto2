import { articels } from "@/lib/data";
import { Create } from "./components/button";
import PostListClient from "./components/PostList";

export default async function PostList() {
  let posts = [];
  try {
    posts = await articels();
  } catch (error) {
    console.error("Failed to fetch posts:", error);
  }

  return (
    <div className="mx-auto p-6 min-h-screen bg-gradient-to-r bg-gray-400 shadow-md rounded-lg max-w-4xl mt-24">
      <h2 className="text-2xl font-bold mb-4 justify-center flex">Post List</h2>
      <div className="mb-2">
        <Create />
      </div>
      <PostListClient posts={posts} />
    </div>
  );
}
