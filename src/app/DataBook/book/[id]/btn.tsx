"use client";

import Link from "next/link";
import { IoTrashOutline } from "react-icons/io5";
import { deleteChapter } from "./BookHandler";
import { useState } from "react";


export const ReadButton = ({ id }: { id: string }) => {
  console.log(id);
  return (
    <Link
      href={`/DataBook/book/${id}`}
      className="rounded-sm border p-1 hover:bg-gray-100"
    >
      <p>Read</p>
    </Link>
  );
};


export const DeleteButton = ({ id, onDelete }:any) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteChapter(id);
      onDelete();
    } catch (error) {
      console.error("Error deleting bookmark:", error);
    }
    setLoading(false);
  };

  return (
    <button onClick={handleDelete} disabled={loading}>
      {loading ? "Deleting..." : <IoTrashOutline size={20}/>}
    </button>
  );
};
