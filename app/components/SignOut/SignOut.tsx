"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function ButtonAuth() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        <button
          onClick={() => signOut()}
          className="ml-4 mt-4 p-2 rounded-md border-solid border-2 border-green-500 bg-green-200"
        >
          Sign out
        </button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button
        onClick={() => signIn()}
        className="border-solid border-black bg-webColor"
      >
        Sign in
      </button>
    </>
  );
}
