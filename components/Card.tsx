"use client";

import { formatTitleToCapital } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";

interface CardProps {
  title: string;
  body: string;
  id: number;
  index: number;
}

export default function Card({ title, body, id, index }: CardProps) {
  return (
    <motion.div
      className="bg-[var(--primary)] p-6 rounded-lg shadow-lg transition-all transform hover:scale-105 hover:shadow-xl inset-shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <h3 className="text-lg font-semibold text-[var(--foreground)] mb-3">
        {formatTitleToCapital(title)}
      </h3>
      <p className="text-[var(--foreground)] opacity-80 text-md mb-4 line-clamp-3">
        {body}
      </p>
      <div className="flex justify-between items-center">
        <Link
          href={`/posts/${id}`}
          className="text-[var(--secondary)] hover:text-[var(--foreground)] font-medium text-sm transition-colors cursor-pointer"
        >
          Read More
        </Link>
      </div>
    </motion.div>
  );
}
