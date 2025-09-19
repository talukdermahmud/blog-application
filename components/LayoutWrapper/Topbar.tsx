"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, User, UserCircle } from "lucide-react";
import Image from "next/image";

interface TopbarProps {
  topbarMarginLeft: string;
}

export default function Topbar({ topbarMarginLeft }: TopbarProps) {
  const { data: session } = useSession();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const handleTogglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setIsPopupOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header
      className="bg-[var(--background)] text-[var(--foreground)] fixed top-0 left-0 h-16 flex items-center justify-end px-6 border-b border-[var(--secondary)] shadow-sm z-30"
      style={{
        marginLeft: topbarMarginLeft,
        width: `calc(100% - ${topbarMarginLeft})`,
      }}
    >
      <div className="relative" ref={popupRef}>
        {session ? (
          <button
            onClick={handleTogglePopup}
            className="flex items-center rounded-lg p-1 hover:bg-[var(--secondary)]  space-x-2 text-[var(--foreground)] hover:opacity-90 cursor-pointer transition-opacity duration-200"
          >
            {session.user?.image ? (
              <Image
                src={session.user.image}
                alt="User Avatar"
                className="w-8 h-8 rounded-full object-cover"
                width={32}
                height={32}
              />
            ) : (
              <UserCircle className="w-8 h-8" />
            )}
            <span>{session.user?.name || "User"}</span>
          </button>
        ) : (
          <button
            onClick={() => signIn("google")}
            className="bg-[var(--primary)] text-white px-3 py-1 rounded hover:opacity-80 transition-opacity duration-200"
          >
            Sign In
          </button>
        )}

        <AnimatePresence>
          {isPopupOpen && session && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-48 bg-[var(--background)] rounded-md shadow-lg py-1 z-40 border border-[var(--secondary-hover)]"
            >
              <Link
                href="/profile"
                onClick={() => setIsPopupOpen(false)}
                className="block px-4 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--secondary-hover)] border-b border-[var(--secondary)]"
              >
                <span className="flex gap-2 items-center">
                  <User /> Profile
                </span>
              </Link>
              <button
                onClick={() => {
                  signOut();
                  setIsPopupOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--secondary-hover)] cursor-pointer"
              >
                <span className="flex gap-2 items-center">
                  <LogOut /> Sign Out
                </span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
