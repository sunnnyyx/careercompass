"use client";

import { motion, AnimatePresence } from "framer-motion";

type Application = {
  id: string;
  company: string;
  title: string;
  date: string;
  status: string;
  url?: string;
  notes?: string;
};

interface ApplicationListProps {
  applications: Application[];
  onDelete: (id: string) => void;
  onEdit: (app: Application) => void;
}

const statusColors: Record<string, string> = {
  "Applied": "bg-blue-100 text-blue-700",
  "Interview Scheduled": "bg-yellow-100 text-yellow-700",
  "Interviewed": "bg-purple-100 text-purple-700",
  "Offer Received": "bg-green-100 text-green-700",
  "Rejected": "bg-red-100 text-red-700",
  "Withdrawn": "bg-gray-200 text-gray-700",
};

export default function ApplicationList({
  applications,
  onDelete,
  onEdit,
}: ApplicationListProps) {
  return (
    <div className="max-w-6xl mx-auto mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence>
        {applications.map((app) => (
          <motion.div
            key={app.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold text-gray-800">{app.company}</h3>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded ${statusColors[app.status] || "bg-gray-100 text-gray-700"}`}
              >
                {app.status}
              </span>
            </div>

            <p className="text-gray-600 font-medium">{app.title}</p>
            <p className="text-sm text-gray-500 mb-3">Applied on: {app.date}</p>

            {app.url && (
              <a
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm underline mb-2 inline-block"
              >
                View Job Posting
              </a>
            )}

            {app.notes && (
              <p className="text-sm text-gray-700 mt-2 bg-gray-50 p-2 rounded">
                {app.notes}
              </p>
            )}

            <div className="flex justify-between mt-4 pt-4 border-t">
              <button
                onClick={() => onEdit(app)}
                className="text-sm text-blue-600 font-medium hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(app.id)}
                className="text-sm text-red-600 font-medium hover:underline"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
