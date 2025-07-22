"use client";

import { useState, useEffect, FormEvent } from "react";
import { Application } from "../lib/firebase"; // Import Application from your shared types in firebase.ts

interface AddApplicationFormProps {
  onAdd: (app: Omit<Application, "id">) => Promise<void>;
  onEditSubmit: (updatedApp: Application) => Promise<void>;
  editApp: Application | null;
  clearEdit: () => void;
}

export default function AddApplicationForm({
  onAdd,
  onEditSubmit,
  editApp,
  clearEdit,
}: AddApplicationFormProps) {
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [dateApplied, setDateApplied] = useState("");
  const [status, setStatus] = useState("Applied");
  const [url, setUrl] = useState("");
  const [notes, setNotes] = useState("");

  // Helper to get today's date in YYYY-MM-DD format
  const getTodayDate = () => new Date().toISOString().split("T")[0];

  // Prefill form when editing or clear when not editing
  useEffect(() => {
    if (editApp) {
      setCompany(editApp.company);
      setTitle(editApp.title);
      setDateApplied(editApp.date);
      setStatus(editApp.status);
      setUrl(editApp.url || "");
      setNotes(editApp.notes || "");
    } else {
      setCompany("");
      setTitle("");
      setDateApplied(getTodayDate());
      setStatus("Applied");
      setUrl("");
      setNotes("");
    }
  }, [editApp]);

  const resetForm = () => {
    setCompany("");
    setTitle("");
    setDateApplied(getTodayDate());
    setStatus("Applied");
    setUrl("");
    setNotes("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!company || !title || !dateApplied || !status) {
      alert('Company, Title, Date Applied, and Status are required!');
      return;
    }

    const commonApplicationData = {
      company,
      title,
      date: dateApplied,
      status,
      url: url === "" ? undefined : url,
      notes: notes === "" ? undefined : notes,
    };

    if (editApp) {
      const updatedApp: Application = {
        ...commonApplicationData,
        id: editApp.id,
      };
      await onEditSubmit(updatedApp);
      clearEdit();
    } else {
      await onAdd(commonApplicationData);
    }

    resetForm();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100" // Enhanced shadow and border for depth
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center"> {/* Larger, bolder title */}
        {editApp ? "Edit Application" : "Add New Application"}
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2"> {/* Increased gap for more breathing room */}
        <div className="flex flex-col"> {/* Use flexbox for consistent vertical alignment */}
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
          <input
            type="text"
            id="company" // Added ID for accessibility
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
            className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 placeholder-gray-400
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none
                       transition duration-200 ease-in-out shadow-sm" // Modern input styling
            placeholder="e.g., Google"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 placeholder-gray-400
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none
                       transition duration-200 ease-in-out shadow-sm"
            placeholder="e.g., Software Engineer"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="dateApplied" className="block text-sm font-medium text-gray-700 mb-1">Date Applied</label>
          <input
            type="date"
            id="dateApplied"
            value={dateApplied}
            onChange={(e) => setDateApplied(e.target.value)}
            required
            className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none
                       transition duration-200 ease-in-out shadow-sm"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none
                       transition duration-200 ease-in-out shadow-sm"
          >
            <option>Applied</option>
            <option>Interview Scheduled</option>
            <option>Interviewed</option>
            <option>Offer Received</option>
            <option>Rejected</option>
            <option>Withdrawn</option>
          </select>
        </div>

        <div className="sm:col-span-2 flex flex-col"> {/* Full width on small screens, column for label/input */}
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">Job URL (optional)</label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 placeholder-gray-400
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none
                       transition duration-200 ease-in-out shadow-sm"
            placeholder="e.g., https://careers.example.com/job/123"
          />
        </div>

        <div className="sm:col-span-2 flex flex-col">
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Notes (optional)</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 placeholder-gray-400
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none
                       transition duration-200 ease-in-out shadow-sm"
            placeholder="Any specific details, contacts, or reminders..."
          ></textarea>
        </div>
      </div>

      <div className="mt-8 flex justify-center space-x-4"> {/* Increased top margin for separation */}
        {editApp && (
          <button
            type="button"
            onClick={clearEdit}
            className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold
                       px-5 py-2.5 rounded-lg transition-all duration-200 ease-in-out
                       shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2" // Modern button style
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Cancel Edit
          </button>
        )}
        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold
                     px-5 py-2.5 rounded-lg transition-all duration-200 ease-in-out
                     shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" // Primary button style
        >
          {editApp ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.38-2.827-2.828z" />
              </svg>
              Update Application
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Application
            </>
          )}
        </button>
      </div>
    </form>
  );
}