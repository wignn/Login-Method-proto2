//@ts-nocheck
"use client";
import Link from "next/link";

import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import img from "../../../public/1.jpg";
import { Icon } from "next/dist/lib/metadata/types/metadata-types";
import { profileUser } from "@/lib/dataProfile";

const Navbar = () => {
  const { data: session } = useSession();
  const [nav, setNav] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [userImage, setUserImage] = useState("");
  const [serverUrl, setServerUrl] = useState("https://localhost:3000");
  const id = session?.id;
  // console.log(id);
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const id = await session?.id;
        const image = await profileUser(id);
        setUserImage(image?.image || img);
      } catch (err) {
        console.log(err);
      }
    };
    fetchImage();
  }, [session?.id, serverUrl]);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    window.location.href = "/";
  };

  return (
    <div className="fixed top-0 left-0 w-full h-14 bg-black text-white flex justify-between items-center px-4 z-50 navbar">
      <h3 className="text-xl font-signature ml-2">
        <Link href="/" className="link-underline link-underline-black">
          <Image src="/favicon.ico" alt="Logo" width={32} height={32} />
        </Link>
      </h3>
      <ul className="hidden md:flex space-x-4 items-center">
        <li className="nav-links cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white transition duration-200">
          <Link href="/">Home</Link>
        </li>
        <li className="nav-links cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white transition duration-200">
          <Link href="/about">About</Link>
        </li>
        <li className="nav-links cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white transition duration-200">
          <Link href="/Contact">Contact</Link>
        </li>
        {session && (
          <li className="nav-links cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white transition duration-200">
            <Link href="/bookmark">bookmark</Link>
          </li>
        )}

        {session && (
          <div className="relative">
            <div className=" w-9 h-9 rounded-full border-4 border-purple-600 overflow-hidden">
              <Image
                src={userImage || "/default-avatar.jpg"}
                width={190}
                height={90}
                alt="User avatar"
                className="cursor-pointer rounded-full object-cover w-full h-full"
                onClick={() => setDropdown(!dropdown)}
              />
            </div>
            {dropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
                <Link href="/profile">
                  <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    {session.user?.name}
                  </p>
                </Link>
                <Link
                  href="/dashboard"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Account Settings
                </Link>
                <Link
                  href="/post"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  post
                </Link>
                <Link
                  href="/theme"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Theme
                </Link>
                <button
                  onClick={handleSignOut}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        )}
        {!session && (
          <li className="nav-links cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white transition duration-200">
            <Link href="/Login">Login</Link>
          </li>
        )}
      </ul>

      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer pr-4 z-10 md:hidden"
      >
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {nav && (
        <ul className="fixed top-0 left-0 w-full h-96 bg-black bg-opacity-90 text-white flex flex-col items-center justify-center space-y-6">
          <li className="text-xl">
            <Link href="/" onClick={() => setNav(false)}>
              Home
            </Link>
          </li>
          <li className="text-xl">
            <Link href="/about" onClick={() => setNav(false)}>
              About
            </Link>
          </li>
          <li className="text-xl">
            <Link href="/Contact" onClick={() => setNav(false)}>
              Contact
            </Link>
          </li>
          <li className="text-xl">
            <Link href="/bookmark" onClick={() => setNav(false)}>
              bookmark
            </Link>
          </li>
          {!session && (
            <li className="text-xl">
              <Link href="/Login" onClick={() => setNav(false)}>
                Login
              </Link>
            </li>
          )}
          {session && (
            <li className="text-xl flex flex-col items-center justify-center">
              <div
                href="/dashboard"
                className="link-underline link-underline-white"
              >
                <p className="text-white mb-2  flex flex-col items-center justify-center">
                  {session.user.name}
                </p>
                <div className=" flex justify-center">
                  <div className=" w-16 h-16 rounded-full border-2 border-purple-600 overflow-hidden">
                    <Image
                      src={userImage || "/default-avatar.jpg"}
                      width={180}
                      height={180}
                      alt="User avatar"
                      className="cursor-pointer rounded-full object-cover w-full h-full"
                      onClick={() => setDropdown(!dropdown)}
                    />
                  </div>
                </div>
              </div>
              {dropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
                  <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    {session.user.name}
                  </p>
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Account Settings
                  </Link>
                  <Link
                    href="/post"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    post
                  </Link>
                  <Link
                    href="/p"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Theme
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Navbar;
