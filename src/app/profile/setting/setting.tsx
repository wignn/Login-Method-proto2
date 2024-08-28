"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

export default function ProfileSettingsClient() {
  const { data: session } = useSession();
  const [name, setName] = useState(session?.user?.name || "");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!session) {
      setError("You need to be logged in to update your profile.");
      return;
    }

    const formData = new FormData();
    formData.append("bio", bio);
    formData.append("userId", session.id);

    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setSuccessMessage("Profile updated successfully!");
        setError(null);
        setTimeout(() => {
          window.location.href = "/profile";
        }, 2000);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "An error occurred.");
        setSuccessMessage(null);
      }
    } catch (error) {
      console.error("Error submitting the form", error);
      setError("An unexpected error occurred.");
      setSuccessMessage(null);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setImage(file);
        setPreview(URL.createObjectURL(file));
        setError(null);
      } else {
        setError("Only image files are allowed.");
        setImage(null);
        setPreview(null);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto bg-white bg-opacity-25 shadow-lg border-2 border-purple-600 rounded-lg p-8">
        {session && (
          <>
            <h2 className="text-center mb-8 text-2xl">
              <input
                type="text"
                id="fname"
                name="fname"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-none bg-transparent text-center focus:outline-none"
              />
            </h2>
          </>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="relative mb-8 flex flex-col items-center">
            <input
              type="file"
              name="image"
              id="image"
              onChange={handleImageChange}
              className="rounded-full"
            />
            {preview && (
              <div className="mt-3 w-32 h-32 rounded-full border-4 border-purple-600 overflow-hidden">
                <img
                  src={preview}
                  alt="Preview"
                  className="object-cover w-full h-full"
                />
              </div>
            )}
          </div>
          <div className="text-left mb-8">
            <div className="mb-5">
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-900"
              >
                Bio
              </label>
              <textarea
                name="bio"
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                placeholder="Write your bio..."
                required
              />
              {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
            </div>
          </div>
          {successMessage && (
            <p className="text-green-500 mb-4">{successMessage}</p>
          )}
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}
