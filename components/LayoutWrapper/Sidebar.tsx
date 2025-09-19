"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  navItems: NavItem[];
  onSignOut: () => void;
}

export default function Sidebar({
  isOpen,
  setIsOpen,
  navItems,
  onSignOut,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <motion.div
      className="bg-[var(--primary)] text-[var(--foreground)] flex flex-col h-full border-r border-[var(--secondary)] shadow-sm"
      initial={false}
      animate={false}
    >
      <div className="p-4 h-16 border-b border-[var(--secondary)] shadow-sm flex items-center justify-between">
        {isOpen && (
          <motion.span
            className="text-lg font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Blog Application
          </motion.span>
        )}
        <motion.button
          className="p-2 text-xl flex items-center justify-center cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>{isOpen ? <ChevronLeft /> : <ChevronRight />}</span>
        </motion.button>
      </div>

      <nav className="flex-1 overflow-y-auto h-full">
        <motion.ul className="py-2" initial={false} animate={false}>
          {navItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className={`flex items-center space-x-3 p-4 transition-colors duration-200 group ${
                    isActive
                      ? "bg-[var(--dark-accent)] !important"
                      : "hover:bg-[var(--secondary)]"
                  }`}
                >
                  <span className="text-lg flex-shrink-0">{item.icon}</span>
                  {isOpen && (
                    <motion.span
                      className="text-sm font-medium"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </Link>
              </motion.li>
            );
          })}
        </motion.ul>
      </nav>

      <div className="p-4 border-t border-[var(--secondary)]">
        <button
          onClick={() => onSignOut()}
          className="w-full flex items-center justify-center space-x-3 px-4 py-6 h-5 bg-[#880808] text-[var(--primary)] rounded-lg hover:bg-[#A30000] transition duration-200 cursor-pointer"
        >
          {isOpen && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="flex gap-2 items-center">
                <LogOut /> Sign Out
              </span>
            </motion.span>
          )}
          {!isOpen && (
            <span className="text-lg">
              <LogOut />
            </span>
          )}
        </button>
      </div>
    </motion.div>
  );
}
