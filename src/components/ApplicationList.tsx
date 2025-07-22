"use client";

import { motion, AnimatePresence } from "framer-motion";
// Import Application from your shared types in firebase.ts
import { Application } from '../lib/firebase'; 

interface ApplicationListProps {
  applications: Application[];
  onDelete: (id: string) => void;
  onEdit: (app: Application) => void;
}

const statusColors: Record<string, string> = {
  "Applied": "bg-blue-100 text-blue-800", // Adjusted text color for better contrast
  "Interview Scheduled": "bg-yellow-100 text-yellow-800",
  "Interviewed": "bg-purple-100 text-purple-800",
  "Offer Received": "bg-green-100 text-green-800",
  "Rejected": "bg-red-100 text-red-800",
  "Withdrawn": "bg-gray-200 text-gray-800", // Adjusted text color
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
            // Modern card styling with hover effects
            whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }} // Scale up and stronger shadow on hover
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100
                       cursor-pointer transition-all duration-300 ease-in-out group relative overflow-hidden" // Group for hover, relative for absolute elements
          >
            {/* Optional: Status ribbon for a more distinct look */}
            {app.status === "Offer Received" && (
              <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                OFFER!
              </div>
            )}

            <div className="flex justify-between items-start mb-3"> {/* Changed to items-start for better alignment with longer titles */}
              <h3 className="text-2xl font-bold text-gray-800 leading-tight pr-4">{app.company}</h3> {/* Larger, bolder company */}
              <span
                className={`text-sm font-semibold px-3 py-1.5 rounded-full ${statusColors[app.status] || "bg-gray-100 text-gray-700"} whitespace-nowrap`} // Larger padding, rounded-full
              >
                {app.status}
              </span>
            </div>

            <p className="text-lg text-gray-700 font-medium mb-1">{app.title}</p> {/* Larger job title */}
            <p className="text-sm text-gray-500 mb-3">Applied on: {app.date}</p>

            {app.url && (
              <a
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors flex items-center gap-1 mb-2" // Added flex for icon
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View Job Posting
              </a>
            )}

            {app.notes && (
              <div className="mt-3 text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100"> {/* Enhanced notes section */}
                <p className="font-semibold text-gray-700 mb-1">Notes:</p>
                <p className="line-clamp-3">{app.notes}</p> {/* Use line-clamp for long notes */}
              </div>
            )}

            <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-100"> {/* Adjusted margin and border */}
              <button
                onClick={() => onEdit(app)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-blue-600 font-semibold hover:bg-blue-50 transition-colors duration-200"
                title="Edit Application"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.38-2.827-2.828z" />
                </svg>
                Edit
              </button>
              <button
                onClick={() => onDelete(app.id)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-red-600 font-semibold hover:bg-red-50 transition-colors duration-200"
                title="Delete Application"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}