"use client";

import React, { FormEvent, useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const callbackUrl = "/";

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const result = await signIn("credentials", {
      username: email,
      password,
      redirect: false,
      callbackUrl,
    });

    if (result?.ok) {
      router.push(callbackUrl);
    } else {
      // handle login errors
      alert("Invalid credentials. Please try again.");
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="p-4 border rounded-md shadow-md flex flex-col gap-4 max-w-sm w-full"
      >
        <h1 className="text-xl font-semibold\">Sign In</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border p-2 rounded-md"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border p-2 rounded-md"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
