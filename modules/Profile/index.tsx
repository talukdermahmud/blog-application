"use client";

import { useSession, signIn } from "next-auth/react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Profile() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[var(--background)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[var(--background)] p-8 rounded-lg shadow-lg text-center max-w-md w-full border border-[var(--secondary)]"
        >
          <h1 className="text-3xl font-bold mb-6 text-[var(--foreground)]">
            Profile
          </h1>
          <p className="mb-6 text-[var(--foreground)] opacity-80">
            Please sign in to view your profile.
          </p>
          <button
            onClick={() => signIn("google")}
            className="w-full px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary)] transition duration-150"
          >
            Sign in with Google
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center bg-[var(--background)] p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[var(--primary)] p-8 rounded-lg shadow-lg max-w-2xl w-full border border-[var(--primary)] md:flex md:items-center md:space-x-8"
      >
        <div className="mb-6 md:mb-0 flex-shrink-0 flex justify-center">
          {session.user?.image ? (
            <Image
              src={session.user.image}
              alt="Profile Picture"
              width={128}
              height={128}
              className="rounded-full border-4 border-[var(--primary)] shadow-md object-cover"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-[var(--secondary)] flex items-center justify-center text-[var(--foreground)] text-5xl font-bold border-4 border-[var(--primary)] shadow-md">
              {session.user?.name
                ? session.user.name.charAt(0).toUpperCase()
                : "?"}
            </div>
          )}
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-bold mb-2 text-[var(--foreground)]">
            {session.user?.name || "User Profile"}
          </h1>
          <p className="text-lg text-[var(--foreground)] mb-4">
            {session.user?.email}
          </p>

          <div className="space-y-3 text-[var(--foreground)] opacity-90">
            <p>
              <strong>Status:</strong> Active
            </p>
            <p>
              <strong>Role:</strong> User
            </p>
            <p>
              <strong>Last Login:</strong> {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
