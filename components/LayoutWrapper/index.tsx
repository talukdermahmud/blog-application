"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/LayoutWrapper/Sidebar";
import Topbar from "@/components/LayoutWrapper/Topbar";
import { useSession, signOut } from "next-auth/react";
import { LayoutDashboard, NotebookPen, Users } from "lucide-react";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  useSession();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: <LayoutDashboard /> },
    { name: "Posts", href: "/posts", icon: <NotebookPen /> },
    { name: "Users", href: "/users", icon: <Users /> },
  ];

  const mainMarginLeft = isSidebarOpen ? "300px" : "60px";
  const topbarMarginLeft = isSidebarOpen ? "300px" : "60px";

  return (
    <div className="flex min-h-screen">
      <motion.div
        className="fixed top-0 left-0 h-full z-40"
        animate={{ width: isSidebarOpen ? 300 : 60 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <Sidebar
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          navItems={navItems}
          onSignOut={signOut}
        />
      </motion.div>

      <div
        className="flex flex-col flex-1"
        style={{ marginLeft: mainMarginLeft }}
      >
        <Topbar topbarMarginLeft={topbarMarginLeft} />

        <motion.main
          className="flex-1"
          style={{ marginTop: "4rem" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-8 max-sm:!p-4">{children}</div>
        </motion.main>
      </div>

      {isSidebarOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: isSidebarOpen ? 0.5 : 0 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
