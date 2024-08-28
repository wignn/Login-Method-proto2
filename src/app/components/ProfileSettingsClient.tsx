import { formatDate } from "@/lib/utils";
import { data, profileUser } from "../../lib/dataProfile";
import imgDefault from "../../../public/backimg.jpg";
import { IoBuildOutline  } from "react-icons/io5";
import Link from "next/link";

export default async function Profile({ id }: any) {
  const fetchedData = await data(id);
  const profileData = await profileUser(id);
  const bio = profileData?.bio;
  const profileImage = profileData?.image || imgDefault.src;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto bg-white bg-opacity-25 shadow-lg border-2 border-purple-600 rounded-lg p-8">
        {fetchedData && (
          <>
            <h2 className="text-center mb-3 text-2xl">{fetchedData.name}</h2>
          </>
        )}
        <form className="flex flex-col items-center">
          <div className="mt-3 w-36 h-36 rounded-full border-4 border-purple-600 overflow-hidden">
            <img
              src={profileImage}
              alt="Profile Picture"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="text-left mb-8">
            <h2 className="text-xl mb-2">ID: {fetchedData?.id}</h2>
            <h2 className="text-xl">Email: {fetchedData?.email}</h2>
            <h2 className="text-xl">Role: {fetchedData?.role}</h2>
            <h2 className="text-xl">
              Joined: {formatDate(fetchedData?.createdAt)}
            </h2>

            <h2 className="text-xl flex items-center">
              Bio: {bio}
              <Link href={"/profile/setting"}>
                 <IoBuildOutline  className="ml-2" />
              </Link>
            </h2>
          </div>
        </form>
      </div>
    </div>
  );
}
