"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function RootPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (status === "authenticated") {
      router.push("/dashboard");
      return;
    }

    if (status === "unauthenticated") {
      router.push("/signin");
      return;
    }
  }, [status, session, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <LoadingSpinner />
          <p className="mt-4 text-gray-600 dark:text-gray-300 text-sm">
            Checking authentication...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <div className="text-6xl mb-4">🔄</div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Redirecting...
          </p>
        </div>
      </motion.div>
    </div>
  );
}
