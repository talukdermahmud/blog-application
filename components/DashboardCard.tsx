"use client";

import { motion } from "framer-motion";
import React from "react";

interface DashboardCardProps {
  title: string;
  value: number | string | null;
  icon?: React.ReactNode;
  color?: string;
}

export default function DashboardCard({
  title,
  value,
  icon,
  color,
}: DashboardCardProps) {
  return (
    <motion.div
      className="p-4 rounded-xl shadow-xl border border-[var(--primary)] bg-white hover:scale-105 transition-all duration-300 inset-shadow-sm"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <div className="flex items-center space-x-4">
        {icon && (
          <div
            className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center  bg-opacity-20`}
            style={{ backgroundColor: `${color}22` }}
          >
            <div
              style={{
                color: color,
              }}
            >
              {icon}
            </div>
          </div>
        )}
        <div className="flex-1">
          <p className={`text-lg font-bold`} style={{ color: color }}>
            {value}
          </p>
          <h2 className="text-sm font-semibold text-[var(--foreground)] opacity-90">
            {title}
          </h2>
        </div>
      </div>
    </motion.div>
  );
}
