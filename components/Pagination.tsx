"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  onPageSizeChange,
}: PaginationProps) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pageNumbers.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pageNumbers.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pageNumbers;
  };

  return (
    <div className="flex justify-end items-center mb-4 text-xs gap-4">
      <div className="flex items-center">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="p-2 rounded-md bg-[var(--accent-color)] text-[var(--primary-text)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex items-center mx-4">
          {getPageNumbers().map((page, index) =>
            typeof page === "number" ? (
              <button
                key={index}
                onClick={() => onPageChange(page)}
                className={`p-2 rounded-md ${
                  currentPage === page
                    ? "bg-[var(--primary-color)] text-[var(--primary-text)]"
                    : "bg-[var(--accent-color)] text-[var(--primary-text)]"
                } mx-1 cursor-pointer`}
              >
                {page}
              </button>
            ) : (
              <span key={index} className="p-2">
                {page}
              </span>
            )
          )}
        </div>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="p-2 rounded-md bg-[var(--accent-color)] text-[var(--primary-text)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      <div>
        <select
          id="pageSize"
          value={pageSize}
          onChange={(e) => {
            onPageSizeChange(Number(e.target.value));
          }}
          className="p-2 rounded-md bg-[var(--accent-color)] text-[var(--primary-text)] cursor-pointer"
        >
          <option value={10}>10 / page</option>
          <option value={20}>20 / page</option>
          <option value={50}>50 / page</option>
          <option value={100}>100 / page</option>
        </select>
      </div>
    </div>
  );
}
