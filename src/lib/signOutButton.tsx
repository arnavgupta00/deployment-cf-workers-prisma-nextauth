"use client";
import { signOut } from "next-auth/react";

export const SignOutButton = async () => {
  return (
    <button
      onClick={() => signOut({ redirect: true })}
      className="text-blue-600 underline"
    >
      Sign out
    </button>
  );
};
