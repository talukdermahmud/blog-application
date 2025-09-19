"use client";

import { motion, AnimatePresence } from "framer-motion";
import { User } from "@/types/types";
import { CircleX } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

export default function Modal({ isOpen, onClose, user }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && user && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-[var(--background)] rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <div className="flex justify-between items-center mb-6 bg-[var(--secondary)] px-4 py-2 rounded-lg">
              <h2 className="text-2xl font-bold text-[var(--foreground)] ">
                {user.name}
              </h2>
              <button
                onClick={onClose}
                className="text-[var(--foreground)] opacity-70 hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                aria-label="Close modal"
              >
                <CircleX className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6 text-[var(--foreground)]">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-[var(--title-color)] mb-3 border-b border-[var(--secondary)] pb-2">
                  Personal Information
                </h3>
                <div className="space-y-2 text-sm">
                  <p>
                    Username: <strong>{user.username}</strong>
                  </p>
                  <p>
                    Email:{" "}
                    <strong>
                      <a
                        href={`mailto:${user.email}`}
                        className="text-[var(--title-color)] hover:underline"
                      >
                        {user.email}
                      </a>
                    </strong>
                  </p>
                  <p>
                    Phone:{" "}
                    <strong>
                      <a
                        href={`tel:${user.phone}`}
                        className="text-[var(--title-color)] hover:underline"
                      >
                        {user.phone}
                      </a>
                    </strong>
                  </p>
                  <p>
                    Website:{" "}
                    <strong>
                      <a
                        href={`https://${user.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--title-color)] hover:underline"
                      >
                        {user.website}
                      </a>
                    </strong>
                  </p>
                </div>
              </div>

              {/* Address Information */}
              <div>
                <h3 className="text-lg font-semibold text-[var(--title-color)] mb-3 border-b border-[var(--secondary)] pb-2">
                  Address
                </h3>
                <div className="space-y-2 text-sm">
                  <p>
                    Street: <strong>{user.address.street}</strong>
                  </p>
                  <p>
                    Suite: <strong>{user.address.suite}</strong>
                  </p>
                  <p>
                    City: <strong>{user.address.city}</strong>
                  </p>
                  <p>
                    Zipcode: <strong>{user.address.zipcode}</strong>
                  </p>
                  <p>
                    Geo:{" "}
                    <strong>
                      Lat: {user.address.geo.lat}, Lng: {user.address.geo.lng}
                    </strong>
                  </p>
                </div>
              </div>

              {/* Company Information */}
              <div>
                <h3 className="text-lg font-semibold text-[var(--title-color)] mb-3 border-b border-[var(--secondary)] pb-2">
                  Company
                </h3>
                <div className="space-y-2 text-sm">
                  <p>
                    Name: <strong>{user.company.name}</strong>
                  </p>
                  <p>
                    Catch Phrase: <strong>{user.company.catchPhrase}</strong>
                  </p>
                  <p>
                    Business: <strong>{user.company.bs}</strong>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2.5 hover:bg-[var(--secondary)] text-white rounded-lg bg-[var(--foreground)] cursor-pointer transition-colors duration-200 text-sm font-medium shadow-sm"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
