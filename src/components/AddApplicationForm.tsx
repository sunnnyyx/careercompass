"use client";
import { useState, useEffect } from "react";

type Application = {
  id: number;
  company: string;
  title: string;
  date: string;
  status: string;
  url?: string;
  notes?: string;
};

interface AddApplicationFormProps {
  onAddApplication: (application: Application) => void;
  onUpdateApplication: (application: Application) => void;
  editingApp: Application | null;
}

export default function AddApplicationForm({
  onAddApplication,
  onUpdateApplication,
  editingApp,
}: AddApplicationFormProps) {
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [dateApplied, setDateApplied] = useState("");
  const [status, setStatus] = useState("Applied");
  const [url, setUrl] = useState("");
  const [notes, setNotes] = useState("");

  // Prefill form if editing
  useEffect(() => {
    if (editingApp) {
      setCompany(editingApp.company);
      setTitle(editingApp.title);
      setDateApplied(editingApp.date);
      setStatus(editingApp.status);
      setUrl(editingApp.url || "");
      setNotes(editingApp.notes || "");
    }
  }, [editingApp]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const appData: Application = {
      id: editingApp ? editingApp.id : Date.now(),
      company,
      title,
      date: dateApplied,
      status,
      url,
      notes,
    };

    if (editingApp) {
      onUpdateApplication(appData);
    } else {
      onAddApplication(appData);
    }

    // Reset form
    setCompany("");
    setTitle("");
    setDateApplied("");
    setStatus("Applied");
    setUrl("");
    setNotes("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-200"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        {editingApp ? "Edit Application" : "Add Job Application"}
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-600">Company Name</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-gray-300 p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Job Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-gray-300 p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Date Applied</label>
          <input
            type="date"
            value={dateApplied}
            onChange={(e) => setDateApplied(e.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-gray-300 p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 p-2"
          >
            <option>Applied</option>
            <option>Interview Scheduled</option>
            <option>Interviewed</option>
            <option>Offer Received</option>
            <option>Rejected</option>
            <option>Withdrawn</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-600">Job URL (optional)</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 p-2"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-600">Notes (optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="mt-1 w-full rounded-lg border border-gray-300 p-2"
          />
        </div>
      </div>

      <div className="mt-6 text-center">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg"
        >
          {editingApp ? "Update Application" : "Add Application"}
        </button>
      </div>
    </form>
  );
}
