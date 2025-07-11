"use client";

import { useState } from "react";
import AddApplicationForm from "@/components/AddApplicationForm";
import ApplicationList from "@/components/ApplicationList";

// Define the Application type
type Application = {
  id: number;
  company: string;
  title: string;
  date: string;
  status: string;
  url?: string;
  notes?: string;
};

export default function HomePage() {
  const [applications, setApplications] = useState<Application[]>([]);

  // Function to add new application
  const handleAddApplication = (newApp: Application) => {
    setApplications([newApp, ...applications]);
  };

  // Function to delete application by ID
  const handleDelete = (id: number) => {
    setApplications(applications.filter((app) => app.id !== id));
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Job Application Tracker
      </h1>

      <AddApplicationForm onAddApplication={handleAddApplication} />
      <ApplicationList
        applications={applications}
        onDelete={handleDelete}
      />
    </main>
  );
}
