import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getServerSession } from "next-auth";
import { NEXT_AUTH_CONFIG } from "@/lib/authConfig";
import { signOut } from "next-auth/react";
import { SignOutButton } from "@/lib/signOutButton";
export default async function Home() {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  console.log(session);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {session ? (
        <div>
          <h1 className="text-2xl font-bold">
            Welcome, {session.user?.name || "User"}!!
          </h1>
          <p>Email: {session.user?.email}</p>
          <SignOutButton />
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold">You are not signed in.</h1>
          <p>
            Please{" "}
            <a href="/signin" className="text-blue-600 underline">
              sign in
            </a>{" "}
            to continue.
          </p>
        </div>
      )}

      <div>
        <nav className="w-full flex justify-center gap-4">
          <Link href="/posts" className="hover:text-blue-500 transition-colors">
            Post
          </Link>
          <Link
            href="/posts/new"
            className="hover:text-blue-500 transition-colors"
          >
            New Post
          </Link>
          <Link
            href="/users/new"
            className="hover:text-blue-500 transition-colors"
          >
            New Users
          </Link>
        </nav>
      </div>
    </div>
  );
}
