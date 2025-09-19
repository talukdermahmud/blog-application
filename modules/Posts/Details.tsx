"use client";

import { useEffect, useState } from "react";
import { fetchPostById } from "@/services/dataServices";
import { Post } from "@/types/types";
import ErrorMessage from "@/components/Error";
import LoadingSpinner from "@/components/LoadingSpinner";
import { motion } from "framer-motion";
import { formatTitleToCapital } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { MoveLeft } from "lucide-react";

function useFetch<T>(
  fetchFn: () => Promise<T>,
  deps: any[]
): {
  data: T | null;
  loading: boolean;
  error: string | null;
} {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("useFetch effect running for ID:", deps);
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetchFn();
        if (isMounted) {
          setData(result);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "An error occurred");
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, deps);

  return { data, loading, error };
}

export default function PostDetails({
  params,
}: {
  params: { id: number };
}) {
  const router = useRouter();
  const { id } = params;

  const {
    data: post,
    loading,
    error,
  } = useFetch<Post>(() => fetchPostById({ id: Number(id) }), [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[var(--background)] text-red-500">
        <ErrorMessage message={error} />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        <p>Post not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-[var(--background)] text-[var(--foreground)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[var(--primary)] p-8 rounded-lg shadow-lg max-w-7xl mx-auto border border-[var(--primary)]"
      >
        <h1 className="text-2xl font-bold mb-2 text-[var(--foreground)] leading-tight">
          {formatTitleToCapital(post.title)}
        </h1>
        <p className="text-md text-[var(--foreground)] opacity-70 mb-6 font-medium">
          By User {post.userId}
        </p>
        <p className="text-lg leading-relaxed text-[var(--foreground)]">
          {post.body}
        </p>
        <div className="flex justify-end items-center mt-6">
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-[var(--secondary)] text-[var(--foreground)] rounded-lg hover:bg-[var(--secondary-hover)] transition-colors duration-200"
          >
            <span className="flex items-center gap-2">
              <MoveLeft />
              Go Back
            </span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
