"use client";
import { useState } from "react";

interface AddApplicationFormProps {
  onAddApplication: (application: unknown) => void;
}

export default function AddApplicationForm({ onAddApplication }: AddApplicationFormProps) {
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [dateApplied, setDateApplied] = useState("");
  const [status, setStatus] = useState("Applied");
  const [url, setUrl] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onAddApplication({
      id: Date.now(), // temporary ID
      company,
      title,
      date: dateApplied,
      status,
      url,
      notes,
    });

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
        Add Job Application
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-600">Company Name</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Google"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Job Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Frontend Developer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Date Applied</label>
          <input
            type="date"
            value={dateApplied}
            onChange={(e) => setDateApplied(e.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. https://careers.google.com/job123"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-600">Notes (optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Contacted via LinkedIn, interview scheduled..."
          />
        </div>
      </div>

      <div className="mt-6 text-center">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-200"
        >
          Add Application
        </button>
      </div>
    </form>
  );
}
