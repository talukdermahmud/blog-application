"use client";

import { User } from "@/types/types";
import { motion } from "framer-motion";

interface TableProps {
  users: User[];
  onRowClick: (user: User) => void;
}

export default function Table({ users, onRowClick }: TableProps) {
  return (
    <div className="overflow-x-auto bg-[var(--background)] rounded-lg shadow-lg border border-[var(--secondary)]">
      <table className="min-w-full">
        <thead>
          <tr className="bg-[var(--secondary)] text-left">
            <th className="p-4">Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Company</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <motion.tr
              key={user.id}
              className="border-t border-[var(--secondary)] cursor-pointer hover:bg-[var(--secondary-hover)] transition-colors duration-200"
              onClick={() => onRowClick(user)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <td className="p-4 text-[var(--foreground)]">{user.name}</td>
              <td className="p-4 text-[var(--foreground)]">{user.email}</td>
              <td className="p-4 text-[var(--foreground)]">
                {user.company.name}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
