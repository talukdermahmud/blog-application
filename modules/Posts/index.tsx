"use client";

import Pagination from "@/components/Pagination";
import { useFetch } from "@/hooks/useFetch";
import { Post } from "@/types/types";
import Card from "@/components/Card";
import ErrorMessage from "@/components/Error";
import LoadingSpinner from "@/components/LoadingSpinner";
import { fetchPosts } from "@/services/dataServices";
import { RefreshCcw, Bug } from "lucide-react";
import { useState, useCallback } from "react";

const simulateError = () => Promise.reject("Something went wrong!");

export default function Posts() {
  const [fetcher, setFetcher] = useState(() => fetchPosts);
  const { data: posts, loading, error, refetch } = useFetch<Post[]>(fetcher);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handleSimulateError = useCallback(() => {
    setFetcher(() => simulateError);
  }, []);

  const handleRefresh = useCallback(() => {
    setFetcher(() => fetchPosts);
  }, []);

  const paginatedPosts = posts
    ? posts.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : [];
  const totalPages = posts ? Math.ceil(posts.length / pageSize) : 1;

  return (
    <div>
      <div className="flex justify-between gap-4">
        <h1 className="text-3xl font-bold mb-6">Posts</h1>
        <div className="flex gap-2">
          <button
            onClick={handleRefresh}
            className="bg-[var(--secondary)] text-xs px-2 rounded-md mb-4 hover:bg-[var(--secondary-hover)] transition-colors cursor-pointer"
          >
            <span className="flex gap-2 items-center">
              <RefreshCcw size={20} /> Refresh
            </span>
          </button>

          <button
            onClick={handleSimulateError}
            className="bg-red-800 px-2 text-xs rounded-md mb-4 hover:bg-red-900 text-white transition-colors cursor-pointer"
          >
            <span className="flex gap-2 items-center">
              <Bug size={20} /> Simulate Error
            </span>
          </button>
        </div>
      </div>

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {posts && (
        <div className="shadow-2xl px-6 py-4 rounded-lg bg-[var(--card-background)] mt-8 inset-shadow-xs ">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            pageSize={pageSize}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setCurrentPage(1);
            }}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-4 ">
            {paginatedPosts.map((post, index) => (
              <Card key={post.id} {...post} index={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
